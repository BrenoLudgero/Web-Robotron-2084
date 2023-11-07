export {Actor};

class Actor {
    constructor(game, originalWidth, originalHeight) {
        this.game = game;
        this.isAlive = true;
        this.sprites = new Image();
        this.spritesheetXPosition = 0;
        this.spritesheetYPosition = 0;
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
            this.spritesheetXPosition, 
            this.spritesheetYPosition, 
            this.originalWidth, 
            this.originalHeight, 
            this.screenXPosition, 
            this.screenYPosition, 
            this.width, 
            this.height
        );
        this.game.drawHitboxes(this);
        this.projectiles.forEach(projectile => projectile.draw(context))
    };
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
        if (this.screenYPosition <= 2) {
            this.screenYPosition = 2
        } else if (this.screenYPosition >= movementBoundaries["y"]) {
            this.screenYPosition = movementBoundaries["y"]
        };
        if (this.screenXPosition <= 2) {
            this.screenXPosition = 2
        } else if (this.screenXPosition >= movementBoundaries["x"]) {
            this.screenXPosition = movementBoundaries["x"]
        };
        return movementBoundaries
    };
    isActorAgainstWall() {
        const movementBoundaries = this.setMovementBoundaries();
        if (this.screenXPosition >= movementBoundaries["x"] 
            || this.screenXPosition <= 2 
            || this.screenYPosition >= movementBoundaries["y"] 
            || this.screenYPosition <= 2) {
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
        const distances = [60, 120, 220, 350, 600];
        return distances[Math.floor(Math.random() * distances.length)]
    };
    moveToRandomDirection() {
        const {movementSpeed} = this;
        if (this.remainingWalkingDistance > 0) {
            switch(this.currentDirection) {
                case("left"):
                    this.screenXPosition -= movementSpeed; break
                case("right"):
                    this.screenXPosition += movementSpeed; break
                case("up"):
                    this.screenYPosition -= movementSpeed; break
                case("down"):
                    this.screenYPosition += movementSpeed; break
                case("upleft"):
                    this.screenYPosition -= movementSpeed;
                    this.screenXPosition -= movementSpeed; break
                case("upright"):
                    this.screenYPosition -= movementSpeed;
                    this.screenXPosition += movementSpeed; break
                case("downleft"):
                    this.screenYPosition += movementSpeed;
                    this.screenXPosition -= movementSpeed; break
                case("downright"):
                    this.screenYPosition += movementSpeed;
                    this.screenXPosition += movementSpeed; break
            }
            this.remainingWalkingDistance -= this.movementRate
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
