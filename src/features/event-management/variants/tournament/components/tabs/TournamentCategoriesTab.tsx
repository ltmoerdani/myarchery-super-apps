import React from 'react';

interface TournamentCategoriesTabProps {
  formData: any;
  onFieldChange: (field: string, value: any) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors: Record<string, string>;
}

export const TournamentCategoriesTab: React.FC<TournamentCategoriesTabProps> = ({
  formData,
  onFieldChange,
  onInputChange,
  errors
}) => {
  const categories = [
    { id: 'recurve', label: 'Recurve' },
    { id: 'compound', label: 'Compound' },
    { id: 'barebow', label: 'Barebow' },
    { id: 'traditional', label: 'Traditional' }
  ];

  const divisions = [
    { id: 'u15', label: 'Under 15' },
    { id: 'u18', label: 'Under 18' },
    { id: 'u21', label: 'Under 21' },
    { id: 'senior', label: 'Senior' },
    { id: 'master', label: 'Master' }
  ];

  const handleCategoryChange = (categoryId: string) => {
    const currentCategories = formData.categories || [];
    const updatedCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter((id: string) => id !== categoryId)
      : [...currentCategories, categoryId];
    onFieldChange('categories', updatedCategories);
  };

  const handleDivisionChange = (divisionId: string) => {
    const currentDivisions = formData.divisions || [];
    const updatedDivisions = currentDivisions.includes(divisionId)
      ? currentDivisions.filter((id: string) => id !== divisionId)
      : [...currentDivisions, divisionId];
    onFieldChange('divisions', updatedDivisions);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Kategori Panahan</h3>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <label
              key={category.id}
              className={`relative flex items-center justify-center p-4 cursor-pointer rounded-lg border ${
                formData.categories?.includes(category.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={formData.categories?.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              <span className="text-sm font-medium">{category.label}</span>
            </label>
          ))}
        </div>
        {errors.categories && <p className="mt-2 text-sm text-red-600">{errors.categories}</p>}
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Divisi Umur</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {divisions.map((division) => (
            <label
              key={division.id}
              className={`relative flex items-center justify-center p-4 cursor-pointer rounded-lg border ${
                formData.divisions?.includes(division.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={formData.divisions?.includes(division.id)}
                onChange={() => handleDivisionChange(division.id)}
              />
              <span className="text-sm font-medium">{division.label}</span>
            </label>
          ))}
        </div>
        {errors.divisions && <p className="mt-2 text-sm text-red-600">{errors.divisions}</p>}
      </div>
    </div>
  );
};