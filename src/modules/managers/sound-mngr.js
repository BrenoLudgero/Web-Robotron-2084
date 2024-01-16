export {SoundManager};
import {soundFxIndex} from "../helpers/indexes.js";

// Plays one sound at a time depending on its priority
// Priority levels range from 1 (lowest) to 6 (highest)
class SoundManager {
    constructor() {
        this.currentSound = {
            sound: null,
            priority: 0
        };
        this.timeout = null;
        this.soundFxIndex = soundFxIndex;
    }
    shouldPlayNow(priority, currentSound) {
        return (
            priority >= currentSound.priority
            || priority > 4
        );
    }
    stopCurrentSound(currentSound) {
        if (currentSound.sound) {
            currentSound.sound.muted = true;
            currentSound.sound = null;
        }
    }
    createNewSound(sound, priority, currentSound) {
        const newSound = new Audio(sound);
        currentSound.sound = newSound;
        currentSound.priority = priority;
    }
    playNewSound(currentSound) {
        currentSound.sound.play();
    }
    playExclusively(minimumDuration) {
        if (minimumDuration) {
            this.timeout = setTimeout(() => {
                this.timeout = null;
            }, minimumDuration * 1000);
        }
    }
    // Plays a high priority sound (5 or 6) immediately
    // Or a sound of current / lower priority if there's no ongoing timeout
    playSound(sound, priority, minimumDuration) {
        const {currentSound, timeout, soundFxIndex} = this;
        if (this.shouldPlayNow(priority, currentSound)) {
            clearTimeout(timeout);
        }  
        else if (timeout !== null) {
            return;
        }
        this.stopCurrentSound(currentSound);
        this.createNewSound(soundFxIndex[sound], priority, currentSound);
        this.playNewSound(currentSound);
        this.playExclusively(minimumDuration);
    }
}
