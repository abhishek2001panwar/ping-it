export type ContextType = 'home' | 'outside' | 'night' | 'morning' | 'evening';

export interface Location {
  latitude: number;
  longitude: number;
}

export interface TimeConstraint {
  startTime?: string; // HH:MM format
  endTime?: string;   // HH:MM format
}

export interface Reminder {
  id: string;
  title: string;
  description?: string;
  context: ContextType;
  timeConstraint?: TimeConstraint;
  createdAt: number;
  triggeredAt?: number;
  isActive: boolean;
}

export interface UserSettings {
  homeLocation?: Location;
  locationRadius: number; // in meters
  notificationsEnabled: boolean;
}
