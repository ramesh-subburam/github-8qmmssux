import { Observable, ObservableArray } from '@nativescript/core';
import { MeditationService } from '../../shared/services/meditation-service';
import { NavigationService } from '../../shared/services/navigation-service';
import { AudioService } from '../../shared/services/audio-service';

export class MeditationViewModel extends Observable {
    constructor() {
        super();
        this.isPlaying = false;
        this.currentTime = 0;
        this.meditationSessions = new ObservableArray([
            { id: 1, title: 'Cloud Gazing Basics', duration: '5 min', audioFile: 'meditation1.mp3' },
            { id: 2, title: 'Sunset Clouds', duration: '10 min', audioFile: 'meditation2.mp3' },
            { id: 3, title: 'Storm Watch', duration: '15 min', audioFile: 'meditation3.mp3' }
        ]);
        this.currentSession = this.meditationSessions.getItem(0);
        this.timer = null;
        this.initializeSession();
    }

    initializeSession() {
        this.set('formattedTime', this.formatTime(this.currentTime));
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    async onPlayPause() {
        this.isPlaying = !this.isPlaying;
        this.notifyPropertyChange('isPlaying', this.isPlaying);

        if (this.isPlaying) {
            await MeditationService.playMeditation(this.currentSession.audioFile);
            this.startTimer();
        } else {
            await MeditationService.pauseMeditation();
            this.stopTimer();
        }
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.currentTime++;
            this.set('formattedTime', this.formatTime(this.currentTime));
        }, 1000);
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    async onRestart() {
        this.currentTime = 0;
        this.set('formattedTime', this.formatTime(this.currentTime));
        await MeditationService.restartMeditation();
    }

    async onNext() {
        const currentIndex = this.meditationSessions.indexOf(this.currentSession);
        const nextIndex = (currentIndex + 1) % this.meditationSessions.length;
        this.currentSession = this.meditationSessions.getItem(nextIndex);
        this.notifyPropertyChange('currentSession', this.currentSession);
        
        if (this.isPlaying) {
            await MeditationService.playMeditation(this.currentSession.audioFile);
        }
    }

    async onSessionSelect(args) {
        const selectedSession = this.meditationSessions.getItem(args.index);
        this.currentSession = selectedSession;
        this.notifyPropertyChange('currentSession', this.currentSession);
        
        if (this.isPlaying) {
            await MeditationService.playMeditation(this.currentSession.audioFile);
        }
    }

    async onBackgroundSounds() {
        await AudioService.playSound('background');
    }

    async onNatureSounds() {
        await AudioService.playSound('nature');
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

    onProfileTab() {
        NavigationService.navigate('components/profile/profile-view');
    }

    onUnloaded() {
        this.stopTimer();
        MeditationService.dispose();
    }
}