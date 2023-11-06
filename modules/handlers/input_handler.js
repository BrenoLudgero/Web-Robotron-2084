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
        const {keysPressed} = this.game;
        const keyIndex = keysPressed.indexOf(event.key);
        if (keyIndex > -1) {
            keysPressed.splice(keyIndex, 1)
        };
        if (event.key == "h") {
            this.toggleHitboxes()
        };
        if (event.key == "i") {  //  !  !  !  !  !
            this.toggleInvincibility()
        }
        if (event.key == "u") {  //  !  !  !  !  !
            this.toggleActorUpdates()
        }
    };
    readMovementKeys(keysPressed, player) {
        if (keysPressed.includes("w")) {
            player.move(false, true)
        };
        if (keysPressed.includes("s")) {
            player.move(false, false)
        };
        if (keysPressed.includes("d")) {
            player.move(true, true)
        } else if (keysPressed.includes("a")) {
            player.move(true, false)
        }
    };
    readShootingKeys(keysPressed, player) {
        if (keysPressed.includes("ArrowUp") && !keysPressed.includes("ArrowLeft") && !keysPressed.includes("ArrowRight")) {
            player.shoot(false, false, true, false)  // Sets Projectile shotLeft, shotRight, shotUp, shotDown
        } else if (keysPressed.includes("ArrowUp") && keysPressed.includes("ArrowLeft")) {
            player.shoot(true, false, true, false)
        } else if (keysPressed.includes("ArrowUp") && keysPressed.includes("ArrowRight")) {
            player.shoot(false, true, true, false)
        };
        if (keysPressed.includes("ArrowDown") && !keysPressed.includes("ArrowLeft") && !keysPressed.includes("ArrowRight")) {
            player.shoot(false, false, false, true)
        } else if (keysPressed.includes("ArrowDown") && keysPressed.includes("ArrowRight")) {
            player.shoot(false, true, false, true)
        } else if (keysPressed.includes("ArrowDown") && keysPressed.includes("ArrowLeft")) {
            player.shoot(true, false, false, true)
        };
        if (keysPressed.includes("ArrowLeft") && !keysPressed.includes("ArrowDown")  && !keysPressed.includes("ArrowUp")) {
            player.shoot(true, false, false, false)
        } else if (keysPressed.includes("ArrowRight") && !keysPressed.includes("ArrowDown")  && !keysPressed.includes("ArrowUp")) {
            player.shoot(false, true, false, false)
        }
    };
    toggleHitboxes() {
        this.game.shouldDrawHitboxes = !this.game.shouldDrawHitboxes
    }
    toggleInvincibility() {  //  !  !  !  !  !
        const {game} = this;
        game.actorInvincibility = !game.actorInvincibility;
        console.log("INVINCIBILITY: " + game.actorInvincibility)
    }
    toggleActorUpdates() {  //  !  !  !  !  !
        const {game} = this;
        game.shouldUpdateActors = !game.shouldUpdateActors;
        console.log("UPDATING ACTORS: " + game.shouldUpdateActors)
    }
}
