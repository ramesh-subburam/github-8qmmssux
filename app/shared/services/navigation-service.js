import { Frame } from '@nativescript/core';

export class NavigationService {
    static navigate(page, context = {}) {
        const frame = Frame.topmost();
        frame.navigate({
            moduleName: page,
            context: context,
            transition: {
                name: 'fade',
                duration: 200
            }
        });
    }

    static goBack() {
        const frame = Frame.topmost();
        frame.goBack();
    }
}