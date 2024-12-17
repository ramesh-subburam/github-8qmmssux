import { MeditationViewModel } from './meditation-view-model';

export function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = new MeditationViewModel();
}

export function onUnloaded(args) {
    const page = args.object;
    if (page.bindingContext) {
        page.bindingContext.onUnloaded();
    }
    page.bindingContext = null;
}