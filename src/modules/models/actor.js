export {Actor};

class Actor {
    constructor(game, originalWidth, originalHeight) {
        this.game = game;
        this.alive = true;
        this.sprites = new Image(); // src defined in each actor
        this.spritesheetX = 0;
        this.spritesheetY = 0;
        this.setScaledDimensions(originalWidth, originalHeight);
        this.setMovementBoundaries(game);
        // Used in collisionMngr.getHitbox
        this.hitboxWidth = this.width;
        this.hitboxHeight = this.height;
        this.hitboxXOffset = 0;
        this.hitboxYOffset = 0;
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
        if (this.touchingCeiling()) {
            this.screenY = 2;
        } 
        else if (this.touchingFloor()) {
            this.screenY = this.movementBoundaries.y;
        }
        if (this.touchingLeftWall()) {
            this.screenX = 2;
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
