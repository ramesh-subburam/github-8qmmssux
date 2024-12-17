import { TNSPlayer } from 'nativescript-audio';

export class MeditationService {
    static player = new TNSPlayer();
    static isInitialized = false;

    static async playMeditation(audioFile) {
        try {
            if (!this.isInitialized) {
                await this.initializePlayer(audioFile);
            }
            await this.player.play();
        } catch (error) {
            console.error('Error playing meditation:', error);
        }
    }

    static async initializePlayer(audioFile) {
        try {
            const audioPath = `~/assets/meditations/${audioFile}`;
            await this.player.initFromFile({
                audioFile: audioPath,
                loop: true
            });
            this.isInitialized = true;
        } catch (error) {
            console.error('Error initializing player:', error);
        }
    }

    static async pauseMeditation() {
        try {
            await this.player.pause();
        } catch (error) {
            console.error('Error pausing meditation:', error);
        }
    }

    static async restartMeditation() {
        try {
            await this.player.seekTo(0);
            await this.playMeditation();
        } catch (error) {
            console.error('Error restarting meditation:', error);
        }
    }

    static dispose() {
        if (this.player) {
            this.player.dispose();
            this.isInitialized = false;
        }
    }
}