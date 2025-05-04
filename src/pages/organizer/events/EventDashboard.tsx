import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Edit, Eye, Trash, Calendar, MapPin, Users } from 'lucide-react';

// Custom hooks
import { useTournaments } from '../../../features/event-management/hooks/useTournaments';

// Utils
import { formatCurrency } from '../../../features/event-management/utils/formatters';

const EventDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Fetch tournaments using custom hook
  const { tournaments, loading, error } = useTournaments();
  
  // Filter tournaments based on search and status
  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (tournament.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || tournament.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  // Calculate statistics
  const totalEvents = tournaments.length;
  const activeEvents = tournaments.filter(e => e.status === "active" || e.status === "published").length;
  const totalParticipants = tournaments.reduce((sum, event) => sum + (event.participants || 0), 0);
  const totalRevenue = tournaments.reduce((sum, event) => sum + (event.revenue || 0), 0);
  
  // Navigate to create event page
  const handleCreateEvent = () => {
    navigate('/organizer/events/create');
  };
  
  // Navigate to edit event page
  const handleEditEvent = (id: string) => {
    navigate(`/organizer/events/${id}/edit`);
  };
  
  // Navigate to event details/preview page
  const handleViewEvent = (id: string) => {
    navigate(`/events/${id}`);
  };
  
  // Handle delete event (with confirmation)
  const handleDeleteEvent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) {
      // Logic to delete the event would go here
      console.log('Deleting event', id);
    }
  };
  
  // Status badge colors
  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-slate-100 text-slate-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };
  
  return (
    <div>
      {/* Page Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Event Management</h1>
          <p className="text-slate-600">Kelola semua event panahan Anda</p>
        </div>
        <button 
          onClick={handleCreateEvent}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center font-medium"
        >
          <Plus size={16} className="mr-2" />
          Buat Event Baru
        </button>
      </div>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-blue-800 mb-1">Total Event</h3>
          <p className="text-3xl font-bold text-blue-600">{totalEvents}</p>
          <p className="text-sm text-blue-700 mt-1">Event yang Anda kelola</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-green-800 mb-1">Event Aktif</h3>
          <p className="text-3xl font-bold text-green-600">{activeEvents}</p>
          <p className="text-sm text-green-700 mt-1">Event yang sedang berjalan</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-purple-800 mb-1">Total Peserta</h3>
          <p className="text-3xl font-bold text-purple-600">{totalParticipants}</p>
          <p className="text-sm text-purple-700 mt-1">Jumlah semua peserta</p>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-4">
          <h3 className="text-lg font-medium text-amber-800 mb-1">Total Pendapatan</h3>
          <p className="text-3xl font-bold text-amber-600">{formatCurrency(totalRevenue, 'IDR')}</p>
          <p className="text-sm text-amber-700 mt-1">Total pendapatan event</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
          {/* Search input */}
          <div className="w-full md:w-1/3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Cari event..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Status filter */}
          <div className="flex gap-2 flex-wrap">
            <button
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                statusFilter === "all" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
              onClick={() => setStatusFilter("all")}
            >
              Semua
            </button>
            <button
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                statusFilter === "published" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
              onClick={() => setStatusFilter("published")}
            >
              Dipublikasi
            </button>
            <button
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                statusFilter === "draft" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
              onClick={() => setStatusFilter("draft")}
            >
              Draft
            </button>
            <button
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                statusFilter === "active" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
              onClick={() => setStatusFilter("active")}
            >
              Berlangsung
            </button>
            <button
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                statusFilter === "completed" 
                  ? "bg-blue-600 text-white" 
                  : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
              onClick={() => setStatusFilter("completed")}
            >
              Selesai
            </button>
          </div>
        </div>
      </div>

      {/* Tournament List */}
      {loading ? (
        <div className="flex justify-center items-center p-12">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-t-blue-600 border-r-blue-600 border-b-blue-200 border-l-blue-200 rounded-full animate-spin mb-4 mx-auto"></div>
            <p className="text-gray-600">Memuat data event...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-center">
          <p className="text-red-600">Terjadi kesalahan saat memuat data.</p>
          <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm">
            Coba Lagi
          </button>
        </div>
      ) : filteredTournaments.length === 0 ? (
        <div className="bg-white p-12 rounded-lg shadow-sm border border-slate-200 text-center">
          <p className="text-lg text-slate-500 mb-4">Tidak ada event yang ditemukan</p>
          <button 
            onClick={handleCreateEvent}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 inline-flex items-center"
          >
            <Plus size={16} className="mr-2" />
            Buat Event Baru
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTournaments.map((tournament) => (
            <div key={tournament.id} className="bg-white rounded-lg shadow-sm border p-5">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* Left column: Tournament details */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{tournament.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses(tournament.status)}`}>
                      {tournament.status === 'published' ? 'Dipublikasi' : 
                       tournament.status === 'draft' ? 'Draft' : 
                       tournament.status === 'active' ? 'Berlangsung' : 
                       tournament.status === 'completed' ? 'Selesai' : 
                       tournament.status === 'cancelled' ? 'Dibatalkan' : 
                       'Status lain'}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-3 line-clamp-2">{tournament.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{tournament.startDate ? new Date(tournament.startDate).toLocaleDateString('id-ID') : 'TBA'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{tournament.location?.city || 'Location TBA'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{tournament.participants || 0} peserta</span>
                    </div>
                  </div>
                </div>
                
                {/* Right column: Actions */}
                <div className="flex flex-col justify-between">
                  <div className="flex gap-2 justify-end">
                    <button
                      className="px-3 py-1.5 text-sm border border-slate-200 rounded-md hover:bg-slate-50 flex items-center"
                      onClick={() => handleEditEvent(tournament.id!)}
                    >
                      <Edit size={14} className="mr-1" />
                      Edit
                    </button>
                    <button
                      className="px-3 py-1.5 text-sm border border-slate-200 rounded-md hover:bg-slate-50 flex items-center"
                      onClick={() => handleViewEvent(tournament.id!)}
                    >
                      <Eye size={14} className="mr-1" />
                      Preview
                    </button>
                    <button
                      className="px-3 py-1.5 text-sm border border-red-200 rounded-md hover:bg-red-50 flex items-center text-red-600"
                      onClick={() => handleDeleteEvent(tournament.id!)}
                    >
                      <Trash size={14} className="mr-1" />
                      Hapus
                    </button>
                  </div>
                  
                  <div className="mt-4 text-right">
                    <div className="text-xs text-slate-500">Total Pendapatan</div>
                    <div className="font-semibold text-lg">
                      {formatCurrency(tournament.revenue || 0, 'IDR')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventDashboard;