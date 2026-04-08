import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, query, where, documentId } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { Course } from '../types';
import { PlayCircle, BookOpen, Clock, Star, Award, TrendingUp, Calendar, Users, ChevronRight, MessageCircle, Zap, Layout, GraduationCap, Search, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function Dashboard() {
  const { profile, loading: authLoading, updateProfile } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGoalPrompt, setShowGoalPrompt] = useState(false);

  const classes = [
    "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", 
    "Class 11 (JEE/NEET)", "Class 12 (JEE/NEET)", "Dropper (JEE/NEET)",
    "UPSC", "SSC", "Banking", "CA/CS"
  ];

  useEffect(() => {
    if (profile && !profile.class) {
      setShowGoalPrompt(true);
    } else {
      setShowGoalPrompt(false);
    }

    if (!profile?.enrolledCourses || profile.enrolledCourses.length === 0) {
      setEnrolledCourses([]);
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'courses'), where(documentId(), 'in', profile.enrolledCourses));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEnrolledCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course)));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [profile]);

  const handleGoalSelect = async (cls: string) => {
    await updateProfile({ class: cls });
    setShowGoalPrompt(false);
  };

  if (authLoading || loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Bento Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-200">
              {profile?.name?.[0]}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hi, {profile?.name}!</h1>
              <div className="flex items-center gap-2">
                <p className="text-gray-500 font-medium">{profile?.class || 'Goal not set'}</p>
                {profile?.role === 'admin' && (
                  <Link to="/admin" className="text-[10px] font-black bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase tracking-widest">Admin</Link>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">New</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">0%</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Attendance</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-purple-50 rounded-xl text-purple-600">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">Beginner</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Tests Taken</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: PlayCircle, label: "My Batches", color: "bg-blue-50 text-blue-600", link: "/courses" },
                { icon: BookOpen, label: "NCERT Solutions", color: "bg-orange-50 text-orange-600", link: "/ncert-solutions" },
                { icon: Zap, label: "Test Series", color: "bg-yellow-50 text-yellow-600", link: "/courses" },
                { icon: MessageCircle, label: "Doubts", color: "bg-red-50 text-red-600", link: "/dashboard" },
              ].map((action, i) => (
                <Link 
                  key={i} 
                  to={action.link}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-3 hover:shadow-md transition-all group"
                >
                  <div className={`${action.color} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-gray-700">{action.label}</span>
                </Link>
              ))}
            </div>

            {/* Enrolled Batches */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Batches</h2>
                <Link to="/courses" className="text-sm font-bold text-blue-600 hover:underline">View All</Link>
              </div>
              
              {enrolledCourses.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {enrolledCourses.map(course => (
                    <motion.div 
                      key={course.id}
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100"
                    >
                      <div className="relative aspect-video">
                        <img src={course.thumbnail || `https://picsum.photos/seed/${course.id}/800/450`} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                        <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider">
                          Ongoing
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-gray-900 mb-4 line-clamp-1">{course.title}</h3>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase">
                            <Clock className="w-3 h-3" /> 12 Lessons left
                          </div>
                          <div className="text-[10px] font-bold text-blue-600 uppercase">65% Progress</div>
                        </div>
                        <div className="w-full bg-gray-100 h-1.5 rounded-full mb-6">
                          <div className="bg-blue-600 h-full w-[65%] rounded-full"></div>
                        </div>
                        <Link 
                          to={`/batch/${course.id}`}
                          className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                        >
                          <PlayCircle className="w-4 h-4" /> Resume Learning
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-10 rounded-3xl border border-gray-100 text-center">
                  <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Layout className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">No active batches</h3>
                  <p className="text-sm text-gray-500 mb-6">Start your preparation with India's best faculty.</p>
                  <Link to="/courses" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all inline-block shadow-lg shadow-blue-100">
                    Explore Batches
                  </Link>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Schedule */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" /> Today's Classes
                </h3>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Apr 08</span>
              </div>
              <div className="space-y-4">
                {[
                  { time: "10:00 AM", title: "Physics: Laws of Motion", teacher: "Alakh Pandey", status: "Live" },
                  { time: "02:00 PM", title: "Chemistry: Organic Basics", teacher: "Sarvesh Sir", status: "Upcoming" },
                  { time: "05:00 PM", title: "Maths: Integration", teacher: "MSM Sir", status: "Upcoming" },
                ].map((cls, i) => (
                  <div key={i} className="flex gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                    <div className="flex flex-col items-center justify-center bg-blue-50 text-blue-600 w-14 h-14 rounded-xl shrink-0">
                      <span className="text-[10px] font-bold uppercase">{cls.time.split(' ')[1]}</span>
                      <span className="text-sm font-bold">{cls.time.split(' ')[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-gray-900 text-sm truncate">{cls.title}</h4>
                        {cls.status === 'Live' && (
                          <span className="flex items-center gap-1 text-[8px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full uppercase animate-pulse">
                            <span className="w-1 h-1 bg-red-600 rounded-full"></span> Live
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">by {cls.teacher}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 border-2 border-gray-50 rounded-xl text-gray-500 font-bold text-xs hover:bg-gray-50 transition-all">
                Full Schedule
              </button>
            </div>

            {/* Doubt Banner */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-3xl shadow-xl text-white relative overflow-hidden group">
              <div className="relative z-10">
                <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">Stuck on a problem?</h3>
                <p className="text-blue-100 text-xs mb-6 leading-relaxed">Get instant solutions from our expert mentors 24x7.</p>
                <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all shadow-lg">
                  Ask Your Doubt
                </button>
              </div>
              <div className="absolute -bottom-6 -right-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <GraduationCap className="w-32 h-32" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {[
          { icon: Layout, label: "Home", active: true, link: "/dashboard" },
          { icon: PlayCircle, label: "Batches", active: false, link: "/courses" },
          { icon: Zap, label: "Test", active: false, link: "/dashboard" },
          { icon: Search, label: "Explore", active: false, link: "/courses" },
          { icon: User, label: "Profile", active: false, link: "/dashboard" },
        ].map((item, i) => (
          <Link key={i} to={item.link} className="flex flex-col items-center gap-1">
            <item.icon className={`w-5 h-5 ${item.active ? 'text-blue-600' : 'text-gray-400'}`} />
            <span className={`text-[10px] font-bold ${item.active ? 'text-blue-600' : 'text-gray-400'}`}>{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Goal Selection Prompt Modal */}
      {showGoalPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-[40px] w-full max-w-lg p-10 shadow-2xl text-center"
          >
            <div className="bg-blue-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Choose Your Goal</h2>
            <p className="text-gray-500 mb-8 font-medium">Select your class or target exam to get personalized batches and study material.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[40vh] overflow-y-auto p-1 mb-8 scrollbar-hide">
              {classes.map((cls) => (
                <button
                  key={cls}
                  onClick={() => handleGoalSelect(cls)}
                  className="text-left px-5 py-4 rounded-2xl border-2 border-gray-50 font-bold text-gray-700 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all"
                >
                  {cls}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 font-medium italic">You can change this anytime from the profile menu.</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
