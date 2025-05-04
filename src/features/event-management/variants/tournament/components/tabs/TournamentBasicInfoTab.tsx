import React from 'react';

interface TournamentBasicInfoTabProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors: Record<string, string>;
}

export const TournamentBasicInfoTab: React.FC<TournamentBasicInfoTabProps> = ({
  formData,
  onFieldChange,
  onInputChange,
  errors
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nama Tournament
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name || ''}
          onChange={onInputChange}
          className={`mt-1 block w-full rounded-md border ${
            errors.name ? 'border-red-300' : 'border-gray-300'
          } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Deskripsi
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description || ''}
          onChange={onInputChange}
          className={`mt-1 block w-full rounded-md border ${
            errors.description ? 'border-red-300' : 'border-gray-300'
          } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Tanggal Mulai
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate || ''}
            onChange={onInputChange}
            className={`mt-1 block w-full rounded-md border ${
              errors.startDate ? 'border-red-300' : 'border-gray-300'
            } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          />
          {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
            Tanggal Selesai
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate || ''}
            onChange={onInputChange}
            className={`mt-1 block w-full rounded-md border ${
              errors.endDate ? 'border-red-300' : 'border-gray-300'
            } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          />
          {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
        </div>
      </div>
    </div>
  );
};