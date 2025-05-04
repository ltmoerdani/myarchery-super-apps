import React from 'react';

interface TournamentLocationTabProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors: Record<string, string>;
}

export const TournamentLocationTab: React.FC<TournamentLocationTabProps> = ({
  formData,
  onFieldChange,
  onInputChange,
  errors
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="venue" className="block text-sm font-medium text-gray-700">
          Nama Venue
        </label>
        <input
          type="text"
          id="venue"
          name="venue"
          value={formData.venue || ''}
          onChange={onInputChange}
          className={`mt-1 block w-full rounded-md border ${
            errors.venue ? 'border-red-300' : 'border-gray-300'
          } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
        {errors.venue && <p className="mt-1 text-sm text-red-600">{errors.venue}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            Kota
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city || ''}
            onChange={onInputChange}
            className={`mt-1 block w-full rounded-md border ${
              errors.city ? 'border-red-300' : 'border-gray-300'
            } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          />
          {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
        </div>

        <div>
          <label htmlFor="province" className="block text-sm font-medium text-gray-700">
            Provinsi
          </label>
          <input
            type="text"
            id="province"
            name="province"
            value={formData.province || ''}
            onChange={onInputChange}
            className={`mt-1 block w-full rounded-md border ${
              errors.province ? 'border-red-300' : 'border-gray-300'
            } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          />
          {errors.province && <p className="mt-1 text-sm text-red-600">{errors.province}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Alamat Lengkap
        </label>
        <textarea
          id="address"
          name="address"
          rows={3}
          value={formData.address || ''}
          onChange={onInputChange}
          className={`mt-1 block w-full rounded-md border ${
            errors.address ? 'border-red-300' : 'border-gray-300'
          } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
        />
        {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
      </div>
    </div>
  );
};