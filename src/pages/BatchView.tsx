import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, onSnapshot, query, where, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Course, Lesson, Test } from '../types';
import { PlayCircle, FileText, CheckCircle, Clock, Video, BookOpen, MessageSquare, ChevronRight, Play, Award, Users } from 'lucide-react';
import { motion } from 'motion/react';

export default function BatchView() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'lessons' | 'tests' | 'doubts'>('lessons');

  useEffect(() => {
    if (!id) return;

    const unsubscribeCourse = onSnapshot(doc(db, 'courses', id), (docSnap) => {
      if (docSnap.exists()) {
        setCourse({ id: docSnap.id, ...docSnap.data() } as Course);
      }
    });

    const qLessons = query(collection(db, 'lessons'), where('batchId', '==', id));
    const unsubscribeLessons = onSnapshot(qLessons, (snapshot) => {
      const lessonList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Lesson));
      setLessons(lessonList);
      if (lessonList.length > 0 && !activeLesson) {
        setActiveLesson(lessonList[0]);
      }
      setLoading(false);
    });

    const qTests = query(collection(db, 'tests'), where('batchId', '==', id));
    const unsubscribeTests = onSnapshot(qTests, (snapshot) => {
      setTests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Test)));
    });

    return () => {
      unsubscribeCourse();
      unsubscribeLessons();
      unsubscribeTests();
    };
  }, [id]);

  if (loading) return <div className="p-20 text-center">Loading batch content...</div>;
  if (!course) return <div className="p-20 text-center">Batch not found.</div>;

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-white">
      {/* Main Content Area */}
      <div className="flex-grow bg-gray-900 overflow-y-auto">
        <div className="aspect-video w-full bg-black relative group">
          {activeLesson ? (
            <div className="w-full h-full flex items-center justify-center text-white">
              <div className="text-center">
                <Play className="w-20 h-20 mx-auto mb-4 opacity-50 group-hover:opacity-100 transition-opacity cursor-pointer" />
                <h2 className="text-2xl font-bold">{activeLesson.title}</h2>
                <p className="text-gray-400 mt-2">Subject: {activeLesson.subject}</p>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              <p className="text-gray-400">Select a lesson to start watching</p>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <h1 className="text-xl font-bold text-white">{activeLesson?.title || course.title}</h1>
          </div>
        </div>

        <div className="p-8 bg-white">
          <div className="flex items-center gap-8 border-b border-gray-100 mb-8">
            {['lessons', 'tests', 'doubts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-4 text-sm font-bold uppercase tracking-wider transition-all relative ${
                  activeTab === tab ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="max-w-4xl">
            {activeTab === 'lessons' && (
              <div className="space-y-4">
                {lessons.length > 0 ? (
                  lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                        activeLesson?.id === lesson.id ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-blue-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${activeLesson?.id === lesson.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                          {lesson.type === 'recorded' ? <Video className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-gray-900">{lesson.title}</h4>
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{lesson.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-gray-400">45:00</span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <Video className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">No lessons available in this batch yet.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'tests' && (
              <div className="space-y-4">
                {tests.length > 0 ? (
                  tests.map((test) => (
                    <div key={test.id} className="p-6 rounded-3xl border border-gray-100 flex items-center justify-between hover:border-blue-200 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="bg-yellow-50 p-3 rounded-xl text-yellow-600">
                          <Award className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{test.title}</h4>
                          <div className="flex items-center gap-3 text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {test.duration} Mins</span>
                            <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> 20 Questions</span>
                          </div>
                        </div>
                      </div>
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all">
                        Start Test
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <Award className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">No tests scheduled for this batch.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'doubts' && (
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 text-center">
                <MessageSquare className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">24x7 Doubt Solving</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">Got a question? Ask our expert mentors and get a detailed solution within minutes.</p>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
                  Ask a New Doubt
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar for Batch Info */}
      <aside className="w-full lg:w-96 border-l border-gray-100 p-8 bg-white flex flex-col gap-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Batch Details</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600 font-medium">
              <Users className="w-5 h-5 text-blue-600" />
              <span>12,450 Students Enrolled</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 font-medium">
              <BookOpen className="w-5 h-5 text-green-600" />
              <span>Complete Syllabus Coverage</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 font-medium">
              <CheckCircle className="w-5 h-5 text-yellow-600" />
              <span>Regular Mock Tests</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
          <h4 className="font-bold text-blue-900 mb-2">Announcements</h4>
          <p className="text-sm text-blue-700 leading-relaxed">The Physics live class scheduled for 10:00 AM has been moved to 12:00 PM today.</p>
        </div>

        <div className="mt-auto">
          <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2">
            <FileText className="w-5 h-5" /> Download Syllabus
          </button>
        </div>
      </aside>
    </div>
  );
}
