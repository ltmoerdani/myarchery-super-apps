import React from 'react';

interface TournamentFormTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const TournamentFormTabs: React.FC<TournamentFormTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'basic-info', label: 'Info Dasar' },
    { id: 'location', label: 'Lokasi' },
    { id: 'pricing', label: 'Harga & Pendaftaran' },
    { id: 'categories', label: 'Kategori' },
    { id: 'documentation', label: 'Dokumentasi' }
  ];

  return (
    <div className="border-b border-slate-200">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="inline-flex items-center">
              <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center mr-2 text-xs">
                {index + 1}
              </span>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};