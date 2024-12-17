import { Observable, ObservableArray } from '@nativescript/core';
import { JournalService } from '../../shared/services/journal-service';
import { NavigationService } from '../../shared/services/navigation-service';

export class JournalViewModel extends Observable {
    constructor() {
        super();
        this.journalEntries = new ObservableArray([]);
        this.loadEntries();
    }

    async loadEntries() {
        try {
            const entries = await JournalService.getEntries();
            this.journalEntries.splice(0);
            this.journalEntries.push(...entries);
        } catch (error) {
            console.error('Error loading journal entries:', error);
        }
    }

    onNewEntry() {
        NavigationService.navigate('components/journal/entry/entry-view');
    }

    onEntryTap(args) {
        const entry = this.journalEntries.getItem(args.index);
        NavigationService.navigate('components/journal/entry/entry-view', {
            entryId: entry.id
        });
    }

    // Navigation methods
    onHomeTab() {
        NavigationService.navigate('components/home/home-view');
    }

    onExploreTab() {
        NavigationService.navigate('components/explore/explore-view');
    }

    onCameraTab() {
        NavigationService.navigate('components/camera-view/camera-view');
    }

    onJournalTab() {
        // Already on journal tab
    }

    onProfileTab() {
        NavigationService.navigate('components/profile/profile-view');
    }
}