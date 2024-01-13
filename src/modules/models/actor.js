export {Actor};

class Actor {
    constructor(game, originalWidth, originalHeight) {
        this.game = game;
        this.isAlive = true;
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
    stayWithinCanvas() {
        if (this.screenY <= 2) {
            this.screenY = 2;
        } 
        else if (this.screenY >= this.movementBoundaries.y) {
            this.screenY = this.movementBoundaries.y;
        }
        if (this.screenX <= 2) {
            this.screenX = 2;
        } 
        else if (this.screenX >= this.movementBoundaries.x) {
            this.screenX = this.movementBoundaries.x;
        }
    }
    updateProjectileTimer() {
        if (this.projectileTimer > 0) {
            this.projectileTimer --;
        }
    }
}
