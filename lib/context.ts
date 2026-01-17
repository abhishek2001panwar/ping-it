import { ContextType } from './types';
import { GeolocationManager } from './geolocation';
import { StorageManager } from './storage';

export class ContextDetector {
  static async detectCurrentContext(): Promise<ContextType[]> {
    const contexts: ContextType[] = [];
    const currentHour = new Date().getHours();

    // Time-based contexts
    if (currentHour >= 21 || currentHour < 6) {
      contexts.push('night');
    }
    if (currentHour >= 5 && currentHour < 12) {
      contexts.push('morning');
    }
    if (currentHour >= 17 && currentHour < 22) {
      contexts.push('evening');
    }

    // Location-based contexts
    try {
      const currentLocation = await GeolocationManager.getCurrentPosition();
      const settings = StorageManager.getSettings();
      
      // Check home location
      const homeLocation = StorageManager.getHomeLocation();
      if (homeLocation) {
        const isAtHome = GeolocationManager.isAtLocation(
          currentLocation,
          homeLocation,
          settings.locationRadius
        );

        if (isAtHome) {
          contexts.push('home');
        }
      }

      // Check custom locations
      let isAtAnyLocation = contexts.includes('home');
      for (const customLoc of settings.customLocations) {
        const isAtLocation = GeolocationManager.isAtLocation(
          currentLocation,
          customLoc.location,
          settings.locationRadius
        );
        if (isAtLocation) {
          contexts.push(customLoc.id);
          isAtAnyLocation = true;
        }
      }

      // Only add "outside" if not at any defined location
      if (!isAtAnyLocation) {
        contexts.push('outside');
      }
    } catch (error) {
      console.warn('Could not detect location-based context:', error);
    }

    return contexts;
  }

  static isTimeInRange(startTime?: string, endTime?: string): boolean {
    if (!startTime && !endTime) return true;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    if (startTime) {
      const [startHour, startMin] = startTime.split(':').map(Number);
      const startMinutes = startHour * 60 + startMin;
      if (currentMinutes < startMinutes) return false;
    }

    if (endTime) {
      const [endHour, endMin] = endTime.split(':').map(Number);
      const endMinutes = endHour * 60 + endMin;
      if (currentMinutes > endMinutes) return false;
    }

    return true;
  }

  static shouldTriggerReminder(
    reminderContext: ContextType,
    currentContexts: ContextType[],
    startTime?: string,
    endTime?: string
  ): boolean {
    const hasContext = currentContexts.includes(reminderContext);
    const isInTimeRange = this.isTimeInRange(startTime, endTime);
    return hasContext && isInTimeRange;
  }
}
