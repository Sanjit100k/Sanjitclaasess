import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, BookOpen, Users, Award, CheckCircle, ChevronRight, Star, Zap, MessageCircle, ShieldCheck, GraduationCap, Search, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 lg:pt-32 lg:pb-40 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-8 shadow-sm">
                <Zap className="w-4 h-4 fill-current" />
                <span>India's Most Affordable Learning Platform</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1] mb-8">
                Ab Hoga <span className="text-blue-600">Selection</span> <br />
                Har Ghar Se!
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl font-medium">
                Start your journey to success with India's top educators. Quality education that everyone can afford.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2 group"
                >
                  Explore All Batches
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-gray-900 border-2 border-gray-100 px-10 py-5 rounded-2xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                >
                  Join for Free
                </Link>
              </div>
              
              <div className="mt-12 flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i} 
                      src={`https://i.pravatar.cc/100?img=${i+10}`} 
                      className="w-12 h-12 rounded-full border-4 border-white shadow-sm" 
                      alt="" 
                    />
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                    1M+
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-yellow-400 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-sm font-bold text-gray-900">Trusted by 10 Million+ Students</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="https://picsum.photos/seed/education/1200/1000"
                  alt="Students Learning"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-10">
                  <div className="flex items-center gap-4">
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30">
                      <PlayCircle className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-xl">Watch Demo Class</p>
                      <p className="text-white/80 text-sm font-medium">Experience the Sanjit Classes way of learning</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-10 -right-10 bg-white p-6 rounded-3xl shadow-2xl z-20 border border-gray-50 hidden xl:block">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-2xl text-green-600">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900">100% Selection</p>
                    <p className="text-xs text-gray-500 font-bold">In JEE Advanced 2025</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl z-20 border border-gray-50 hidden xl:block">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-100 p-3 rounded-2xl text-orange-600">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900">Live Mentorship</p>
                    <p className="text-xs text-gray-500 font-bold">24/7 Doubt Support</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Happy Students", value: "0" },
              { label: "Video Lectures", value: "0" },
              { label: "Mock Tests", value: "0" },
              { label: "Expert Faculty", value: "0" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-black text-blue-600 mb-1">{stat.value}</p>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-blue-600 font-black uppercase tracking-[0.2em] text-sm mb-4">Why Sanjit Classes?</h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Everything you need to <span className="text-blue-600">Crack</span> your exam</h3>
            <p className="text-lg text-gray-600 font-medium leading-relaxed">We provide a complete ecosystem for your preparation, from top-tier faculty to 24/7 doubt solving.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: PlayCircle,
                title: "Live & Recorded Classes",
                desc: "Attend interactive live classes or watch recordings anytime, anywhere.",
                color: "bg-blue-50 text-blue-600"
              },
              {
                icon: MessageCircle,
                title: "24x7 Doubt Solving",
                desc: "Get your doubts cleared instantly by our expert mentors via chat.",
                color: "bg-green-50 text-green-600"
              },
              {
                icon: BookOpen,
                title: "Best Study Material",
                desc: "Comprehensive notes, DPPs, and books curated by experts.",
                color: "bg-orange-50 text-orange-600"
              },
              {
                icon: Award,
                title: "All India Test Series",
                desc: "Analyze your performance with detailed reports and AIR.",
                color: "bg-purple-50 text-purple-600"
              },
              {
                icon: ShieldCheck,
                title: "Personal Mentorship",
                desc: "One-on-one guidance to keep you motivated and on track.",
                color: "bg-red-50 text-red-600"
              },
              {
                icon: GraduationCap,
                title: "Scholarship Programs",
                desc: "We reward talent with our various scholarship initiatives.",
                color: "bg-yellow-50 text-yellow-600"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className={`${feature.color} w-16 h-16 rounded-3xl flex items-center justify-center mb-8 shadow-inner`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-black text-gray-900 mb-4 leading-tight">{feature.title}</h4>
                <p className="text-gray-600 font-medium leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-blue-600 rounded-[60px] p-12 md:p-24 text-center text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to start your <br /> success story?</h2>
              <p className="text-xl text-blue-100 mb-12 font-medium">Join millions of students who are achieving their dreams with sanjitclaases.</p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-12 py-5 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all shadow-xl"
                >
                  Get Started for Free
                </Link>
                <Link
                  to="/courses"
                  className="bg-blue-700 text-white border-2 border-blue-500/30 px-12 py-5 rounded-2xl font-black text-lg hover:bg-blue-800 transition-all"
                >
                  View All Batches
                </Link>
              </div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-white/10 rounded-full"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
