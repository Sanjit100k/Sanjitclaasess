import React, { useState } from 'react';
import { BookOpen, ChevronRight, Search, FileText, Download, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';

const subjects = [
  { 
    name: 'Science', 
    icon: '🔬',
    chapters: [
      { id: 1, title: 'Crop Production and Management', questions: [
        { q: 'What are Kharif crops?', a: 'The crops which are sown in the rainy season are called Kharif crops. Example: Paddy, Maize.' },
        { q: 'What is irrigation?', a: 'The supply of water to crops at regular intervals is called irrigation.' },
        { q: 'What is tilling or ploughing?', a: 'The process of loosening and turning of the soil is called tilling or ploughing.' },
        { q: 'Why is soil turned and loosened?', a: 'Turning and loosening of soil brings the nutrient-rich soil to the top so that plants can use these nutrients.' }
      ]},
      { id: 2, title: 'Microorganisms: Friend and Foe', questions: [
        { q: 'What are microorganisms?', a: 'Organisms that are so small that they cannot be seen with the naked eye.' },
        { q: 'What is fermentation?', a: 'The process of conversion of sugar into alcohol is known as fermentation.' },
        { q: 'What are antibiotics?', a: 'Medicines that kill or stop the growth of disease-causing microorganisms are called antibiotics.' }
      ]},
      { id: 3, title: 'Coal and Petroleum', questions: [
        { q: 'What are fossil fuels?', a: 'Fuels formed from the dead remains of living organisms over millions of years are called fossil fuels.' },
        { q: 'What is carbonisation?', a: 'The slow process of conversion of dead vegetation into coal is called carbonisation.' }
      ]}
    ]
  },
  { 
    name: 'Mathematics', 
    icon: '📐',
    chapters: [
      { id: 1, title: 'Rational Numbers', questions: [
        { q: 'What is a rational number?', a: 'A number that can be expressed in the form p/q, where p and q are integers and q ≠ 0.' },
        { q: 'What is the additive inverse of 2/8?', a: 'The additive inverse of 2/8 is -2/8.' },
        { q: 'What is the multiplicative inverse of -13?', a: 'The multiplicative inverse of -13 is -1/13.' }
      ]},
      { id: 2, title: 'Linear Equations in One Variable', questions: [
        { q: 'Solve: 2x - 3 = 7', a: '2x = 10 => x = 5' },
        { q: 'Solve: 3x = 2x + 18', a: '3x - 2x = 18 => x = 18' }
      ]},
      { id: 3, title: 'Understanding Quadrilaterals', questions: [
        { q: 'What is a regular polygon?', a: 'A polygon with equal sides and equal angles is called a regular polygon.' },
        { q: 'What is the sum of measures of exterior angles of any polygon?', a: 'The sum of the measures of the external angles of any polygon is 360°.' }
      ]}
    ]
  },
  { 
    name: 'Social Science', 
    icon: '🌍',
    chapters: [
      { id: 1, title: 'How, When and Where', questions: [
        { q: 'Who was James Mill?', a: 'A Scottish economist and political philosopher who published a massive three-volume work, A History of British India.' }
      ]}
    ]
  }
];

export default function NCERTSolutions() {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [selectedChapter, setSelectedChapter] = useState(subjects[0].chapters[0]);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-blue-600 text-white pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-black mb-4">NCERT Solutions - Class 8</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">Chapter-wise questions and answers for all subjects. Study smart and score high!</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Subjects */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Select Subject</h3>
              <div className="space-y-2">
                {subjects.map((sub) => (
                  <button
                    key={sub.name}
                    onClick={() => {
                      setSelectedSubject(sub);
                      setSelectedChapter(sub.chapters[0]);
                    }}
                    className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${
                      selectedSubject.name === sub.name ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <span className="text-xl">{sub.icon}</span>
                    {sub.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-3xl text-white shadow-xl">
              <h4 className="font-black text-lg mb-2">Exam Coming?</h4>
              <p className="text-orange-100 text-xs mb-6">Download all solutions in one PDF for offline revision.</p>
              <button className="w-full bg-white text-orange-600 py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Chapter Selection */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 overflow-x-auto">
              <div className="flex gap-4 min-w-max">
                {selectedSubject.chapters.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedChapter(ch)}
                    className={`px-6 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
                      selectedChapter.id === ch.id ? 'bg-blue-50 text-blue-600 border-2 border-blue-600' : 'bg-gray-50 text-gray-500 border-2 border-transparent hover:border-gray-200'
                    }`}
                  >
                    Chapter {ch.id}: {ch.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions & Answers */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-gray-900">{selectedChapter.title}</h2>
                <div className="flex items-center gap-2 text-sm font-bold text-blue-600 cursor-pointer hover:underline">
                  <PlayCircle className="w-4 h-4" /> Watch Video Explanation
                </div>
              </div>

              <div className="space-y-4">
                {selectedChapter.questions.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-lg flex items-center justify-center font-black shrink-0">Q</div>
                      <p className="text-lg font-bold text-gray-900 pt-0.5">{item.q}</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 text-green-600 w-8 h-8 rounded-lg flex items-center justify-center font-black shrink-0">A</div>
                      <p className="text-gray-600 leading-relaxed pt-0.5">{item.a}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
