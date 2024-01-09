export {InputManager};

class InputManager {
    constructor(game) {
        this.game = game;
        this.keysPressed = [];
        this.playerControls = ["w", "a", "s", "d", "arrowup", "arrowleft", "arrowdown", "arrowright"];
        this.setEventListeners();
    }
    update() {
        this.processMovementKeys(this.game.player);
        this.processShootingKeys(this.game.player);
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
        if (this.playerControls.includes(key) && !this.keysPressed.includes(key)) {
            this.keysPressed.push(key);
        }
    }
    // Removes the key from keysPressed
    handleKeyUp(event) {
        const key = event.key.toLowerCase();
        const keyIndex = this.keysPressed.indexOf(key);
        if (keyIndex > -1) {
            this.keysPressed.splice(keyIndex, 1);
        }
        this.game.debuggerr.processDebugKeys(key);
    }
    processMovementKeys(player) {
        const moveDirections = {
            "w": "moveUp",
            "s": "moveDown",
            "d": "moveRight",
            "a": "moveLeft"
        };
        Object.entries(moveDirections).forEach(([key, method]) => {
            if (this.keysPressed.includes(key)) {
                player[method]();
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
    //      Shooting methods
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
    //      Movement methods
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
