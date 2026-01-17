export type ContextType = 'home' | 'outside' | 'night' | 'morning' | 'evening' | string; // string allows custom location IDs

export interface Location {
  latitude: number;
  longitude: number;
}

export interface CustomLocation {
  id: string;
  name: string;
  location: Location;
  icon?: string; // emoji or icon name
  color?: string; // hex color for UI
  createdAt: number;
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
  customLocations: CustomLocation[];
  locationRadius: number; // in meters
  notificationsEnabled: boolean;
}
