export { Debugger };

// TEMPORARY
class Debugger {
    constructor() {
        this.shouldDrawHitboxes = false;
        this.actorInvincibility = false;
        this.shouldUpdateActors = true;
    }

    processDebugKeys(key) {
        switch (key) {
            case "h":
                this.toggleHitboxes();
                break;
            case "i":
                this.toggleInvincibility();
                break;
            case "u":
                this.toggleActorUpdates();
                break;
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

    // Not 100% accurate due to rect() limitations
    drawHitboxes(actor, context) {
        if (this.shouldDrawHitboxes) {
            context.beginPath();
            if (actor.angle !== undefined) {
                // Projectiles only
                const halfWidth = actor.width / 2;
                const halfHeight = actor.height / 2;
                const centerX = actor.screenX + halfWidth;
                const centerY = actor.screenY + halfHeight;
                context.translate(centerX, centerY);
                context.rotate(actor.angle);
                context.rect(
                    -halfWidth,
                    -halfHeight,
                    actor.width,
                    actor.height
                );
            } else {
                for (const limb in actor.hitboxes) {
                    const hitbox = actor.hitboxes[limb];
                    context.rect(
                        actor.screenX + hitbox.xPosition,
                        actor.screenY + hitbox.yPosition,
                        hitbox.width,
                        hitbox.height
                    );
                }
            }
            context.strokeStyle = "yellow";
            context.stroke();
            context.setTransform(1, 0, 0, 1, 0, 0); // Resets the context transformation
        }
    }

    logActorCount(game) {
        console.log("Humans: " + game.actorMngr.actors.humans.size);
        console.log("Enemies: " + game.actorMngr.actors.enemies.size);
    }
}
