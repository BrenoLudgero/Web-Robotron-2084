export {Actor};

class Actor {
    constructor(game, originalWidth, originalHeight) {
        this.game = game;
        this.currentState = "alive";
        game.spriteMngr.setActorSprites(this);
        game.spriteMngr.setProjectileSprite(this);
        this.spritesheetX = 0;
        this.spritesheetY = 0;
        this.setScaledDimensions(originalWidth, originalHeight);
        this.setMovementBoundaries(game);
        this.hitboxes = {};
        // Used for hiding hitboxes
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
    }
    draw(context) {
        context.drawImage(
            this.sprites, 
            this.spritesheetX, 
            this.spritesheetY, 
            this.originalWidth, 
            this.originalHeight, 
            this.screenX, 
            this.screenY, 
            this.originalWidth * 1.5, // Using this.width causes sprite distortion
            this.originalHeight * 1.5
        );
        this.game.debuggerr.drawHitboxes(this, context);
    }
    updateState(state) {
        this.currentState = state;
    }
    // Initializes width and height with scaled dimensions
    setScaledDimensions(originalWidth, originalHeight) {
        const scaleFactor = 1.5;
        this.originalWidth = originalWidth;
        this.originalHeight = originalHeight;
        const aspectRatio = originalWidth / originalHeight;
        const newWidth = Math.round(originalWidth * scaleFactor);
        const newHeight = Math.round(newWidth / aspectRatio);
        this.width = newWidth;
        this.height = newHeight;
    }
    setMovementBoundaries(game) {
        const {ui} = game;
        this.movementBoundaries = {
            "x": ui.canvas.width - this.width,
            "y": ui.canvas.height - this.height
        };
    }
    animate(actor, direction) {
        const {spriteMngr, hitboxMngr} = this.game;
        const config = actor.hitboxConfig[direction];
        spriteMngr.cycleSprite(this, config.spritesheetY);
        Object.keys(config).forEach(limb => {
            if (limb !== "spritesheetY") {
                hitboxMngr.updateHitboxes(actor, limb, config[limb]);
            }
        });
    }
    touchingCeiling() {
        return this.screenY <= 2;
    }
    touchingFloor() {
        return this.screenY >= this.movementBoundaries.y;
    }
    touchingLeftWall() {
        return this.screenX <= 2;
    }
    touchingRightWall() {
        return this.screenX >= this.movementBoundaries.x;
    }
    stayWithinCanvas() {
        const ceilingY = 2;
        const leftWallX = 2;
        if (this.touchingCeiling()) {
            this.screenY = ceilingY;
        } 
        else if (this.touchingFloor()) {
            this.screenY = this.movementBoundaries.y;
        }
        if (this.touchingLeftWall()) {
            this.screenX = leftWallX;
        } 
        else if (this.touchingRightWall()) {
            this.screenX = this.movementBoundaries.x;
        }
    }
    canShoot() {
        return this.projectileTimer <= 0;
    }
    updateProjectileTimer() {
        if (this.projectileTimer > 0) {
            this.projectileTimer --;
        }
    }
}
