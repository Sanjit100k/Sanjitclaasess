import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Mail, Lock, User, UserPlus, GraduationCap, Users, Phone } from 'lucide-react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'student' | 'faculty'>('student');
  const [step, setStep] = useState(1);
  const [selectedClass, setSelectedClass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const classes = [
    "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", 
    "Class 11 (JEE/NEET)", "Class 12 (JEE/NEET)", "Dropper (JEE/NEET)",
    "UPSC", "SSC", "Banking", "CA/CS"
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    if (!selectedClass && role === 'student') {
      setError('Please select your class');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        phone: phone,
        name: name,
        role: role,
        class: selectedClass,
        createdAt: serverTimestamp(),
        enrolledCourses: []
      });

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {step === 1 ? 'Create Account' : 'Select Your Class'}
          </h1>
          <p className="text-gray-600">
            {step === 1 ? "Join India's most loved learning platform" : "Help us personalize your learning experience"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {step === 1 ? (
            <>
              <div className="flex gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold border-2 transition-all ${
                    role === 'student' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 text-gray-500 hover:border-gray-200'
                  }`}
                >
                  <GraduationCap className="w-5 h-5" />
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole('faculty')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold border-2 transition-all ${
                    role === 'faculty' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 text-gray-500 hover:border-gray-200'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  Faculty
                </button>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 gap-3 max-h-80 overflow-y-auto p-1">
              {classes.map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => setSelectedClass(cls)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                    selectedClass === cls ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 text-gray-600 hover:border-gray-200'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-4">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] bg-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? 'Processing...' : (
                step === 1 ? 'Next' : <><UserPlus className="w-5 h-5" /> Register</>
              )}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
}
