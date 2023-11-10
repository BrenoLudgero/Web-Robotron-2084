export {Debugger};

class Debugger {
    constructor(game) {
        this.game = game;
        this.shouldDrawHitboxes = false;
        this.actorInvincibility = false;
        this.shouldUpdateActors = true
    };
    readDebugKeys(event) {
        switch (event.key) {
            case "h":
                this.toggleHitboxes(); break
            case "i":
                this.toggleInvincibility(); break
            case "u":
                this.toggleActorUpdates(); break
        }
    };
    toggleHitboxes() {
        this.shouldDrawHitboxes = !this.shouldDrawHitboxes;
        console.log("DRAW HITBOXES: " + this.shouldDrawHitboxes)
    };
    toggleInvincibility() {
        this.actorInvincibility = !this.actorInvincibility;
        console.log("INVINCIBILITY: " + this.actorInvincibility)
    };
    toggleActorUpdates() {
        this.shouldUpdateActors = !this.shouldUpdateActors;
        console.log("UPDATING ACTORS: " + this.shouldUpdateActors)
    };
    drawHitboxes(actor, context) {
        if (this.shouldDrawHitboxes) {
            context.beginPath();
            if (actor.rotation !== undefined) { // Projectiles only
                const halfWidth = actor.width / 2;
                const halfHeight = actor.height / 2;
                const centerX = actor.screenX + halfWidth;
                const centerY = actor.screenY + halfHeight;
                context.translate(centerX, centerY);
                context.rotate(actor.rotation);
                context.rect(-halfWidth, -halfHeight, actor.width, actor.height)
            } else {
                context.rect(actor.screenX, actor.screenY, actor.width, actor.height)
            };
            context.strokeStyle = "red";
            context.stroke();
            context.setTransform(1, 0, 0, 1, 0, 0) // Resets the context transformation
        }
    };
    logActorCount() {
        console.log("Humans: " + this.game.humans.length);
        console.log("Enemies: " + this.game.enemies.length);
        console.log("")
    }
}