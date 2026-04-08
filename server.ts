import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Firebase Config
const firebaseConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'firebase-applet-config.json'), 'utf8'));

// Initialize Firebase Admin
// Note: In a real production app, you'd use a service account key JSON.
// Here we try to initialize with project ID.
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: firebaseConfig.projectId,
  });
}

const db = admin.firestore();
const auth = admin.auth();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/send-otp", async (req, res) => {
    const { identifier } = req.body; // email or phone
    if (!identifier) return res.status(400).json({ error: "Identifier is required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    try {
      await db.collection("otps").doc(identifier).set({
        otp,
        expiresAt,
      });

      // REAL INTEGRATION: Here you would call an SMS or Email service
      // For this app, we log it to the console so the user can see it in logs
      console.log(`[OTP SERVICE] OTP for ${identifier}: ${otp}`);
      
      // We also return it in the response for demo purposes in this environment
      // so the user doesn't have to check logs if they are just testing.
      // In a real app, you'd NEVER return the OTP in the response.
      res.json({ success: true, message: "OTP sent successfully", demoOtp: otp });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/verify-otp", async (req, res) => {
    const { identifier, otp } = req.body;
    if (!identifier || !otp) return res.status(400).json({ error: "Identifier and OTP are required" });

    try {
      const otpDoc = await db.collection("otps").doc(identifier).get();
      if (!otpDoc.exists) return res.status(400).json({ error: "OTP not found" });

      const data = otpDoc.data();
      if (data?.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });
      if (Date.now() > data?.expiresAt) return res.status(400).json({ error: "OTP expired" });

      // Clear OTP
      await db.collection("otps").doc(identifier).delete();

      // Find or create user
      let userRecord;
      try {
        if (identifier.includes('@')) {
          userRecord = await auth.getUserByEmail(identifier);
        } else {
          // Clean up phone number format if needed (e.g. ensure it starts with +)
          const phone = identifier.startsWith('+') ? identifier : `+91${identifier}`;
          userRecord = await auth.getUserByPhoneNumber(phone);
        }
      } catch (e) {
        // If user doesn't exist, create one
        try {
          userRecord = await auth.createUser({
            email: identifier.includes('@') ? identifier : undefined,
            phoneNumber: !identifier.includes('@') ? (identifier.startsWith('+') ? identifier : `+91${identifier}`) : undefined,
          });
        } catch (createErr: any) {
          console.error("User creation error:", createErr);
          return res.status(500).json({ error: "User lookup/creation failed" });
        }
      }

      // Generate Custom Token
      const customToken = await auth.createCustomToken(userRecord.uid);
      res.json({ success: true, customToken });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
