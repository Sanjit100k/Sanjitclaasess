import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { collection, addDoc, onSnapshot, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Course } from '../types';
import { LayoutDashboard, BookOpen, Users, Plus, Trash2, Edit, X, Upload } from 'lucide-react';
import { motion } from 'motion/react';

const AdminCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: 'JEE',
    price: 0,
    thumbnail: ''
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'courses'), (snapshot) => {
      setCourses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course)));
    });
    return () => unsubscribe();
  }, []);

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'courses'), {
        ...newCourse,
        createdAt: serverTimestamp(),
        price: Number(newCourse.price)
      });
      setShowAddModal(false);
      setNewCourse({ title: '', description: '', category: 'JEE', price: 0, thumbnail: '' });
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      await deleteDoc(doc(db, 'courses', id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Manage Courses</h2>
        <div className="flex gap-4">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" /> Add Course
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-bottom border-gray-100">
            <tr>
              <th className="px-6 py-4 font-bold text-gray-700">Course</th>
              <th className="px-6 py-4 font-bold text-gray-700">Category</th>
              <th className="px-6 py-4 font-bold text-gray-700">Price</th>
              <th className="px-6 py-4 font-bold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.map(course => (
              <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={course.thumbnail || 'https://picsum.photos/seed/course/100/100'} className="w-10 h-10 rounded-lg object-cover" alt="" />
                    <span className="font-medium text-gray-900">{course.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-bold">{course.category}</span>
                </td>
                <td className="px-6 py-4 font-bold text-gray-900">₹{course.price}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button className="text-gray-400 hover:text-blue-600"><Edit className="w-5 h-5" /></button>
                    <button onClick={() => handleDeleteCourse(course.id)} className="text-gray-400 hover:text-red-600"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Add New Course</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleAddCourse} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Course Title</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCourse.title}
                  onChange={e => setNewCourse({...newCourse, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                  <select 
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
                    value={newCourse.category}
                    onChange={e => setNewCourse({...newCourse, category: e.target.value})}
                  >
                    {["JEE", "NEET", "UPSC", "Class 12", "Class 11", "Class 10", "Class 9", "Commerce", "Defence", "CA"].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Price (₹)</label>
                  <input 
                    type="number" 
                    required
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
                    value={newCourse.price}
                    onChange={e => setNewCourse({...newCourse, price: Number(e.target.value)})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                <textarea 
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  value={newCourse.description}
                  onChange={e => setNewCourse({...newCourse, description: e.target.value})}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Thumbnail URL</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                  value={newCourse.thumbnail}
                  onChange={e => setNewCourse({...newCourse, thumbnail: e.target.value})}
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
                Create Course
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default function Admin() {
  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <aside className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col gap-2">
        <Link to="/admin" className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-gray-600 hover:text-blue-600 font-medium transition-all">
          <LayoutDashboard className="w-5 h-5" /> Overview
        </Link>
        <Link to="/admin/courses" className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-gray-600 hover:text-blue-600 font-medium transition-all">
          <BookOpen className="w-5 h-5" /> Courses
        </Link>
        <Link to="/admin/users" className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-gray-600 hover:text-blue-600 font-medium transition-all">
          <Users className="w-5 h-5" /> Users
        </Link>
      </aside>
      <main className="flex-grow bg-gray-50">
        <Routes>
          <Route path="/" element={<div className="p-8"><h1 className="text-3xl font-bold">Admin Dashboard</h1><p className="text-gray-600 mt-2">Welcome to the control center.</p></div>} />
          <Route path="/courses" element={<AdminCourses />} />
          <Route path="/users" element={<div className="p-8">User management coming soon...</div>} />
        </Routes>
      </main>
    </div>
  );
}
