export {Actor};

class Actor {
    constructor(game, originalWidth, originalHeight) {
        this.game = game;
        this.isAlive = true;
        this.sprites = new Image();
        this.spritesheetX = 0;
        this.spritesheetY = 0;
        this.width;
        this.height;
        this.setScaledDimentions(originalWidth, originalHeight, 1.5)
        this.remainingWalkingDistance = this.walkDistance
    };
    draw(context) {
        this.setMovementBoundaries();
        context.drawImage(
            this.sprites, 
            this.spritesheetX, 
            this.spritesheetY, 
            this.originalWidth, 
            this.originalHeight, 
            this.screenX, 
            this.screenY, 
            this.width, 
            this.height
        );
        this.game.debuggerr.drawHitboxes(this, context)
    };
    // Scales the sprite size to the scale factor
    setScaledDimentions(originalWidth, originalHeight, scaleFactor) {
        this.originalWidth = originalWidth;
        this.originalHeight = originalHeight;
        const aspectRatio = originalWidth / originalHeight;
        const newWidth = Math.round(originalWidth * scaleFactor);
        const newHeight = Math.round(newWidth / aspectRatio);
        this.width = Math.round(originalWidth * scaleFactor);
        this.height = newHeight
    };
    setMovementBoundaries() {
        const movementBoundaries = {
            "x": this.game.canvas.width - this.width,
            "y": this.game.canvas.height - this.height
        }
        if (this.screenY <= 2) {
            this.screenY = 2
        } else if (this.screenY >= movementBoundaries["y"]) {
            this.screenY = movementBoundaries["y"]
        };
        if (this.screenX <= 2) {
            this.screenX = 2
        } else if (this.screenX >= movementBoundaries["x"]) {
            this.screenX = movementBoundaries["x"]
        };
        return movementBoundaries
    }
}
