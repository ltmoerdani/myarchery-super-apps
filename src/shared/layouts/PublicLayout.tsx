import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Bot as Bow } from 'lucide-react';

const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <div className="bg-green-600 text-white w-8 h-8 rounded-md flex items-center justify-center font-bold mr-2">
                <Bow size={24} />
              </div>
              <span className="text-xl font-bold">MyArchery</span>
            </Link>
            
            <nav className="flex items-center space-x-4">
              <Link to="/events" className="text-slate-600 hover:text-slate-900">
                Events
              </Link>
              <Link to="/login" className="text-slate-600 hover:text-slate-900">
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Register
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-600">
            <p>&copy; {new Date().getFullYear()} MyArchery. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;