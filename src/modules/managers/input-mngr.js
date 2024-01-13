export {InputManager};

class InputManager {
    constructor(game) { // REMOVE GAME WITH DEBUGGER
        this.keysPressed = [];
        this.playerControls = ["w", "a", "s", "d", "arrowup", "arrowleft", "arrowdown", "arrowright"];
        this.setEventListeners(game);
    }
    update(actorMngr) {
        this.processMovementKeys(actorMngr.player, this.keysPressed);
        this.processShootingKeys(actorMngr.player);
    }
    // Pushes one instance of each pressed key to keysPressed
    handleKeyDown(event, playerControls, keysPressed) {
        const key = event.key.toLowerCase();
        if (playerControls.includes(key) && !keysPressed.includes(key)) {
            keysPressed.push(key);
        }
    }
    // Removes the key from keysPressed when unpressed
    handleKeyUp(event, game, keysPressed) {
        const key = event.key.toLowerCase();
        const keyIndex = keysPressed.indexOf(key);
        if (keyIndex > -1) {
            keysPressed.splice(keyIndex, 1);
        }
        game.debuggerr.processDebugKeys(key);
    }
    setEventListeners(game) {
        const {playerControls, keysPressed} = this;
        window.addEventListener("keydown", (e) => this.handleKeyDown(e, playerControls, keysPressed));
        window.addEventListener("keyup", (e) => this.handleKeyUp(e, game, keysPressed));
        //window.addEventListener("mousedown", (e) => console.log("CLICK"));
        //window.addEventListener("mouseup", (e) => console.log("NO CLICK"));
    }
    processMovementKeys(player, keysPressed) {
        const moveDirections = {
            "w": "moveUp",
            "s": "moveDown",
            "d": "moveRight",
            "a": "moveLeft"
        };
        Object.entries(moveDirections).forEach(([key, method]) => {
            if (keysPressed.includes(key)) {
                player[method](this); // player.moveUp(this)
                player.stayWithinCanvas();
            }
        });
    }
    processShootingKeys(player) {
        if (this.pressingUpOnly()) {
            //     shoot(left,  right,  up,  down, yDrawOffset)
            player.shoot(false, false, true, false, 0);
        } 
        else if (this.pressingUpAndLeft()) {
            player.shoot(true, false, true, false, 0);
        } 
        else if (this.pressingUpAndRight()) {
            player.shoot(false, true, true, false, 0);
        }
        if (this.pressingDownOnly()) {
            player.shoot(false, false, false, true, 16);
        } 
        else if (this.pressingDownAndRight()) {
            player.shoot(false, true, false, true, 16);
        } 
        else if (this.pressingDownAndLeft()) {
            player.shoot(true, false, false, true, 16);
        }
        if (this.pressingLeftOnly()) {
            player.shoot(true, false, false, false, 9);
        } 
        else if (this.pressingRightOnly()) {
            player.shoot(false, true, false, false, 9);
        }
    }
    //   Shooting methods
    pressingUpOnly() {
        return (
            this.keysPressed.includes("arrowup") 
            && !this.keysPressed.includes("arrowleft") 
            && !this.keysPressed.includes("arrowright")
        );
    }
    pressingUpAndLeft() {
        return (
            this.keysPressed.includes("arrowup") 
            && this.keysPressed.includes("arrowleft")
        );
    }
    pressingUpAndRight() {
        return (
            this.keysPressed.includes("arrowup") 
            && this.keysPressed.includes("arrowright")
        );
    }
    pressingDownOnly() {
        return (
            this.keysPressed.includes("arrowdown") 
            && !this.keysPressed.includes("arrowleft") 
            && !this.keysPressed.includes("arrowright")
        );
    }
    pressingDownAndRight() {
        return (
            this.keysPressed.includes("arrowdown") 
            && this.keysPressed.includes("arrowright")
        );
    }
    pressingDownAndLeft() {
        return (
            this.keysPressed.includes("arrowdown") 
            && this.keysPressed.includes("arrowleft")
        );
    }
    pressingLeftOnly() {
        return (
            this.keysPressed.includes("arrowleft") 
            && !this.keysPressed.includes("arrowdown") 
            && !this.keysPressed.includes("arrowup")
        );
    }
    pressingRightOnly() {
        return (
            this.keysPressed.includes("arrowright") 
            && !this.keysPressed.includes("arrowdown") 
            && !this.keysPressed.includes("arrowup")
        );
    }
    //   Movement methods
    pressingWOnly() {
        return (
            !this.keysPressed.includes("d") 
            && !this.keysPressed.includes("a") 
            && !this.keysPressed.includes("s")
        );
    }
    pressingSOnly() {
        return (
            !this.keysPressed.includes("d") 
            && !this.keysPressed.includes("w") 
            && !this.keysPressed.includes("a")
        );
    }
    notPressingD() {
        return (
            !this.keysPressed.includes("d")
        );
    }
    notPressingA() {
        return (
            !this.keysPressed.includes("a")
        );
    }
    pressingDnA() {
        return (
            this.keysPressed.includes("d")
            && this.keysPressed.includes("a")
        );
    }
}
