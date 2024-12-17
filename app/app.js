import { Application } from '@nativescript/core';
import { PermissionsHelper } from './shared/utils/permissions-helper';

// Initialize permissions
async function initializePermissions() {
    try {
        // Request location permission
        const locationGranted = await PermissionsHelper.requestLocationPermission();
        console.log('Location permission:', locationGranted ? 'granted' : 'denied');

        // Request camera permission
        const cameraGranted = await PermissionsHelper.requestCameraPermission();
        console.log('Camera permission:', cameraGranted ? 'granted' : 'denied');
    } catch (error) {
        console.error('Error initializing permissions:', error);
    }
}

// Initialize permissions when app starts
initializePermissions();

Application.run({ moduleName: 'app-root' });