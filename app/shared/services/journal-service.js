import { ApplicationSettings } from '@nativescript/core';

export class JournalService {
    static STORAGE_KEY = 'journal_entries';

    static async getEntries() {
        try {
            const entriesJson = ApplicationSettings.getString(this.STORAGE_KEY, '[]');
            return JSON.parse(entriesJson);
        } catch (error) {
            console.error('Error getting journal entries:', error);
            return [];
        }
    }

    static async saveEntry(entry) {
        try {
            const entries = await this.getEntries();
            const newEntry = {
                id: Date.now().toString(),
                date: new Date().toISOString(),
                ...entry
            };
            entries.unshift(newEntry);
            ApplicationSettings.setString(this.STORAGE_KEY, JSON.stringify(entries));
            return newEntry;
        } catch (error) {
            console.error('Error saving journal entry:', error);
            throw error;
        }
    }

    static async getEntryById(id) {
        const entries = await this.getEntries();
        return entries.find(entry => entry.id === id);
    }

    static async updateEntry(id, updatedEntry) {
        const entries = await this.getEntries();
        const index = entries.findIndex(entry => entry.id === id);
        if (index !== -1) {
            entries[index] = { ...entries[index], ...updatedEntry };
            ApplicationSettings.setString(this.STORAGE_KEY, JSON.stringify(entries));
            return entries[index];
        }
        throw new Error('Entry not found');
    }
}