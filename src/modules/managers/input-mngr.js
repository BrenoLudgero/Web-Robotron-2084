export {InputManager};

class InputManager {
    constructor(game) { // REMOVE ALL GAME WITH DEBUGGER
        this.keysPressed = [];
        this.playerControls = ["w", "a", "s", "d", "arrowup", "arrowleft", "arrowdown", "arrowright"];
        this.listenToPlayerControls(game);
    }
    update(actorMngr) {
        this.processMovementKeys(actorMngr.player);
        this.processShootingKeys(actorMngr.player);
    }
    pressing(key) {
        return this.keysPressed.includes(key);
    }
    pressingCombination(keys) {
        return keys.every(key => this.pressing(key));
    }
    unstoredPlayerKey(key) {
        return this.playerControls.includes(key) && !this.pressing(key);
    }
    // Stores one instance of each pressed playerControls key in keysPressed
    handleKeyDown(event, keysPressed) {
        const key = event.key.toLowerCase();
        if (this.unstoredPlayerKey(key)) {
            keysPressed.push(key);
        }
    }
    keyUnpressed(keyIndex) {
        return keyIndex > -1;
    }
    // Removes the key from keysPressed when unpressed
    handleKeyUp(event, game, keysPressed) {
        const key = event.key.toLowerCase();
        const keyIndex = keysPressed.indexOf(key);
        if (this.keyUnpressed(keyIndex)) {
            keysPressed.splice(keyIndex, 1);
        }
        game.debuggerr.processDebugKeys(key);
    }
    listenToPlayerControls(game) {
        const {keysPressed} = this;
        window.addEventListener("keydown", (e) => this.handleKeyDown(e, keysPressed));
        window.addEventListener("keyup", (e) => this.handleKeyUp(e, game, keysPressed));
        //window.addEventListener("mousedown", (e) => console.log("CLICK"));
        //window.addEventListener("mouseup", (e) => console.log("NO CLICK"));
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
