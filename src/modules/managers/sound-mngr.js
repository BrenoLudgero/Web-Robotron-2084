export {SoundManager};
import {SoundEffect} from "../models/sound.js";
import {soundFxIndex} from "../helpers/indexes.js";

// Plays one sound at a time depending on its priority
// Priority levels range from 1 (lowest) to 6 (highest)
class SoundManager {
    constructor() {
        this.currentSound = new SoundEffect();
    }
    // A high priority sound (5 or 6) or a sound of current priority
    shouldPlayNow(priority) {
        return (
            priority >= this.currentSound.priority
            || priority > 4
        );
    }
    stopCurrentSound(currentSound) {
        if (currentSound.sound) {
            currentSound.sound.muted = true;
            currentSound.sound = null;
        }
    }
    createNewSound(sound, priority) {
        const newSound = new Audio(sound);
        this.currentSound.sound = newSound;
        this.currentSound.priority = priority;
    }
    userInteractedWithPage() {
        return navigator.userActivation.hasBeenActive;
    }
    playNewSound(currentSound) {
        if (this.userInteractedWithPage()) { // Avoids an error
            currentSound.sound.play();
        }
    }
    playExclusively(minimumDuration) { // Seconds
        if (minimumDuration) {
            this.currentSound.timeout = setTimeout(() => {
                this.currentSound.timeout = null;
            }, minimumDuration * 1000);
        }
    }
    playSound(sound, priority, minimumDuration) {
        const {currentSound} = this;
        if (this.shouldPlayNow(priority)) {
            clearTimeout(currentSound.timeout);
        } 
        // Ignores any sound of lower priority than the current one
        else if (currentSound.timeout !== null) {
            return;
        }
        this.stopCurrentSound(currentSound);
        this.createNewSound(soundFxIndex[sound], priority);
        this.playNewSound(currentSound);
        this.playExclusively(minimumDuration);
    }
}
