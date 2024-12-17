import { Observable, ObservableArray } from '@nativescript/core';
import { CameraHelper } from '../../../shared/utils/camera-helper';
import { LocationHelper } from '../../../shared/utils/location-helper';
import { JournalService } from '../../../shared/services/journal-service';
import { NavigationService } from '../../../shared/services/navigation-service';
import { WeatherService } from '../../../shared/services/weather-service';

export class EntryViewModel extends Observable {
    constructor(entryId = null) {
        super();

        this.isEditing = !!entryId;
        this.entryId = entryId;
        this.cloudImage = null;
        this.title = '';
        this.content = '';
        this.selectedMood = null;
        this.weatherInfo = 'Fetching weather...';

        this.moods = new ObservableArray([
            { emoji: '😊', name: 'Happy', isSelected: false },
            { emoji: '😌', name: 'Peaceful', isSelected: false },
            { emoji: '🤔', name: 'Thoughtful', isSelected: false },
            { emoji: '😴', name: 'Sleepy', isSelected: false },
            { emoji: '🥰', name: 'Loved', isSelected: false },
            { emoji: '✨', name: 'Inspired', isSelected: false }
        ]);

        if (this.isEditing) {
            this.loadEntry();
        }
        this.updateWeatherInfo();
    }

    async loadEntry() {
        try {
            const entry = await JournalService.getEntryById(this.entryId);
            if (entry) {
                this.set('cloudImage', entry.cloudImage);
                this.set('title', entry.title);
                this.set('content', entry.content);
                this.selectMood(entry.mood);
            }
        } catch (error) {
            console.error('Error loading entry:', error);
        }
    }

    async onAddPhoto() {
        try {
            const image = await CameraHelper.takePicture();
            this.set('cloudImage', image);
        } catch (error) {
            console.error('Error taking photo:', error);
        }
    }

    onMoodSelect(args) {
        const mood = args.object.bindingContext;
        this.moods.forEach(m => m.isSelected = false);
        mood.isSelected = true;
        this.selectedMood = mood;
        this.moods.refresh();
    }

    async updateWeatherInfo() {
        try {
            const location = await LocationHelper.getCurrentLocation();
            const weather = await WeatherService.getWeather(location);
            this.set('weatherInfo', `${weather.condition}, ${weather.temperature}°C`);
        } catch (error) {
            console.error('Error fetching weather:', error);
            this.set('weatherInfo', 'Weather unavailable');
        }
    }

    async onSave() {
        if (!this.title || !this.cloudImage) {
            // Show error message
            return;
        }

        const entry = {
            title: this.title,
            content: this.content,
            cloudImage: this.cloudImage,
            mood: this.selectedMood ? this.selectedMood.name : null,
            weatherInfo: this.weatherInfo
        };

        try {
            if (this.isEditing) {
                await JournalService.updateEntry(this.entryId, entry);
            } else {
                await JournalService.saveEntry(entry);
            }
            this.onBack();
        } catch (error) {
            console.error('Error saving entry:', error);
        }
    }

    onBack() {
        NavigationService.goBack();
    }
}