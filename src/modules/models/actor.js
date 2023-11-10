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
        this.remainingWalkingDistance = this.walkDistance;
        this.currentDirection = this.setRandomDirection();
        this.projectiles = []
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
        this.projectiles.forEach(projectile => projectile.draw(context));
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
        const {canvas} = this.game;
        const movementBoundaries = {
            "x": canvas.width - this.width,
            "y": canvas.height - this.height
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
    };
    isActorAgainstWall() {
        const movementBoundaries = this.setMovementBoundaries();
        if (this.screenX >= movementBoundaries["x"] 
            || this.screenX <= 2 
            || this.screenY >= movementBoundaries["y"] 
            || this.screenY <= 2) {
                return true
        };
        return false
    };
    moveAwayFromWall() {
        if (this.isActorAgainstWall()) {
            this.currentDirection = this.setRandomDirection()
        }
    };
    setRandomDirection() {
        const fourDirections = ["left", "right", "up", "down"];
        const eightDirections = ["left", "right", "up", "down", "upleft", "upright", "downleft", "downright"];
        if (this.movementType == 1) {
            return fourDirections[Math.floor(Math.random() * fourDirections.length)]
        };
        return eightDirections[Math.floor(Math.random() * eightDirections.length)]
    };
    setRandomWalkDistance() {
        const distances = [16, 18, 20, 22, 25, 30, 35, 40];
        return distances[Math.floor(Math.random() * distances.length)]
    };
    // Moves to a random direction for a random distance
    moveToRandomDirection() {
        const {movementSpeed} = this;
        if (this.remainingWalkingDistance > 0) {
            switch(this.currentDirection) {
                case("left"):
                    this.screenX -= movementSpeed; break
                case("right"):
                    this.screenX += movementSpeed; break
                case("up"):
                    this.screenY -= movementSpeed; break
                case("down"):
                    this.screenY += movementSpeed; break
                case("upleft"):
                    this.screenY -= movementSpeed;
                    this.screenX -= movementSpeed; break
                case("upright"):
                    this.screenY -= movementSpeed;
                    this.screenX += movementSpeed; break
                case("downleft"):
                    this.screenY += movementSpeed;
                    this.screenX -= movementSpeed; break
                case("downright"):
                    this.screenY += movementSpeed;
                    this.screenX += movementSpeed; break
            }
            this.remainingWalkingDistance--
        } else {
            this.currentDirection = this.setRandomDirection();
            this.remainingWalkingDistance = this.setRandomWalkDistance();
        }
    };
    moveRandomly() {
        this.moveToRandomDirection();
        this.moveAwayFromWall()
    }
}
