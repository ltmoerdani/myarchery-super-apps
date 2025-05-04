export interface BaseEventModel {
  id?: string;
  name: string;
  description: string;
  organizer?: string;
  visibility?: 'public' | 'unlisted' | 'private';
  status: EventStatus;
  createdAt?: string;
  updatedAt?: string;
}

export enum EventStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface EventLocation {
  locationType: "offline" | "online";
  address?: string;
  city?: string;
  province?: string;
  venue?: string;
  googleMapsUrl?: string;
  onlineLink?: string;
}

export interface EventCategory {
  id: string;
  name: string;
  description?: string;
  price?: number;
  maxParticipants?: number;
  currentParticipants?: number;
}

export interface EventSchedule {
  date: string;
  startTime: string;
  endTime: string;
  title: string;
  description?: string;
}

export interface EventDocument {
  title: string;
  url: string;
  type: string;
  required: boolean;
}