import React from 'react';
import { MapPin, Plus, Search, Filter, Edit, Trash } from 'lucide-react';

const AdminVenues = () => {
  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Venue Management</h1>
          <p className="text-slate-600">Manage archery venues and facilities</p>
        </div>
        <button 
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center font-medium"
        >
          <Plus size={16} className="mr-2" />
          Add New Venue
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search input */}
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Search venues..."
            />
          </div>
          
          {/* Filter button */}
          <button
            className="flex items-center px-4 py-2 border border-slate-300 rounded-md hover:bg-slate-50 text-slate-700"
          >
            <Filter size={18} className="mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Venues List */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="p-6">
          <div className="flex items-center justify-center text-slate-500 py-8">
            <MapPin size={24} className="mr-2" />
            <p>No venues added yet. Click "Add New Venue" to get started.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminVenues;