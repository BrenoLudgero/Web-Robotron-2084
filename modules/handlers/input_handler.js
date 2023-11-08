export {InputHandler};

class InputHandler {
    constructor(game) {
        this.game = game;
        this.playerControls = ["w", "a", "s", "d", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"];
        window.addEventListener("keydown", (e) => {
            this.handleKeyDown(e)
        });
        window.addEventListener("keyup", (e) => {
            this.handleKeyUp(e)
        })/*;
        window.addEventListener("mousedown", e => {
            console.log("CLICK")
        });
        window.addEventListener("mouseup", e => {
            console.log("NO CLICK")
        }) */
    };
    update() {
        const {keysPressed, player} = this.game;
        this.readMovementKeys(keysPressed, player);
        this.readShootingKeys(keysPressed, player)
    };
    handleKeyDown(event) {
        const {keysPressed} = this.game;
        if (this.playerControls.includes(event.key) && !keysPressed.includes(event.key)) {
            keysPressed.push(event.key)
        }
    };
    handleKeyUp(event) {
        const {keysPressed, debuggerr} = this.game;
        const keyIndex = keysPressed.indexOf(event.key);
        if (keyIndex > -1) {
            keysPressed.splice(keyIndex, 1)
        }
        debuggerr.readDebugKeys(event)
    };
    readMovementKeys(keysPressed, player) { //    (left,  right,  up,  down)
        if (keysPressed.includes("w")) player.move(false, false, true, false, keysPressed);
        if (keysPressed.includes("s")) player.move(false, false, false, true, keysPressed);
        if (keysPressed.includes("d")) player.move(false, true, false, false);
        if (keysPressed.includes("a")) player.move(true, false, false, false)
    };
    readShootingKeys(keysPressed, player) {
        if (this.pressingUpOnly(keysPressed)) {
            player.shoot(false, false, true, false, 0)
            //           (left, right,  up,  down, yDrawOffset)
        } else if (this.pressingUpAndLeft(keysPressed)) {
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
    }
}
