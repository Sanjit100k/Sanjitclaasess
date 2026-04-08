import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Course } from '../types';
import { Search, Filter, Star, Clock, Users, ChevronRight, BookOpen, Zap, LayoutGrid } from 'lucide-react';
import { motion } from 'motion/react';

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
  <Link to={`/course/${course.id}`}>
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 group"
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={course.thumbnail || `https://picsum.photos/seed/${course.id}/800/450`} 
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
          {course.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-black text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{course.title}</h3>
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 font-bold uppercase tracking-wider">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
            <span className="text-gray-900">4.9</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>10k+ Students</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-5 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Starting from</span>
            <div className="text-2xl font-black text-gray-900">₹{course.price}</div>
          </div>
          <div className="bg-blue-600 text-white p-3 rounded-2xl group-hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.div>
  </Link>
);

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ["All", "JEE", "NEET", "UPSC", "Class 12", "Class 11", "Class 10", "Class 9", "Commerce", "Defence", "CA"];

  useEffect(() => {
    let q = collection(db, 'courses');
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const courseList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
      setCourses(courseList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || categoryFilter === 'All' || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[10px] mb-2">
                <Zap className="w-3 h-3 fill-current" />
                <span>Premium Batches</span>
              </div>
              <h1 className="text-4xl font-black text-gray-900 leading-tight">
                Find Your <span className="text-blue-600">Perfect</span> Batch
              </h1>
            </div>
            <div className="relative md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
              <input 
                type="text" 
                placeholder="Search by batch name, exam..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-bold text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <Filter className="w-3 h-3" /> Categories
                </h3>
                <div className="flex flex-wrap lg:flex-col gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSearchParams(cat === 'All' ? {} : { category: cat })}
                      className={`px-4 py-3 rounded-xl font-bold text-sm transition-all text-left flex items-center justify-between group ${
                        (categoryFilter === cat || (!categoryFilter && cat === 'All'))
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                          : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-100'
                      }`}
                    >
                      {cat}
                      <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                        (categoryFilter === cat || (!categoryFilter && cat === 'All')) ? 'opacity-100' : 'opacity-0'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-[32px] text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="font-black text-lg mb-2">Need Guidance?</h4>
                  <p className="text-blue-100 text-[10px] font-bold uppercase tracking-wider mb-6">Talk to our experts</p>
                  <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-black text-xs hover:bg-blue-50 transition-all">
                    Request Callback
                  </button>
                </div>
                <div className="absolute -bottom-4 -right-4 opacity-10">
                  <BookOpen className="w-24 h-24" />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                <LayoutGrid className="w-4 h-4" />
                <span>Showing {filteredCourses.length} Batches</span>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-white p-4 rounded-[32px] border border-gray-100 space-y-4">
                    <div className="bg-gray-100 animate-pulse aspect-video rounded-2xl"></div>
                    <div className="h-6 bg-gray-100 animate-pulse rounded-full w-3/4"></div>
                    <div className="h-4 bg-gray-100 animate-pulse rounded-full w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white rounded-[40px] border border-gray-100">
                <div className="bg-blue-50 w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto mb-8">
                  <Search className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">No batches found</h3>
                <p className="text-gray-500 font-medium mb-8">Try adjusting your search or category filters.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSearchParams({}); }}
                  className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
