export {InputManager};

class InputManager {
    constructor(game) {
        this.game = game;
        this.playerControls = ["w", "a", "s", "d", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"];
        this.setEventListeners()
    };
    update() {
        const {keysPressed, player} = this.game;
        this.readMovementKeys(keysPressed, player);
        this.readShootingKeys(keysPressed, player)
    };
    setEventListeners() {
        window.addEventListener("keydown", (e) => this.handleKeyDown(e));
        window.addEventListener("keyup", (e) => this.handleKeyUp(e))
        //window.addEventListener("mousedown", (e) => console.log("CLICK"));
        //window.addEventListener("mouseup", (e) => console.log("NO CLICK"))
    };
    // Pushes one instance of each pressed key to keysPressed
    handleKeyDown(event) {
        if (this.playerControls.includes(event.key) && !this.game.keysPressed.includes(event.key)) {
            this.game.keysPressed.push(event.key)
        }
    };
    // Removes the key from keysPressed
    handleKeyUp(event) {
        const keyIndex = this.game.keysPressed.indexOf(event.key);
        if (keyIndex > -1) {
            this.game.keysPressed.splice(keyIndex, 1)
        }
        this.game.debuggerr.readDebugKeys(event)
    };
    readMovementKeys(keysPressed, player) {
        if (keysPressed.includes("w")) {
            player.moveUp(keysPressed)
        };
        if (keysPressed.includes("s")) {
            player.moveDown(keysPressed)
        };
        if (keysPressed.includes("d")) {
            player.moveRight()
        } else if (keysPressed.includes("a")) {
            player.moveLeft()
        }
    };
    readShootingKeys(keysPressed, player) {
        if (this.pressingUpOnly(keysPressed)) {
            //     shoot(left,  right,  up,  down, yDrawOffset)
            player.shoot(false, false, true, false, 0)
        } 
        else if (this.pressingUpAndLeft(keysPressed)) {
            player.shoot(true, false, true, false, 0)
        } 
        else if (this.pressingUpAndRight(keysPressed)) {
            player.shoot(false, true, true, false, 0)
        };
        if (this.pressingDownOnly(keysPressed)) {
            player.shoot(false, false, false, true, 16)
        } 
        else if (this.pressingDownAndRight(keysPressed)) {
            player.shoot(false, true, false, true, 16)
        } 
        else if (this.pressingDownAndLeft(keysPressed)) {
            player.shoot(true, false, false, true, 16)
        };
        if (this.pressingLeftOnly(keysPressed)) {
            player.shoot(true, false, false, false, 9)
        } 
        else if (this.pressingRightOnly(keysPressed)) {
            player.shoot(false, true, false, false, 9)
        }
    };
    pressingUpOnly(keysPressed) {
        return (
            keysPressed.includes("ArrowUp") 
            && !keysPressed.includes("ArrowLeft") 
            && !keysPressed.includes("ArrowRight")
        )
    };
    pressingUpAndLeft(keysPressed) {
        return (
            keysPressed.includes("ArrowUp") 
            && keysPressed.includes("ArrowLeft")
        )
    };
    pressingUpAndRight(keysPressed) {
        return (
            keysPressed.includes("ArrowUp") 
            && keysPressed.includes("ArrowRight")
        )
    };
    pressingDownOnly(keysPressed) {
        return (
            keysPressed.includes("ArrowDown") 
            && !keysPressed.includes("ArrowLeft") 
            && !keysPressed.includes("ArrowRight")
        )
    };
    pressingDownAndRight(keysPressed) {
        return (
            keysPressed.includes("ArrowDown") 
            && keysPressed.includes("ArrowRight")
        )
    };
    pressingDownAndLeft(keysPressed) {
        return (
            keysPressed.includes("ArrowDown") 
            && keysPressed.includes("ArrowLeft")
        )
    };
    pressingLeftOnly(keysPressed) {
        return (
            keysPressed.includes("ArrowLeft") 
            && !keysPressed.includes("ArrowDown") 
            && !keysPressed.includes("ArrowUp")
        )
    };
    pressingRightOnly(keysPressed) {
        return (
            keysPressed.includes("ArrowRight") 
            && !keysPressed.includes("ArrowDown") 
            && !keysPressed.includes("ArrowUp")
        )
    };
    pressingWOnly(keysPressed) {
        return (
            !keysPressed.includes("d") 
            && !keysPressed.includes("a") 
            && !keysPressed.includes("s")
        )
    };
    pressingSOnly(keysPressed) {
        return (
            !keysPressed.includes("d") 
            && !keysPressed.includes("w") 
            && !keysPressed.includes("a")
        )
    }
}
