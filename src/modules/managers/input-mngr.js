export {InputManager};
import {Input} from "../models/input.js";

class InputManager {
    constructor(game) { // REMOVE GAME WITH DEBUGGER
        this.input = new Input(game);
    }
    update(player) {
        this.processMovementKeys(player);
        this.processShootingKeys(player);
    }
    pressing(key) {
        return this.input.keysPressed.includes(key);
    }
    pressingCombination(keys) {
        return keys.every(key => this.pressing(key));
    }
    processKeyFunction(player, key, method) {
        if (this.pressing(key)) {
            player[method](this);
            player.stayWithinCanvas(); // Causes visual glitch if in player.update
        }
    }
    processMovementKeys(player) {
        this.processKeyFunction(player, "w", "moveUp");
        this.processKeyFunction(player, "s", "moveDown");
        this.processKeyFunction(player, "d", "moveRight");
        this.processKeyFunction(player, "a", "moveLeft");
    }
    processShootingKeys(player) {
        if (this.pressingUpOnly()) {
            player.shoot("up", 0);
        } 
        else if (this.pressingUpAndLeft()) {
            player.shoot("upleft", 0);
        } 
        else if (this.pressingUpAndRight()) {
            player.shoot("upright", 0);
        }
        if (this.pressingDownOnly()) {
            player.shoot("down", 16);
        } 
        else if (this.pressingDownAndRight()) {
            player.shoot("downright", 16);
        } 
        else if (this.pressingDownAndLeft()) {
            player.shoot("downleft", 16);
        }
        if (this.pressingLeftOnly()) {
            player.shoot("left", 9);
        } 
        else if (this.pressingRightOnly()) {
            player.shoot("right", 9);
        }
    }
    //   Shooting methods
    pressingUpOnly() {
        return (
            this.pressing("arrowup") 
            && !this.pressing("arrowleft")
            && !this.pressing("arrowright")
        );
    }
    pressingUpAndLeft() {
        return (
            this.pressing("arrowup") 
            && this.pressing("arrowleft")
        );
    }
    pressingUpAndRight() {
        return (
            this.pressing("arrowup") 
            && this.pressing("arrowright")
        );
    }
    pressingDownOnly() {
        return (
            this.pressing("arrowdown") 
            && !this.pressing("arrowleft") 
            && !this.pressing("arrowright")
        );
    }
    pressingDownAndRight() {
        return (
            this.pressing("arrowdown") 
            && this.pressing("arrowright")
        );
    }
    pressingDownAndLeft() {
        return (
            this.pressing("arrowdown") 
            && this.pressing("arrowleft")
        );
    }
    pressingLeftOnly() {
        return (
            this.pressing("arrowleft") 
            && !this.pressing("arrowdown") 
            && !this.pressing("arrowup")
        );
    }
    pressingRightOnly() {
        return (
            this.pressing("arrowright") 
            && !this.pressing("arrowdown") 
            && !this.pressing("arrowup")
        );
    }
    //   Movement methods
    pressingWOnly() {
        return !this.pressing("d") 
        && !this.pressing("a") 
        && !this.pressing("s");
    }
    pressingSOnly() {
        return !this.pressing("d") 
        && !this.pressing("w") 
        && !this.pressing("a");
    }
    notPressingD() {
        return !this.pressing("d");
    }
    notPressingA() {
        return !this.pressing("a");
    }
    pressingDnA() {
        return this.pressingCombination(["d", "a"]);
    }
}
