export {InputManager};

class InputManager {
    constructor(game) {
        this.game = game;
        this.playerControls = ["w", "a", "s", "d", "arrowup", "arrowleft", "arrowdown", "arrowright"];
        this.setEventListeners();
    }
    update() {
        const {keysPressed, player} = this.game;
        this.processMovementKeys(keysPressed, player);
        this.processShootingKeys(keysPressed, player);
        console.log(keysPressed)
    }
    setEventListeners() {
        window.addEventListener("keydown", (e) => this.handleKeyDown(e));
        window.addEventListener("keyup", (e) => this.handleKeyUp(e));
        //window.addEventListener("mousedown", (e) => console.log("CLICK"));
        //window.addEventListener("mouseup", (e) => console.log("NO CLICK"));
    }
    // Pushes one instance of each pressed key to keysPressed
    handleKeyDown(event) {
        const key = event.key.toLowerCase();
        if (this.playerControls.includes(key) && !this.game.keysPressed.includes(key)) {
            this.game.keysPressed.push(key);
        }
    }
    // Removes the key from keysPressed
    handleKeyUp(event) {
        const key = event.key.toLowerCase();
        const keyIndex = this.game.keysPressed.indexOf(key);
        if (keyIndex > -1) {
            this.game.keysPressed.splice(keyIndex, 1);
        }
        this.game.debuggerr.processDebugKeys(key);
    }
    processMovementKeys(keysPressed, player) {
        const moveDirections = {
            "w": "moveUp",
            "s": "moveDown",
            "d": "moveRight",
            "a": "moveLeft"
        };
        Object.entries(moveDirections).forEach(([key, method]) => {
            if (keysPressed.includes(key)) {
                player[method](keysPressed);
            }
        });
    }
    processShootingKeys(keysPressed, player) {
        if (this.pressingUpOnly(keysPressed)) {
            //     shoot(left,  right,  up,  down, yDrawOffset)
            player.shoot(false, false, true, false, 0);
        } 
        else if (this.pressingUpAndLeft(keysPressed)) {
            player.shoot(true, false, true, false, 0);
        } 
        else if (this.pressingUpAndRight(keysPressed)) {
            player.shoot(false, true, true, false, 0);
        }
        if (this.pressingDownOnly(keysPressed)) {
            player.shoot(false, false, false, true, 16);
        } 
        else if (this.pressingDownAndRight(keysPressed)) {
            player.shoot(false, true, false, true, 16);
        } 
        else if (this.pressingDownAndLeft(keysPressed)) {
            player.shoot(true, false, false, true, 16);
        }
        if (this.pressingLeftOnly(keysPressed)) {
            player.shoot(true, false, false, false, 9);
        } 
        else if (this.pressingRightOnly(keysPressed)) {
            player.shoot(false, true, false, false, 9);
        }
    }
    //      Shooting methods
    pressingUpOnly(keysPressed) {
        return (
            keysPressed.includes("arrowup") 
            && !keysPressed.includes("arrowleft") 
            && !keysPressed.includes("arrowright")
        );
    }
    pressingUpAndLeft(keysPressed) {
        return (
            keysPressed.includes("arrowup") 
            && keysPressed.includes("arrowleft")
        );
    }
    pressingUpAndRight(keysPressed) {
        return (
            keysPressed.includes("arrowup") 
            && keysPressed.includes("arrowright")
        );
    }
    pressingDownOnly(keysPressed) {
        return (
            keysPressed.includes("arrowdown") 
            && !keysPressed.includes("arrowleft") 
            && !keysPressed.includes("arrowright")
        );
    }
    pressingDownAndRight(keysPressed) {
        return (
            keysPressed.includes("arrowdown") 
            && keysPressed.includes("arrowright")
        );
    }
    pressingDownAndLeft(keysPressed) {
        return (
            keysPressed.includes("arrowdown") 
            && keysPressed.includes("arrowleft")
        );
    }
    pressingLeftOnly(keysPressed) {
        return (
            keysPressed.includes("arrowleft") 
            && !keysPressed.includes("arrowdown") 
            && !keysPressed.includes("arrowup")
        );
    }
    pressingRightOnly(keysPressed) {
        return (
            keysPressed.includes("arrowright") 
            && !keysPressed.includes("arrowdown") 
            && !keysPressed.includes("arrowup")
        );
    }
    //      Movement methods
    pressingWOnly(keysPressed) {
        return (
            !keysPressed.includes("d") 
            && !keysPressed.includes("a") 
            && !keysPressed.includes("s")
        );
    }
    pressingSOnly(keysPressed) {
        return (
            !keysPressed.includes("d") 
            && !keysPressed.includes("w") 
            && !keysPressed.includes("a")
        );
    }
    notPressingD(keysPressed) {
        return (
            !keysPressed.includes("d")
        );
    }
    notPressingA(keysPressed) {
        return (
            !keysPressed.includes("a")
        );
    }
    pressingDnA(keysPressed) {
        return (
            keysPressed.includes("d")
            && keysPressed.includes("a")
        );
    }
}
