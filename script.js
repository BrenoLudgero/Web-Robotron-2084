window.addEventListener("load", function() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 876;
    canvas.height = 720;

    var gameFrame = 0;
    var stagFrames = 3;

    const sprites = new Image();
    sprites.src = "img/sprites.png";

    const controls = ["w", "a", "s", "d", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"];

    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener("keydown", (e) => {
                if (controls.includes(e.key) && this.game.keys.indexOf(e.key) === -1) this.game.keys.push(e.key)
            });
            window.addEventListener("keyup", (e) => {
                if (this.game.keys.indexOf(e.key) > -1) this.game.keys.splice(this.game.keys.indexOf(e.key), 1)
            })
            // ADD MOUSE FIRE SUPPORT ! ! !
            /* window.addEventListener("mousedown", e => {
                console.log("CLICK")
            });
            window.addEventListener("mouseup", e => {
                console.log("NO CLICK")
            }); */
        }
    };

    class Projectile {
        constructor(game, px, py, dx, dy, speed) {
            this.game = game;
            this.width = 22;
            this.height = 2;
            this.x = 0;
            this.y = 510;
            this.px = px;
            this.py = py;
            this.dx = dx;
            this.dy = dy;
            this.speed = speed;
            this.delete = false
        };
        update() {
            if (this.dx) this.px += this.speed;
            if (this.dy) this.py += this.speed;
            if (this.px > canvas.width || this.px < 0 || this.py > canvas.height || this.py < 0) this.delete = true
        };
        draw(context) {
            if (this.dx) context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px, this.py, this.width, this.height);
            if (this.dy) context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px, this.py, this.height, this.width)
        }
    };

    class Player {
        constructor(game) {
            this.game = game;
            this.width = 14;
            this.height = 23;
            this.x = 10;
            this.y = 371;
            this.px = canvas.width /2 - this.width;
            this.py = canvas.height /2 - this.height;
            this.speed = 3.5;
            this.projectiles = [];
            this.projectileTimer = 0;
            this.projectileDelay = 8;
            this.goUp = function() {this.py -= this.speed; if (!this.game.keys.includes("d") && !this.game.keys.includes("a") && !this.game.keys.includes("s")){this.y = 409; this.spriteCycle()}};
            this.goLeft = function() {this.px -= this.speed; if (!this.game.keys.includes("d")){this.y = 445; this.spriteCycle()}};
            this.goDown = function() {this.py += this.speed; if (!this.game.keys.includes("d") && !this.game.keys.includes("a") && !this.game.keys.includes("w")){this.y = 371; this.spriteCycle()}};
            this.goRight = function() {this.px += this.speed; if (!this.game.keys.includes("a")){this.y = 478; this.spriteCycle()}};
            this.shoot = function(px, py, dx, dy, speed) {if (this.projectileTimer <=0) {this.projectiles.push(new Projectile(this.game, px, py, dx, dy, speed)); this.projectileTimer = this.projectileDelay;}};
            this.playableArea = function() {
                if (this.py <= 1) this.py = 1;
                if (this.py >= 692) this.py = 692;
                if (this.px <= 0) this.px = 0;
                if (this.px >= 858) this.px = 858
            };
            this.spriteCycle = function() {if (gameFrame % stagFrames == 0) {if (this.x < 88) this.x+=26; else this.x = 10}}
        };
        update() {
            if (this.game.keys.includes("w")) this.goUp();
            if (this.game.keys.includes("a")) this.goLeft();
            if (this.game.keys.includes("s")) this.goDown();
            if (this.game.keys.includes("d")) this.goRight();
            if (this.game.keys.includes("ArrowUp")) this.shoot(this.px + 8, this.py - 15, false, true, -10);
            if (this.game.keys.includes("ArrowLeft")) this.shoot(this.px - this.width, this.py + 15, true, false, -10);
            if (this.game.keys.includes("ArrowDown")) this.shoot(this.px + 8, this.py + 22, false, true, 10);
            if (this.game.keys.includes("ArrowRight")) this.shoot(this.px + this.width - 4, this.py + 15, true, false, 10);
            this.projectiles.forEach(projectile => {projectile.update()});
            this.projectiles = this.projectiles.filter(projectile => !projectile.delete);
            this.playableArea();
            this.projectileTimer--
        };
        draw(context) {
            context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px, this.py, this.width * 1.3, this.height * 1.3);
            this.projectiles.forEach(projectile => {projectile.draw(context)})
        };
        shootRight() {
            
        }
    };

    class Enemy {
        
    };

    class Layer {
        
    };

    class Background {
        
    };

    class UI {
        
    };

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.projectile = new Projectile(this);
            this.keys = []
        };
        update() {
            this.player.update()
        };
        draw(context) {
            this.player.draw(context)
        }
    };

    const game = new Game(canvas.width, canvas.height);

    let lastTime = 0;
    
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        gameFrame ++;
        requestAnimationFrame(animate)
    };

    animate(0)
});
