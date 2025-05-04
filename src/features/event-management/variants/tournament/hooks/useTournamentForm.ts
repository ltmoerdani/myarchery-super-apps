import { useState } from 'react';
import { TournamentFormData } from '../model';

export const useTournamentForm = () => {
  const [formData, setFormData] = useState<Partial<TournamentFormData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for the field if it exists
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    handleFieldChange(name, value);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!formData.registrationEndDate) {
      newErrors.registrationEndDate = 'Registration end date is required';
    }

    if (!formData.maxParticipants) {
      newErrors.maxParticipants = 'Maximum participants is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    handleFieldChange,
    handleChange,
    validate,
    isValid: Object.keys(errors).length === 0
  };
};