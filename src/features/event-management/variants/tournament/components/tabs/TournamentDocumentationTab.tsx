import React from 'react';

interface TournamentDocumentationTabProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors: Record<string, string>;
}

export const TournamentDocumentationTab: React.FC<TournamentDocumentationTabProps> = ({
  formData,
  onFieldChange,
  onInputChange,
  errors
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="bannerImage" className="block text-sm font-medium text-gray-700">
          Banner Event
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <span>Upload a file</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        {errors.bannerImage && <p className="mt-2 text-sm text-red-600">{errors.bannerImage}</p>}
      </div>

      <div>
        <label htmlFor="rules" className="block text-sm font-medium text-gray-700">
          Peraturan Tournament
        </label>
        <textarea
          id="rules"
          name="rules"
          rows={6}
          value={formData.rules || ''}
          onChange={onInputChange}
          className={`mt-1 block w-full rounded-md border ${
            errors.rules ? 'border-red-300' : 'border-gray-300'
          } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          placeholder="Masukkan peraturan tournament..."
        />
        {errors.rules && <p className="mt-2 text-sm text-red-600">{errors.rules}</p>}
      </div>

      <div>
        <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">
          Jadwal Pertandingan
        </label>
        <textarea
          id="schedule"
          name="schedule"
          rows={6}
          value={formData.schedule || ''}
          onChange={onInputChange}
          className={`mt-1 block w-full rounded-md border ${
            errors.schedule ? 'border-red-300' : 'border-gray-300'
          } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
          placeholder="Masukkan jadwal pertandingan..."
        />
        {errors.schedule && <p className="mt-2 text-sm text-red-600">{errors.schedule}</p>}
      </div>
    </div>
  );
};