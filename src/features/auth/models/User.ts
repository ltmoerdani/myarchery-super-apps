export type UserRole = 'admin' | 'organizer' | 'customer';

export interface User {
  id: string;
  email: string;
  displayName?: string;
  role: UserRole;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// Domain methods
export function isAdmin(user: User): boolean {
  return user.role === 'admin';
}

export function isOrganizer(user: User): boolean {
  return user.role === 'organizer';
}

export function isCustomer(user: User): boolean {
  return user.role === 'customer';
}