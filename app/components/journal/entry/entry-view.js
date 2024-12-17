import { EntryViewModel } from './entry-view-model';

export function onNavigatingTo(args) {
    const page = args.object;
    const entryId = page.navigationContext?.entryId;
    page.bindingContext = new EntryViewModel(entryId);
}