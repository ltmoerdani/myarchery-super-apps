import React, { useState } from 'react';
import { Plus, ChevronRight, Settings, AlertCircle, Edit, Trash } from 'lucide-react';

interface EquipmentItem {
  id: string;
  name: string;
  type: string;
  brand: string;
  model: string;
  purchaseDate: string;
  status: 'active' | 'maintenance' | 'retired';
  lastMaintenance?: string;
  notes?: string;
  image?: string;
}

const mockEquipment: EquipmentItem[] = [
  {
    id: '1',
    name: 'Competition Bow',
    type: 'Recurve Bow',
    brand: 'Hoyt',
    model: 'Formula Xi',
    purchaseDate: '2023-05-15',
    status: 'active',
    lastMaintenance: '2023-09-20',
    notes: 'Used for competitions only',
    image: 'https://images.pexels.com/photos/6602282/pexels-photo-6602282.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    name: 'Training Arrows',
    type: 'Arrows',
    brand: 'Easton',
    model: 'X10',
    purchaseDate: '2023-04-10',
    status: 'maintenance',
    lastMaintenance: '2023-10-05',
    notes: 'Need to replace vanes on 3 arrows',
    image: 'https://images.pexels.com/photos/6602067/pexels-photo-6602067.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '3',
    name: 'Sight',
    type: 'Accessories',
    brand: 'Shibuya',
    model: 'Ultima RC',
    purchaseDate: '2022-11-20',
    status: 'active',
    lastMaintenance: '2023-08-15',
    notes: '',
    image: 'https://images.pexels.com/photos/6601771/pexels-photo-6601771.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

const Equipment: React.FC = () => {
  const [equipment, setEquipment] = useState<EquipmentItem[]>(mockEquipment);
  const [selectedType, setSelectedType] = useState<string>('all');
  
  const equipmentTypes = ['all', 'Recurve Bow', 'Compound Bow', 'Arrows', 'Accessories', 'Protection'];
  
  const filteredEquipment = selectedType === 'all' 
    ? equipment 
    : equipment.filter(item => item.type === selectedType);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-amber-100 text-amber-800';
      case 'retired':
        return 'bg-slate-100 text-slate-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };
  
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Equipment</h1>
          <p className="text-slate-600">Manage your archery equipment inventory</p>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center">
          <Plus size={16} className="mr-2" />
          Add Equipment
        </button>
      </div>
      
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <span className="text-sm text-slate-500">Total Equipment</span>
          <p className="text-2xl font-semibold">{equipment.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <span className="text-sm text-slate-500">Active</span>
          <p className="text-2xl font-semibold text-green-600">
            {equipment.filter(item => item.status === 'active').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <span className="text-sm text-slate-500">In Maintenance</span>
          <p className="text-2xl font-semibold text-amber-600">
            {equipment.filter(item => item.status === 'maintenance').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <span className="text-sm text-slate-500">Retired</span>
          <p className="text-2xl font-semibold text-slate-600">
            {equipment.filter(item => item.status === 'retired').length}
          </p>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 mb-6">
        <div className="flex overflow-x-auto pb-2 space-x-2">
          {equipmentTypes.map(type => (
            <button
              key={type}
              className={`px-4 py-2 rounded-md whitespace-nowrap ${
                selectedType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              onClick={() => setSelectedType(type)}
            >
              {type === 'all' ? 'All Equipment' : type}
            </button>
          ))}
        </div>
      </div>
      
      {/* Maintenance Alerts */}
      {equipment.some(item => item.status === 'maintenance') && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <AlertCircle className="text-amber-500 mt-0.5 mr-3" />
            <div>
              <h3 className="font-medium text-amber-800">Maintenance Needed</h3>
              <p className="text-amber-700 text-sm">
                {equipment.filter(item => item.status === 'maintenance').length} items require maintenance
              </p>
              <button className="mt-2 text-sm font-medium text-amber-800 hover:text-amber-700 inline-flex items-center">
                View all maintenance items
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Equipment List */}
      <div className="space-y-4">
        {filteredEquipment.map(item => (
          <div key={item.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="w-full md:w-40 h-40 flex-shrink-0">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                    No Image
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-grow p-4">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getStatusColor(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md">
                      <Edit size={18} />
                    </button>
                    <button className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md">
                      <Trash size={18} />
                    </button>
                    <button className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-md">
                      <Settings size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
                  <div>
                    <span className="text-xs text-slate-500 block">Type</span>
                    <span className="text-sm">{item.type}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Brand</span>
                    <span className="text-sm">{item.brand}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Model</span>
                    <span className="text-sm">{item.model}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Purchased</span>
                    <span className="text-sm">{new Date(item.purchaseDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {item.lastMaintenance && (
                  <div className="text-xs text-slate-500 mb-2">
                    Last maintenance: {new Date(item.lastMaintenance).toLocaleDateString()}
                  </div>
                )}
                
                {item.notes && (
                  <div className="text-sm text-slate-600 mb-2 line-clamp-1">
                    {item.notes}
                  </div>
                )}
                
                <button className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500 inline-flex items-center">
                  View Details
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {filteredEquipment.length === 0 && (
          <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
            <p className="text-slate-500 mb-4">No equipment found in this category</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center mx-auto">
              <Plus size={16} className="mr-2" />
              Add Equipment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Equipment;