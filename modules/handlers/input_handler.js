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
        const playerWidth = player.width * 1.8;
        const playerHeight = player.height * 1.8;
        if (keysPressed.includes("ArrowUp") && !keysPressed.includes("ArrowLeft") && !keysPressed.includes("ArrowRight")) {
            player.shoot(player.screenXPosition + ((playerWidth / 2) - 1), player.screenYPosition + 13, false, false, true, false)
        } else if (keysPressed.includes("ArrowUp") && keysPressed.includes("ArrowLeft")) {
            player.shoot(player.screenXPosition + 14, player.screenYPosition + 14, true, false, true, false)
        } else if (keysPressed.includes("ArrowUp") && keysPressed.includes("ArrowRight")) {
            player.shoot(player.screenXPosition + 10, player.screenYPosition + 14, false, true, true, false)
        };
        if (keysPressed.includes("ArrowDown") && !keysPressed.includes("ArrowLeft") && !keysPressed.includes("ArrowRight")) {
            player.shoot(player.screenXPosition + ((playerWidth / 2) - 1), player.screenYPosition + 28, false, false, false, true)
        } else if (keysPressed.includes("ArrowDown") && keysPressed.includes("ArrowRight")) {
            player.shoot(player.screenXPosition + 10, player.screenYPosition + playerWidth, false, true, false, true)
        } else if (keysPressed.includes("ArrowDown") && keysPressed.includes("ArrowLeft")) {
            player.shoot(player.screenXPosition + 14, player.screenYPosition + playerWidth, true, false, false, true)
        };
        if (keysPressed.includes("ArrowLeft") && !keysPressed.includes("ArrowDown")  && !keysPressed.includes("ArrowUp")) {
            player.shoot(player.screenXPosition + 14, player.screenYPosition + (playerHeight / 2), true, false, false, false)
        } else if (keysPressed.includes("ArrowRight") && !keysPressed.includes("ArrowDown")  && !keysPressed.includes("ArrowUp")) {
            player.shoot(player.screenXPosition + 11, player.screenYPosition + (playerHeight / 2), false, true, false, false)
        }
    };
    toggleHitboxes() {
        this.game.shouldDrawHitboxes = !this.game.shouldDrawHitboxes
    };
    toggleInvincibility() {  //  !  !  !  !  !
        const {game} = this;
        game.actorInvincibility = !game.actorInvincibility;
        console.log("INVINCIBILITY: " + game.actorInvincibility)
    }
}
