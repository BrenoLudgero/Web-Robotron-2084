export {SoundManager};

class SoundManager {
    constructor(game) {
        this.game = game;
        this.currentSound = {
            sound: null,
            priority: 0,
            duration: 0
        };
        this.timeout = null;
    }
    stopSound() {
        if (this.currentSound.sound) {
            this.currentSound.sound.muted = true;
            this.currentSound.sound = null;
        }
    }
    playNewSound(sound, priority) {
        const newSound = new Audio(sound);
        this.currentSound.sound = newSound;
        this.currentSound.priority = priority;
        this.currentSound.sound.play();
    }
    // Set a timeout so a sound can be played exclusively for a minimumDuration (seconds)
    createTimeout(minimumDuration) {
        this.timeout = setTimeout(() => {
            this.timeout = null;
        }, minimumDuration * 1000);
    }
    soundIsHighPriority(priority) {
        return (
            priority > this.currentSound.priority
            || priority >= 4
        );
    }
    playSound(sound, priority, minimumDuration = 0) {
        // Enables a high or higher priority sound to be played despite the ongoing timeout
        if (this.soundIsHighPriority(priority)) {
            clearTimeout(this.timeout);
        // Ignores a lower priority sound
        } else if (this.timeout !== null) {
            return;
        }
        this.stopSound();
        this.playNewSound(sound, priority);
        this.createTimeout(minimumDuration);
    }
}
