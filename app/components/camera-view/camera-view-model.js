import { Observable } from '@nativescript/core';
import { CameraHelper } from '../../shared/utils/camera-helper';
import { LocationHelper } from '../../shared/utils/location-helper';
import { SocialShare } from '@nativescript/social-share';
import { AudioService } from '../../shared/services/audio-service';
import { DialogHelper } from '../../shared/utils/dialog-helper';

export class CameraViewModel extends Observable {
    constructor() {
        super();
        this.lastCapture = null;
        this.location = null;
        this.isCapturing = false;
        this.initializeCamera();
    }

    async initializeCamera() {
        try {
            await CameraHelper.checkAvailability();
            await CameraHelper.requestPermissions();
        } catch (error) {
            console.error('Camera initialization failed:', error);
            await DialogHelper.showError('Camera Error', 'Failed to initialize camera. Please check your device permissions.');
        }
    }

    async onTakePhoto() {
        if (this.isCapturing) {
            return;
        }

        try {
            this.isCapturing = true;
            this.notifyPropertyChange('isCapturing', true);

            const image = await CameraHelper.takePicture();
            if (!image) {
                throw new Error('Failed to capture image');
            }

            this.set('lastCapture', image);
            
            try {
                this.location = await LocationHelper.getCurrentLocation();
                console.log('Photo captured at:', {
                    latitude: this.location.latitude,
                    longitude: this.location.longitude
                });
            } catch (locationError) {
                console.warn('Location not available:', locationError);
            }

            await AudioService.playSound('camera');
        } catch (error) {
            console.error('Error in onTakePhoto:', error);
            await DialogHelper.showError('Camera Error', 'Failed to take photo. Please try again.');
        } finally {
            this.isCapturing = false;
            this.notifyPropertyChange('isCapturing', false);
        }
    }

    async onShare() {
        if (this.lastCapture) {
            try {
                await SocialShare.shareImage(this.lastCapture);
                await AudioService.playSound('share');
            } catch (error) {
                console.error('Error sharing image:', error);
                await DialogHelper.showError('Share Error', 'Failed to share image. Please try again.');
            }
        }
    }

    // Navigation methods remain the same...
}