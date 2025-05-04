import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, MapPin, Filter, ChevronRight, Clock, Medal, Users, Star } from 'lucide-react';

interface Event {
  id: string;
  name: string;
  type: string;
  startDate: string;
  endDate: string;
  location: {
    city: string;
    province: string;
  };
  bannerImage?: string;
  categories: string[];
  registrationEndDate: string;
  price: number;
  organizer: string;
  featured?: boolean;
}

const mockEvents: Event[] = [
  {
    id: '1',
    name: 'National Archery Championship 2025',
    type: 'tournament',
    startDate: '2025-06-15',
    endDate: '2025-06-18',
    location: {
      city: 'Jakarta',
      province: 'DKI Jakarta'
    },
    bannerImage: 'https://images.pexels.com/photos/6603639/pexels-photo-6603639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    categories: ['Recurve', 'Compound', 'Traditional'],
    registrationEndDate: '2025-06-01',
    price: 250000,
    organizer: 'Indonesia Archery Association',
    featured: true
  },
  {
    id: '2',
    name: 'Jakarta Archery Open',
    type: 'tournament',
    startDate: '2025-07-22',
    endDate: '2025-07-24',
    location: {
      city: 'Jakarta',
      province: 'DKI Jakarta'
    },
    bannerImage: 'https://images.pexels.com/photos/6603640/pexels-photo-6603640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    categories: ['Recurve', 'Compound'],
    registrationEndDate: '2025-07-10',
    price: 200000,
    organizer: 'Jakarta Archery Club'
  },
  {
    id: '3',
    name: 'Bandung Indoor Championship',
    type: 'tournament',
    startDate: '2025-08-05',
    endDate: '2025-08-06',
    location: {
      city: 'Bandung',
      province: 'West Java'
    },
    bannerImage: 'https://images.pexels.com/photos/6600788/pexels-photo-6600788.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    categories: ['Recurve', 'Compound', 'Barebow'],
    registrationEndDate: '2025-07-25',
    price: 175000,
    organizer: 'Bandung Archery Association'
  }
];

const Events: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  
  const categories = ['Recurve', 'Compound', 'Traditional', 'Barebow'];
  const locations = ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta'];
  
  // Filter events based on search term, category, and location
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || event.categories.includes(selectedCategory);
    const matchesLocation = !selectedLocation || event.location.city === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });
  
  // Format price to IDR currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };
  
  // Calculate days until registration closes
  const getDaysUntilRegistrationClose = (date: string) => {
    const today = new Date();
    const regEndDate = new Date(date);
    const diffTime = regEndDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };
  
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Upcoming Events</h1>
        <p className="text-slate-600">Discover and register for archery tournaments across Indonesia</p>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search input */}
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filter toggle */}
          <button
            className="flex items-center px-4 py-2 border border-slate-300 rounded-md hover:bg-slate-50 text-slate-700"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} className="mr-2" />
            Filters
          </button>
        </div>
        
        {/* Expanded filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`px-3 py-1.5 text-sm rounded-md ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                      onClick={() => setSelectedCategory(
                        selectedCategory === category ? null : category
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Location filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                <div className="flex flex-wrap gap-2">
                  {locations.map(location => (
                    <button
                      key={location}
                      className={`px-3 py-1.5 text-sm rounded-md ${
                        selectedLocation === location
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                      onClick={() => setSelectedLocation(
                        selectedLocation === location ? null : location
                      )}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Featured event */}
      {filteredEvents.some(event => event.featured) && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center">
            <Star className="text-yellow-500 mr-2" size={20} />
            Featured Event
          </h2>
          
          {filteredEvents
            .filter(event => event.featured)
            .map(event => (
              <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-md border border-slate-200">
                <div className="h-48 relative">
                  {event.bannerImage ? (
                    <img
                      src={event.bannerImage}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                      <span className="text-slate-400">No image available</span>
                    </div>
                  )}
                  <div className="absolute top-0 left-0 bg-green-600 text-white px-3 py-1 text-sm font-medium">
                    Featured
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                  
                  <div className="flex flex-wrap gap-3 mb-3">
                    <div className="flex items-center text-slate-600">
                      <Calendar size={16} className="mr-1" />
                      <span className="text-sm">
                        {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
                        {new Date(event.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <MapPin size={16} className="mr-1" />
                      <span className="text-sm">{event.location.city}, {event.location.province}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {event.categories.map(category => (
                      <span 
                        key={category} 
                        className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-xs text-slate-500 block">Registration Fee</span>
                      <span className="font-semibold">{formatPrice(event.price)}</span>
                    </div>
                    
                    <div>
                      <span className="text-xs text-slate-500 block">Organizer</span>
                      <span className="text-sm">{event.organizer}</span>
                    </div>
                    
                    <div className="flex items-center bg-amber-100 text-amber-800 px-2 py-1 rounded-md">
                      <Clock size={14} className="mr-1" />
                      <span className="text-xs font-medium">
                        {getDaysUntilRegistrationClose(event.registrationEndDate)} days left to register
                      </span>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/events/${event.id}`}
                    className="block w-full py-2 bg-green-600 text-center text-white rounded-md hover:bg-green-700 transition-colors font-medium"
                  >
                    View Event
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}
      
      {/* Events list */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center">
          <Medal className="text-blue-500 mr-2" size={20} />
          Upcoming Tournaments
        </h2>
        
        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 text-center">
            <p className="text-slate-500 mb-2">No events found</p>
            <p className="text-slate-400 text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents.map(event => (
              <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 flex flex-col">
                <div className="h-40 relative">
                  {event.bannerImage ? (
                    <img
                      src={event.bannerImage}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                      <span className="text-slate-400">No image available</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex-grow">
                  <h3 className="font-bold mb-2 line-clamp-1">{event.name}</h3>
                  
                  <div className="flex flex-col gap-1 mb-3 text-sm">
                    <div className="flex items-center text-slate-600">
                      <Calendar size={14} className="mr-1 flex-shrink-0" />
                      <span className="truncate">
                        {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <MapPin size={14} className="mr-1 flex-shrink-0" />
                      <span className="truncate">{event.location.city}, {event.location.province}</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <Users size={14} className="mr-1 flex-shrink-0" />
                      <span className="truncate">{event.categories.join(', ')}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end mt-auto">
                    <div>
                      <span className="text-xs text-slate-500 block">Fee</span>
                      <span className="font-semibold">{formatPrice(event.price)}</span>
                    </div>
                    
                    <Link 
                      to={`/events/${event.id}`}
                      className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Details <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
                
                {/* Registration countdown footer */}
                <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 text-xs flex items-center text-slate-700">
                  <Clock size={12} className="mr-1" />
                  Registration closes in {getDaysUntilRegistrationClose(event.registrationEndDate)} days
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;