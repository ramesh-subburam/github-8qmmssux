import { Geolocation } from '@nativescript/geolocation';
import { PermissionsHelper } from './permissions-helper';

export class LocationHelper {
    static async getCurrentLocation() {
        try {
            const hasPermission = await PermissionsHelper.requestLocationPermission();
            
            if (!hasPermission) {
                throw new Error('Location permission denied');
            }

            // Enable location services
            await Geolocation.enableLocationRequest();

            // Get current location
            return await Geolocation.getCurrentLocation({
                desiredAccuracy: 3,
                maximumAge: 5000,
                timeout: 10000
            });
        } catch (error) {
            console.error('Error getting location:', error);
            throw new Error('Failed to get location: ' + error.message);
        }
    }
}