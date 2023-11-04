export {Actor};

class Actor {
    constructor(game) {
        this.game = game;
        this.width;
        this.adjustedWidth;
        this.height;
        this.adjustedHeight;
        this.spritesheetXPosition;
        this.spritesheetYPosition;
        this.screenXPosition;
        this.screenYPosition;
        this.movementSpeed;
        this.movementAnimationDelay;
        this.movementType; // 0: Stationary, 1: 4-way movement, 2: 8-way movement
        this.projectiles = [];
        this.projectileTimer;
        this.projectileDelay;
        this.walkDistance;
        this.remainingWalkingDistance = this.walkDistance;
        this.currentDirection = this.setRandomDirection();
        this.isAlive = true
    };
    draw(context) {
        this.setMovementBoundaries();
        context.drawImage(this.game.sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition, this.screenYPosition, this.adjustedWidth, this.adjustedHeight);
        this.projectiles.forEach(projectile => projectile.draw(context));
        this.game.drawHitboxes(this)
    };
    setMovementBoundaries() {
        const movementBoundaries = {
            "x": this.game.canvas.width - this.adjustedWidth,
            "y": this.game.canvas.height - this.adjustedHeight
        }
        if (this.screenYPosition <= 1) {
            this.screenYPosition = 1
        } else if (this.screenYPosition > movementBoundaries["y"]) {
            this.screenYPosition = movementBoundaries["y"]
        };
        if (this.screenXPosition <= 1) {
            this.screenXPosition = 1
        } else if (this.screenXPosition > movementBoundaries["x"]) {
            this.screenXPosition = movementBoundaries["x"]
        };
        return movementBoundaries
    };
    isActorAgainstWall() {
        const movementBoundaries = this.setMovementBoundaries();
        if (this.screenXPosition >= movementBoundaries["x"] ||
            this.screenXPosition <= 5 ||
            this.screenYPosition >= movementBoundaries["y"] ||
            this.screenYPosition <= 5) {
                return true
        }
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
        } else if (this.movementType == 2) {
            return eightDirections[Math.floor(Math.random() * eightDirections.length)]
        }
    };
    setRandomWalkDistance() {
        const distances = [350, 500, 650, 800];
        return distances[Math.floor(Math.random() * distances.length)]
    };
    moveToRandomDirection() {
        if (this.remainingWalkingDistance > 0) {
            switch(this.currentDirection) {
                case("left"):
                    this.screenXPosition -= this.movementSpeed; break
                case("right"):
                    this.screenXPosition += this.movementSpeed; break
                case("up"):
                    this.screenYPosition -= this.movementSpeed; break
                case("down"):
                    this.screenYPosition += this.movementSpeed; break
                case("upleft"):
                    this.screenYPosition -= this.movementSpeed;
                    this.screenXPosition -= this.movementSpeed; break
                case("upright"):
                    this.screenYPosition -= this.movementSpeed;
                    this.screenXPosition += this.movementSpeed; break
                case("downleft"):
                    this.screenYPosition += this.movementSpeed;
                    this.screenXPosition -= this.movementSpeed; break
                case("downright"):
                    this.screenYPosition += this.movementSpeed;
                    this.screenXPosition += this.movementSpeed; break
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
