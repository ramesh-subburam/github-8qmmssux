import { TNSPlayer } from 'nativescript-audio';

export class AudioService {
    static player = new TNSPlayer();

    static async playSound(soundType) {
        try {
            const soundFile = `~/assets/sounds/${soundType}.mp3`;
            await this.player.playFromFile({
                audioFile: soundFile,
                loop: false
            });
        } catch (error) {
            console.error(`Error playing ${soundType} sound:`, error);
        }
    }

    static dispose() {
        if (this.player) {
            this.player.dispose();
        }
    }
}