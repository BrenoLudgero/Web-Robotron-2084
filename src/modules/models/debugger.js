export {Debugger};

// TEMPORARY
class Debugger {
    constructor(game) {
        this.game = game;
        this.shouldDrawHitboxes = false;
        this.actorInvincibility = false;
        this.shouldUpdateActors = true;
    }
    processDebugKeys(key) {
        switch (key) {
            case "h":
                this.toggleHitboxes(); break;
            case "i":
                this.toggleInvincibility(); break;
            case "u":
                this.toggleActorUpdates(); break;
        }
    }
    toggleHitboxes() {
        this.shouldDrawHitboxes = !this.shouldDrawHitboxes;
        console.log("DRAW HITBOXES: " + this.shouldDrawHitboxes);
    }
    toggleInvincibility() {
        this.actorInvincibility = !this.actorInvincibility;
        console.log("INVINCIBILITY: " + this.actorInvincibility);
    }
    toggleActorUpdates() {
        this.shouldUpdateActors = !this.shouldUpdateActors;
        console.log("UPDATING ACTORS: " + this.shouldUpdateActors);
    }
    drawHitboxes(actor, context) {
        if (this.shouldDrawHitboxes) {
            context.beginPath();
            if (actor.angle !== undefined) { // Projectiles only
                const halfWidth = actor.width / 2;
                const halfHeight = actor.height / 2;
                const centerX = actor.screenX + halfWidth;
                const centerY = actor.screenY + halfHeight;
                context.translate(centerX, centerY);
                context.rotate(actor.angle);
                context.rect(-halfWidth, -halfHeight, actor.width, actor.height);
            } else {
                // Not 100% accurate due to rect() limitations
                context.rect(
                    (actor.screenX - actor.hitboxXOffset) + (actor.width - actor.hitboxWidth) / 2,
                    (actor.screenY - actor.hitboxYOffset) + (actor.height - actor.hitboxHeight) / 2,
                    actor.hitboxWidth,
                    actor.hitboxHeight
                );
            }
            context.strokeStyle = "red";
            context.stroke();
            context.setTransform(1, 0, 0, 1, 0, 0); // Resets the context transformation
        }
    }
    logActorCount() {
        console.log("Humans: " + this.game.actorMngr.humans.size);
        console.log("Enemies: " + this.game.actorMngr.enemies.size);
    }
}
