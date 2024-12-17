import { alert } from '@nativescript/core/ui/dialogs';

export class DialogHelper {
    static async showError(title, message) {
        try {
            await alert({
                title: title || 'Error',
                message: message || 'An unexpected error occurred',
                okButtonText: 'OK'
            });
        } catch (error) {
            console.error('Failed to show error dialog:', error);
        }
    }
}