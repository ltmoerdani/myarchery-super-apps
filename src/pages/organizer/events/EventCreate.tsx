import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Components
import { TournamentFormTabs } from '../../../features/event-management/variants/tournament/components/TournamentFormTabs';
import { TournamentBasicInfoTab } from '../../../features/event-management/variants/tournament/components/tabs/TournamentBasicInfoTab';
import { TournamentLocationTab } from '../../../features/event-management/variants/tournament/components/tabs/TournamentLocationTab';
import { TournamentPricingTab } from '../../../features/event-management/variants/tournament/components/tabs/TournamentPricingTab';
import { TournamentCategoriesTab } from '../../../features/event-management/variants/tournament/components/tabs/TournamentCategoriesTab';
import { TournamentDocumentationTab } from '../../../features/event-management/variants/tournament/components/tabs/TournamentDocumentationTab';

// Hooks & Models
import { useTournamentForm } from '../../../features/event-management/variants/tournament/hooks/useTournamentForm';
import { TournamentFormData } from '../../../features/event-management/variants/tournament/model';

// Services
import { TournamentService } from '../../../features/event-management/variants/tournament/service';

const TABS = [
  { id: 'basic-info', label: 'Info Dasar' },
  { id: 'location', label: 'Lokasi' },
  { id: 'pricing', label: 'Harga & Pendaftaran' },
  { id: 'categories', label: 'Kategori' },
  { id: 'documentation', label: 'Dokumentasi' }
];

const EventCreate: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Use the form hook
  const {
    formData,
    errors,
    handleFieldChange,
    handleChange,
    validate,
    isValid
  } = useTournamentForm();
  
  // Tab change handlers
  const handleNextTab = () => {
    const currentTabIndex = TABS.findIndex(tab => tab.id === activeTab);
    if (currentTabIndex < TABS.length - 1) {
      setActiveTab(TABS[currentTabIndex + 1].id);
    }
  };
  
  const handlePrevTab = () => {
    const currentTabIndex = TABS.findIndex(tab => tab.id === activeTab);
    if (currentTabIndex > 0) {
      setActiveTab(TABS[currentTabIndex - 1].id);
    }
  };
  
  // Form submission handlers
  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    try {
      const tournamentId = await TournamentService.createTournament({
        ...formData as TournamentFormData,
        status: 'draft'
      });
      
      navigate(`/organizer/events/${tournamentId}/edit`);
    } catch (error) {
      console.error('Error saving draft:', error);
      // Show error toast
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      // Show validation errors
      return;
    }
    
    setIsSubmitting(true);
    try {
      const tournamentId = await TournamentService.createTournament({
        ...formData as TournamentFormData,
        status: 'published'
      });
      
      navigate(`/organizer/events/${tournamentId}/dashboard`);
    } catch (error) {
      console.error('Error publishing tournament:', error);
      // Show error toast
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Buat Tournament Baru</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-slate-200">
            <div className="flex overflow-x-auto scrollbar-hide">
              {TABS.map((tab, index) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
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
          
          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'basic-info' && (
              <TournamentBasicInfoTab
                formData={formData}
                onFieldChange={handleFieldChange}
                onInputChange={handleChange}
                errors={errors}
              />
            )}
            
            {activeTab === 'location' && (
              <TournamentLocationTab
                formData={formData}
                onFieldChange={handleFieldChange}
                onInputChange={handleChange}
                errors={errors}
              />
            )}
            
            {activeTab === 'pricing' && (
              <TournamentPricingTab
                formData={formData}
                onFieldChange={handleFieldChange}
                onInputChange={handleChange}
                errors={errors}
              />
            )}
            
            {activeTab === 'categories' && (
              <TournamentCategoriesTab
                formData={formData}
                onFieldChange={handleFieldChange}
                onInputChange={handleChange}
                errors={errors}
              />
            )}
            
            {activeTab === 'documentation' && (
              <TournamentDocumentationTab
                formData={formData}
                onFieldChange={handleFieldChange}
                onInputChange={handleChange}
                errors={errors}
              />
            )}
          </div>
          
          {/* Navigation and Action Buttons */}
          <div className="flex justify-between items-center p-6 border-t border-slate-200">
            {activeTab !== TABS[0].id ? (
              <button
                type="button"
                className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 flex items-center"
                onClick={handlePrevTab}
              >
                <ChevronLeft size={16} className="mr-1" />
                Sebelumnya
              </button>
            ) : (
              <div></div> // Empty div to maintain spacing
            )}
            
            <div className="flex gap-3">
              <button
                type="button"
                className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50"
                onClick={handleSaveDraft}
                disabled={isSubmitting}
              >
                Simpan Draft
              </button>
              
              {activeTab !== TABS[TABS.length - 1].id ? (
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  onClick={handleNextTab}
                >
                  Lanjutkan
                  <ChevronRight size={16} className="ml-1" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting ? 'Memproses...' : 'Publikasikan Tournament'}
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EventCreate;