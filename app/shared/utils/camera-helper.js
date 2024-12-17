import { Camera } from '@nativescript/camera';
import { ImageSource } from '@nativescript/core';
import { APP_CONSTANTS } from '../config/constants';

export class CameraHelper {
    static async checkAvailability() {
        try {
            // Explicitly check if Camera is defined
            if (!Camera) {
                throw new Error('Camera module is not properly initialized');
            }
            
            // Check if the device has a camera
            const isAvailable = Camera.isAvailable();
            if (!isAvailable) {
                throw new Error('Camera is not available on this device');
            }
            
            return true;
        } catch (error) {
            console.error('Camera availability check failed:', error);
            throw error;
        }
    }

    static async requestPermissions() {
        try {
            const result = await Camera.requestPermissions();
            return result === true || (result && result.camera === true);
        } catch (error) {
            console.error('Camera permission request failed:', error);
            throw error;
        }
    }

    static async takePicture() {
        try {
            // Check camera availability first
            await this.checkAvailability();
            
            // Request permissions
            const hasPermission = await this.requestPermissions();
            if (!hasPermission) {
                throw new Error('Camera permission denied');
            }

            const options = {
                width: 1920,
                height: 1080,
                keepAspectRatio: APP_CONSTANTS.CAMERA.KEEP_ASPECT_RATIO,
                saveToGallery: APP_CONSTANTS.CAMERA.SAVE_TO_GALLERY,
                cameraFacing: 'rear'
            };

            // Take picture
            const imageAsset = await Camera.takePicture(options);
            
            // Convert to ImageSource
            const imageSource = await ImageSource.fromAsset(imageAsset);
            
            return imageSource;
        } catch (error) {
            console.error('Error in takePicture:', error);
            throw new Error(`Camera operation failed: ${error.message}`);
        }
    }
}