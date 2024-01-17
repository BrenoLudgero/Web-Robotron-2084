export {Actor};

class Actor {
    constructor(game, originalWidth, originalHeight) {
        this.game = game; // REMOVE WITH DEBUGGER
        this.currentState = "alive";
        game.spriteMngr.setActorSprites(this);
        game.spriteMngr.setProjectileSprite(this);
        this.spritesheetX = 0;
        this.spritesheetY = 0;
        this.setScaledDimensions(originalWidth, originalHeight);
        this.setMovementBoundaries(game);
        this.limbs = {}; // Each limb has its own hitbox
        this.hitboxes = {};
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
    getActorType() {
        return this.constructor.name.toLowerCase(); // e.g. 'player'
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
    setHitbox(limb) {
        const xPosition = this.limbs[limb].xPosition;
        const yPosition = this.limbs[limb].yPosition;
        this.hitboxes[limb] = {
            width: this.limbs[limb].width,
            height: this.limbs[limb].height,
            xPosition,
            yPosition
        };
    }
    setAllHitboxes(limbs) {
        for (const limb in limbs) {
            this.setHitbox(limb);
        }
    }
    updateHitboxes(actor, limb, properties) {
        Object.keys(properties).forEach(property => {
            actor.hitboxes[limb][property] = properties[property];
        });
    }
    animate(actor, direction) {
        const config = actor.hitboxConfig[direction];
        //game.spriteMngr.cycleSprite(this, config.spriteCycle);
        Object.keys(config).forEach(limb => {
            if (limb !== "spritesheetY") {
                this.updateHitboxes(actor, limb, config[limb]);
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
