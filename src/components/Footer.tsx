import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <BookOpen className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">sanjitclaases</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              India's most loved educational platform, providing quality education at the most affordable price.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-blue-500 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-pink-500 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/courses" className="hover:text-white transition-colors">All Courses</Link></li>
              <li><Link to="/ncert-solutions" className="hover:text-white transition-colors">NCERT Solutions (Class 8)</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">My Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>support@sanjitclaases.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-500" />
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>Noida, Uttar Pradesh, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} sanjitclaases. All rights reserved. Built with ❤️ for students.</p>
        </div>
      </div>
    </footer>
  );
}
