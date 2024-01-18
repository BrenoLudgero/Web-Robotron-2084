export {Input};

class Input {
    constructor(game) { // REMOVE GAME WITH DEBUGGER
        this.keysPressed = [];
        this.playerControls = ["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"];
        this.listenToPlayerControls(game);
    }
    unstoredPlayerKey(key) {
        return this.playerControls.includes(key) && !this.keysPressed.includes(key);
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
        window.addEventListener("keydown", (event) => this.handleKeyDown(event, keysPressed));
        window.addEventListener("keyup", (event) => this.handleKeyUp(event, game, keysPressed));
        //window.addEventListener("mousedown", (event) => console.log("CLICK"));
        //window.addEventListener("mouseup", (event) => console.log("NO CLICK"));
    }
}
