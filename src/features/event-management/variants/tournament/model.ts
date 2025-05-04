import { BaseEventModel, EventLocation, EventCategory, EventSchedule, EventDocument, EventStatus } from '../../models/event';

export interface TournamentModel extends BaseEventModel {
  // Basic info additional fields
  eventType: string;
  logo: ImageInput;
  bannerImage: ImageInput;
  featuredImage: ImageInput;

  // Location
  location: EventLocation;

  // Schedule
  startDate: string;
  endDate?: string;
  registrationStartDate: string;
  registrationEndDate: string;
  schedules?: EventSchedule[];
  
  // Pricing
  pricingType: "single" | "multi" | "free";
  registrationFee?: number;
  currency: string;
  categories?: EventCategory[];
  earlyBird?: EarlyBirdSettings;
  lateRegistration?: LateRegistrationSettings;
  
  // Capacity
  maxParticipants: number;
  quotaType: "total" | "category";
  categoryQuotas?: CategoryQuota[];
  
  // Categories
  ageCategories?: AgeCategory[];
  equipmentCategories?: EquipmentCategory[];
  
  // Additional settings
  generalRules?: string;
  schedule?: string;
  termsAndConditions?: string;
  requireTermsAcceptance?: boolean;
  requireDocumentUpload?: boolean;
  documentRequirements?: string;
  documents?: EventDocument[];
  countdown?: CountdownSettings;
}

export interface EarlyBirdSettings {
  enabled: boolean;
  discount: number;
  endDate: string;
}

export interface LateRegistrationSettings {
  enabled: boolean;
  fee: number;
  startDate: string;
}

export interface CategoryQuota {
  category: string;
  quota: number | string;
}

export interface AgeCategory {
  name: string;
  minAge: number;
  maxAge: number;
}

export interface EquipmentCategory {
  name: string;
  description?: string;
}

export interface CountdownSettings {
  eventStart?: boolean;
  registrationEnd?: boolean;
}

export interface ImageInput {
  url?: string;
  file?: File;
  preview?: string;
}

export interface TournamentParticipant {
  id: string;
  userId: string;
  name: string;
  email: string;
  category?: string;
  registeredAt: string;
  status: 'registered' | 'confirmed' | 'checked-in';
  paymentStatus?: 'unpaid' | 'pending' | 'paid' | 'refunded';
}

export interface TournamentWithParticipantCount extends TournamentModel {
  participants?: number;
  revenue?: number;
}

export type TournamentFormData = TournamentModel;
export type TournamentStatus = EventStatus;