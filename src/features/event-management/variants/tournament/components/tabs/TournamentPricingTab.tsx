import React from 'react';

interface TournamentPricingTabProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors: Record<string, string>;
}

export const TournamentPricingTab: React.FC<TournamentPricingTabProps> = ({
  formData,
  onFieldChange,
  onInputChange,
  errors
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="registrationFee" className="block text-sm font-medium text-gray-700">
          Biaya Pendaftaran (IDR)
        </label>
        <input
          type="number"
          id="registrationFee"
          name="registrationFee"
          value={formData.registrationFee || ''}
          onChange={onInputChange}
          min="0"
          step="1000"
          className={`mt-1 block w-full rounded-md border ${
            errors.registrationFee ? 'border-red-300' : 'border-gray-300'
          } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
        {errors.registrationFee && <p className="mt-1 text-sm text-red-600">{errors.registrationFee}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="registrationStartDate" className="block text-sm font-medium text-gray-700">
            Tanggal Mulai Pendaftaran
          </label>
          <input
            type="date"
            id="registrationStartDate"
            name="registrationStartDate"
            value={formData.registrationStartDate || ''}
            onChange={onInputChange}
            className={`mt-1 block w-full rounded-md border ${
              errors.registrationStartDate ? 'border-red-300' : 'border-gray-300'
            } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          />
          {errors.registrationStartDate && <p className="mt-1 text-sm text-red-600">{errors.registrationStartDate}</p>}
        </div>

        <div>
          <label htmlFor="registrationEndDate" className="block text-sm font-medium text-gray-700">
            Tanggal Tutup Pendaftaran
          </label>
          <input
            type="date"
            id="registrationEndDate"
            name="registrationEndDate"
            value={formData.registrationEndDate || ''}
            onChange={onInputChange}
            className={`mt-1 block w-full rounded-md border ${
              errors.registrationEndDate ? 'border-red-300' : 'border-gray-300'
            } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          />
          {errors.registrationEndDate && <p className="mt-1 text-sm text-red-600">{errors.registrationEndDate}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700">
          Jumlah Maksimal Peserta
        </label>
        <input
          type="number"
          id="maxParticipants"
          name="maxParticipants"
          value={formData.maxParticipants || ''}
          onChange={onInputChange}
          min="1"
          className={`mt-1 block w-full rounded-md border ${
            errors.maxParticipants ? 'border-red-300' : 'border-gray-300'
          } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
        {errors.maxParticipants && <p className="mt-1 text-sm text-red-600">{errors.maxParticipants}</p>}
      </div>
    </div>
  );
};