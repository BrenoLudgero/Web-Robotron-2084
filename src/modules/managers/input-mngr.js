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
            player.shoot("up");
        } 
        else if (this.pressingUpAndLeft()) {
            player.shoot("upleft");
        } 
        else if (this.pressingUpAndRight()) {
            player.shoot("upright");
        }
        if (this.pressingDownOnly()) {
            player.shoot("down");
        } 
        else if (this.pressingDownAndRight()) {
            player.shoot("downright");
        } 
        else if (this.pressingDownAndLeft()) {
            player.shoot("downleft");
        }
        if (this.pressingLeftOnly()) {
            player.shoot("left");
        } 
        else if (this.pressingRightOnly()) {
            player.shoot("right");
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
