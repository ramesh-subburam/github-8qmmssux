import { CameraViewModel } from './camera-view-model';

export function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new CameraViewModel();
}

export function onUnloaded() {
    // Clean up resources
    const page = args.object;
    page.bindingContext = null;
}