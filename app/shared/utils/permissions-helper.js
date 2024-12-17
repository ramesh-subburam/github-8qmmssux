import { Geolocation } from '@nativescript/geolocation';
import { Camera } from '@nativescript/camera';
import { isAndroid } from '@nativescript/core';

export class PermissionsHelper {
    static async requestLocationPermission() {
        try {
            const hasPermission = await Geolocation.hasPermission();
            
            if (!hasPermission) {
                return await Geolocation.requestPermission();
            }
            
            return true;
        } catch (error) {
            console.error('Error requesting location permission:', error);
            return false;
        }
    }

    static async requestCameraPermission() {
        try {
            if (!Camera.isAvailable()) {
                throw new Error('Camera not available on this device');
            }

            // Request permission
            const result = await Camera.requestPermissions();
            
            // On Android, we need to explicitly check if permission was granted
            if (isAndroid) {
                return result && result.camera;
            }
            
            return true;
        } catch (error) {
            console.error('Error requesting camera permission:', error);
            return false;
        }
    }
}