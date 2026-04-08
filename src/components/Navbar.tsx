import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/firebase';
import { BookOpen, User, LogOut, Menu, ChevronDown, Search, Bell } from 'lucide-react';

export default function Navbar() {
  const { user, profile, isAdmin, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [showGoalModal, setShowGoalModal] = React.useState(false);

  const classes = [
    "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", 
    "Class 11 (JEE/NEET)", "Class 12 (JEE/NEET)", "Dropper (JEE/NEET)",
    "UPSC", "SSC", "Banking", "CA/CS"
  ];

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/');
  };

  const handleGoalSelect = async (cls: string) => {
    await updateProfile({ class: cls });
    setShowGoalModal(false);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-200">
                <BookOpen className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight hidden sm:block">sanjitclaases</span>
            </Link>

            {user && (
              <button 
                onClick={() => setShowGoalModal(true)}
                className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100 hover:bg-gray-100 transition-all group"
              >
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Goal:</span>
                <span className="text-sm font-bold text-gray-700">{profile?.class || 'Select Goal'}</span>
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </button>
            )}
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search for batches, books..."
                className="w-full bg-gray-50 border border-gray-100 rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden lg:flex items-center space-x-6 mr-4">
              <Link to="/courses" className="text-sm font-bold text-gray-600 hover:text-blue-600">Courses</Link>
              <Link to="/ncert-solutions" className="text-sm font-bold text-gray-600 hover:text-blue-600">NCERT Solutions</Link>
              <Link to="/dashboard" className="text-sm font-bold text-gray-600 hover:text-blue-600">My Dashboard</Link>
            </div>

            {user ? (
              <div className="flex items-center gap-2 sm:gap-4">
                <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-full relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                {isAdmin && (
                  <Link to="/admin" className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
                    Admin
                  </Link>
                )}
                <Link to="/dashboard" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md group-hover:scale-105 transition-transform">
                    {profile?.name?.[0] || 'U'}
                  </div>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-bold text-gray-700 hover:text-blue-600">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                  Register
                </Link>
              </div>
            )}
            <button className="md:hidden p-2 text-gray-500">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Goal Selection Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Select Your Goal</h2>
              <button onClick={() => setShowGoalModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <Menu className="w-6 h-6 rotate-45" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto p-1">
              {classes.map((cls) => (
                <button
                  key={cls}
                  onClick={() => handleGoalSelect(cls)}
                  className={`text-left px-4 py-3 rounded-2xl border-2 font-bold transition-all ${
                    profile?.class === cls 
                      ? 'border-blue-600 bg-blue-50 text-blue-600' 
                      : 'border-gray-100 text-gray-600 hover:border-blue-100 hover:text-blue-600'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
