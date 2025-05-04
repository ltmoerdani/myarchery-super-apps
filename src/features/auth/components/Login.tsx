import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import toast from 'react-hot-toast';
import { Bot as Bow, ArrowBigRight, Target, Users } from 'lucide-react';
import { UserRole } from '../models/User';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(email, password, role);
      
      // Redirect based on role
      const redirectPath = role === 'admin' 
        ? '/admin/dashboard' 
        : role === 'organizer' 
          ? '/organizer/dashboard' 
          : '/archer/dashboard';
      
      navigate(redirectPath);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Get the right accent color based on selected role
  const getRoleColor = () => {
    switch (role) {
      case 'admin': return 'from-purple-500 to-purple-600 text-purple-50';
      case 'organizer': return 'from-blue-500 to-blue-600 text-blue-50';
      case 'customer': return 'from-green-500 to-green-600 text-green-50';
      default: return 'from-green-500 to-green-600 text-green-50';
    }
  };

  // Get role-specific benefits list
  const getRoleBenefits = () => {
    switch (role) {
      case 'admin':
        return [
          "Akses ke manajemen pengguna dan role",
          "Pantau dan kelola seluruh event pada platform",
          "Konfigurasi sistem dan pengaturan platform",
          "Akses laporan analitik lengkap"
        ];
      case 'organizer':
        return [
          "Kelola event panahan dengan tools lengkap",
          "Pantau pendaftaran dan pembayaran peserta",
          "Akses sistem scoring dan manajemen hasil",
          "Analisis performa event dan statistik peserta"
        ];
      case 'customer':
        return [
          "Daftar event panahan dengan mudah",
          "Akses informasi event terbaru",
          "Pantau skor dan ranking Anda",
          "Kelola profil dan data atlet Anda"
        ];
      default:
        return [];
    }
  };

  // Get the appropriate icon for the role
  const getRoleIcon = () => {
    switch (role) {
      case 'admin': return <Users className="w-6 h-6" />;
      case 'organizer': return <Target className="w-6 h-6" />;
      case 'customer': return <Bow className="w-6 h-6" />;
      default: return <Bow className="w-6 h-6" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow grid md:grid-cols-2 items-stretch w-full">
        {/* Left column with login form */}
        <div className="flex items-center justify-center bg-white p-8 md:p-12 order-2 md:order-1">
          <div className="w-full max-w-md">
            <div className="mb-6">
              <Link to="/" className="flex items-center text-sm font-medium text-slate-600 hover:text-slate-800">
                <ArrowBigRight className="mr-1 w-4 h-4 rotate-180" />
                Kembali ke halaman utama
              </Link>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Log In</h2>
              <p className="text-slate-600">Masuk ke akun MyArchery Anda</p>
            </div>

            {/* Role selector */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button
                type="button"
                className={`flex flex-col items-center justify-center px-4 py-3 rounded-md border transition-all ${
                  role === 'customer' 
                    ? 'border-green-500 bg-green-50 text-green-700' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => setRole('customer')}
              >
                <Bow className={`w-6 h-6 mb-1 ${role === 'customer' ? 'text-green-600' : 'text-slate-400'}`} />
                <span className="text-sm font-medium">Archer</span>
              </button>
              <button
                type="button"
                className={`flex flex-col items-center justify-center px-4 py-3 rounded-md border transition-all ${
                  role === 'organizer' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => setRole('organizer')}
              >
                <Target className={`w-6 h-6 mb-1 ${role === 'organizer' ? 'text-blue-600' : 'text-slate-400'}`} />
                <span className="text-sm font-medium">Organizer</span>
              </button>
              <button
                type="button"
                className={`flex flex-col items-center justify-center px-4 py-3 rounded-md border transition-all ${
                  role === 'admin' 
                    ? 'border-purple-500 bg-purple-50 text-purple-700' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => setRole('admin')}
              >
                <Users className={`w-6 h-6 mb-1 ${role === 'admin' ? 'text-purple-600' : 'text-slate-400'}`} />
                <span className="text-sm font-medium">Admin</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                />
              </div>
              
              <button
                type="submit"
                className={`w-full py-2 px-4 rounded-md font-medium text-white transition-colors ${
                  role === 'admin'
                    ? 'bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300'
                    : role === 'organizer'
                      ? 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300'
                      : 'bg-green-600 hover:bg-green-700 disabled:bg-green-300'
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
              
              {role === 'customer' && (
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Belum punya akun?{" "}
                    <Link to="/register" className="text-green-600 hover:text-green-500 font-medium">
                      Register
                    </Link>
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
        
        {/* Right column with colored background */}
        <div className={`bg-gradient-to-br ${getRoleColor()} p-8 md:p-12 flex items-center justify-center order-1 md:order-2`}>
          <div className="max-w-xl">
            <div className="flex items-center mb-4">
              {getRoleIcon()}
              <h1 className="text-4xl md:text-5xl font-bold ml-3">
                {role === 'admin' 
                  ? 'Admin Control Panel' 
                  : role === 'organizer' 
                    ? 'Organizer Dashboard' 
                    : 'MyArchery Portal'}
              </h1>
            </div>
            <p className="text-lg mb-8 text-opacity-90">
              {role === 'admin' 
                ? 'Akses ke manajemen platform MyArchery secara keseluruhan dengan tools dan fitur khusus admin.' 
                : role === 'organizer' 
                  ? 'Platform lengkap untuk pengelolaan event panahan dari perencanaan hingga pelaksanaan.'
                  : 'Akses ke platform event panahan dengan fitur lengkap untuk peserta dan penggemar panahan.'}
            </p>
            <div className="space-y-4">
              {getRoleBenefits().map((benefit, idx) => (
                <div key={idx} className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${
                    role === 'admin' 
                      ? 'bg-purple-400' 
                      : role === 'organizer' 
                        ? 'bg-blue-400' 
                        : 'bg-green-400'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;