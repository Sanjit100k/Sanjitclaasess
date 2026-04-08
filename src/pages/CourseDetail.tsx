import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { Course } from '../types';
import { Star, Clock, Users, CheckCircle, ShieldCheck, PlayCircle, BookOpen, Award, Video } from 'lucide-react';
import { motion } from 'motion/react';

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const { user, profile } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const unsubscribe = onSnapshot(doc(db, 'courses', id), (docSnap) => {
      if (docSnap.exists()) {
        setCourse({ id: docSnap.id, ...docSnap.data() } as Course);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [id]);

  const isEnrolled = profile?.enrolledCourses?.includes(id || '');

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!id) return;

    setEnrolling(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        enrolledCourses: arrayUnion(id)
      });
      // Instead of alert, we could use a toast or just navigate
      navigate('/dashboard');
    } catch (error) {
      console.error("Enrollment error:", error);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div className="p-20 text-center">Loading course details...</div>;
  if (!course) return <div className="p-20 text-center">Course not found.</div>;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-6">
                {course.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">{course.title}</h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">{course.description || "Master your subjects with India's top educators. Comprehensive coverage of syllabus with regular tests and doubt solving."}</p>
              <div className="flex flex-wrap gap-6 mb-10">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400 fill-current w-5 h-5" />
                  <span className="font-bold">0 (0 Ratings)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span>0 Students Enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-400" />
                  <span>12 Months Validity</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-4xl font-black text-white">₹{course.price}</div>
                {isEnrolled ? (
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="bg-green-600 text-white px-10 py-4 rounded-2xl font-bold text-xl hover:bg-green-700 transition-all flex items-center gap-2"
                  >
                    <CheckCircle className="w-6 h-6" /> Go to Dashboard
                  </button>
                ) : (
                  <button 
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/20"
                  >
                    {enrolling ? 'Processing...' : 'Enroll Now'}
                  </button>
                )}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img 
                  src={course.thumbnail || `https://picsum.photos/seed/${course.id}/1280/720`} 
                  className="w-full h-full object-cover" 
                  alt={course.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors cursor-pointer">
                  <PlayCircle className="w-20 h-20 text-white opacity-80" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">What you'll get</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: Video, title: "Live & Recorded Classes", desc: "Access to both live sessions and recorded lectures for revision." },
                  { icon: BookOpen, title: "DPPs & PDFs", desc: "Daily practice problems and comprehensive PDF notes for every class." },
                  { icon: ShieldCheck, title: "Doubt Support", desc: "Expert faculty to solve your doubts within 24 hours." },
                  { icon: Award, title: "Test Series", desc: "Regular mock tests with detailed performance analysis and AIR." },
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                    <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Course Highlights</h3>
                <ul className="space-y-4">
                  {[
                    "Complete Syllabus Coverage",
                    "Regular Doubt Sessions",
                    "Weekly Mock Tests",
                    "Mentorship Program",
                    "Study Material Included"
                  ].map((text, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                      <CheckCircle className="text-green-600 w-5 h-5 flex-shrink-0" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
