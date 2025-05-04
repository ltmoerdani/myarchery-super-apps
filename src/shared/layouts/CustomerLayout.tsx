import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Trophy, Bot as Bow, Award, Users, MessageSquare, LogOut, ChevronRight, Menu, X, Bell, Search, HelpCircle } from 'lucide-react';
import { useAuth } from '../../features/auth/AuthContext';

const CustomerLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const navItems = [
    { path: '/archer/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/archer/events', label: 'Find Events', icon: <Trophy size={20} /> },
    { path: '/archer/my-events', label: 'My Events', icon: <Award size={20} /> },
    { path: '/archer/equipment', label: 'Equipment', icon: <Bow size={20} /> },
    { path: '/archer/training', label: 'Training', icon: <Award size={20} /> },
    { path: '/archer/community', label: 'Community', icon: <MessageSquare size={20} /> },
    { path: '/archer/profile', label: 'My Profile', icon: <Users size={20} /> },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top navbar */}
      <header className="bg-white border-b border-slate-200 flex items-center justify-between px-4 py-2 lg:py-3">
        <div className="flex items-center">
          <button
            className="lg:hidden mr-2 p-2 rounded-md hover:bg-slate-100"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={24} />
          </button>
          
          <Link to="/archer/dashboard" className="flex items-center">
            <div className="bg-green-600 text-white w-8 h-8 rounded-md flex items-center justify-center font-bold mr-2">
              M
            </div>
            <span className="text-xl font-bold">MyArchery</span>
            <span className="ml-2 bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
              Archer
            </span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search events..."
              className="pl-9 pr-4 py-1.5 border border-slate-300 rounded-md text-sm w-64 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <button className="p-2 rounded-full hover:bg-slate-100 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="p-2 rounded-full hover:bg-slate-100">
            <HelpCircle size={20} />
          </button>
          
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-medium">
              {user?.name?.charAt(0) || user?.email?.charAt(0) || 'A'}
            </div>
            <div className="ml-2 hidden lg:block">
              <div className="text-sm font-medium">{user?.name || user?.email}</div>
              <div className="text-xs text-slate-500">Archer</div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar for mobile (overlay) */}
        <div
          className={`lg:hidden fixed inset-0 z-20 transition-opacity duration-300 ${
            sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="absolute inset-0 bg-slate-900 opacity-50" onClick={() => setSidebarOpen(false)}></div>
          <div className={`absolute top-0 left-0 bottom-0 w-64 bg-white transition-transform duration-300 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className="p-4 border-b border-slate-200 flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-green-600 text-white w-8 h-8 rounded-md flex items-center justify-center font-bold mr-2">
                  M
                </div>
                <span className="text-lg font-bold">MyArchery</span>
              </div>
              <button className="p-2 rounded-md hover:bg-slate-100" onClick={() => setSidebarOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <nav className="p-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                        isActive(item.path)
                          ? 'bg-green-50 text-green-700'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className={`${isActive(item.path) ? 'text-green-600' : 'text-slate-500'} mr-3`}>
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.label}</span>
                      {isActive(item.path) && (
                        <span className="ml-auto text-green-600">
                          <ChevronRight size={16} />
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4 mt-6 border-t border-slate-200">
                <button
                  onClick={handleSignOut}
                  className="flex items-center w-full px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                >
                  <span className="text-slate-500 mr-3">
                    <LogOut size={20} />
                  </span>
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
        
        {/* Sidebar for desktop (permanent) */}
        <aside className="hidden lg:block w-64 border-r border-slate-200 bg-white">
          <nav className="p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      isActive(item.path)
                        ? 'bg-green-50 text-green-700'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className={`${isActive(item.path) ? 'text-green-600' : 'text-slate-500'} mr-3`}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                    {isActive(item.path) && (
                      <span className="ml-auto text-green-600">
                        <ChevronRight size={16} />
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="pt-4 mt-6 border-t border-slate-200">
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
              >
                <span className="text-slate-500 mr-3">
                  <LogOut size={20} />
                </span>
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CustomerLayout;