window.addEventListener("load", function() {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 876;
    canvas.height = 720;

    var gameFrame = 0;
    var stagFrames = 4;

    const sprites = new Image();
    sprites.src = "img/sprites.png"; // Ripped by Sean Riddle

    const controls = ["w", "a", "s", "d", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"];



    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener("keydown", (e) => {
                if (controls.includes(e.key) && this.game.keys.indexOf(e.key) === -1)
                    this.game.keys.push(e.key)
            });
            window.addEventListener("keyup", (e) => {
                if (this.game.keys.indexOf(e.key) > -1)
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1)
            })
            // ADD MOUSE FIRE SUPPORT ! ! !
            /* window.addEventListener("mousedown", e => {
                console.log("CLICK")
            });
            window.addEventListener("mouseup", e => {
                console.log("NO CLICK")
            }); */
        };

        update() {
            if (this.game.keys.includes("w")) game.player.move(false, true);
            if (this.game.keys.includes("a")) game.player.move(true, false);
            if (this.game.keys.includes("s")) game.player.move(false, false);
            if (this.game.keys.includes("d")) game.player.move(true, true);

            if (this.game.keys.includes("ArrowUp") && !this.game.keys.includes("ArrowLeft") && !this.game.keys.includes("ArrowRight"))
                game.player.shoot(game.player.px + 8, game.player.py - 15, false, true, false, -10)
            ;
            else if (this.game.keys.includes("ArrowUp") && this.game.keys.includes("ArrowLeft"))
                game.player.shoot(game.player.px + 4, game.player.py, true, true, true, -10)
            ;
            else if (this.game.keys.includes("ArrowLeft") && !this.game.keys.includes("ArrowDown")  && !this.game.keys.includes("ArrowUp"))
                game.player.shoot(game.player.px - 16, game.player.py + 15, true, false, false, -10)
            ;
            else if (this.game.keys.includes("ArrowLeft") && this.game.keys.includes("ArrowDown"))
                game.player.shoot(game.player.px + 4, game.player.py + game.player.height, false, false, true, 10)
            ;
            else if (this.game.keys.includes("ArrowDown") && !this.game.keys.includes("ArrowLeft") && !this.game.keys.includes("ArrowRight"))
                game.player.shoot(game.player.px + 8, game.player.py + 22, false, true, false, 10)
            ;
            else if (this.game.keys.includes("ArrowDown") && this.game.keys.includes("ArrowRight"))
                game.player.shoot(game.player.px + 12, game.player.py + game.player.height, true, true, true, 10)
            ;
            else if (this.game.keys.includes("ArrowRight") && !this.game.keys.includes("ArrowDown")  && !this.game.keys.includes("ArrowUp"))
                game.player.shoot(game.player.px + game.player.width - 2, game.player.py + 15, true, false, false, 10)
            ;
            else if (this.game.keys.includes("ArrowRight") && this.game.keys.includes("ArrowUp"))
                game.player.shoot(game.player.px + 12, game.player.py, false, false, true, -10)
        }
    };



    class Projectile {
        constructor(game, px, py, dx, dy, diag, speed) {
            this.game = game;
            this.width = 22;
            this.height = 2;
            this.x = 0;
            this.y = 510;
            this.px = px;
            this.py = py;
            this.dx = dx;
            this.dy = dy;
            this.diag = diag;
            this.speed = speed;
            this.delete = false
        };

        update() {
            if (this.dx)
                this.px += this.speed
            ;
            if (this.dy)
                this.py += this.speed
            ;
            if (!this.dx && !this.dy)
                this.px -= this.speed, this.py += this.speed
            ;
            if (this.px > canvas.width || this.px < 0 || this.py > canvas.height || this.py < 0)
                this.delete = true
        };
        draw(context) {
            if (this.diag)
                context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px, this.py, 4, 4)
            ;
            else if (this.dx && !this.dy)
                context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px, this.py, this.width, this.height)
            ;
            else if (this.dy && !this.dx || this.dx && this.dy || !this.dx && !this.dy) 
                context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px, this.py, this.height, this.width)
        }
    };



    class Player {
        constructor(game) {
            this.game = game;
            this.width = 14;
            this.height = 24;
            this.x = 10;
            this.y = 371;
            this.px = canvas.width /2 - this.width;
            this.py = canvas.height /2 - this.height;
            this.speed = 3.5;
            this.projectiles = [];
            this.projectileTimer = 0;
            this.projectileDelay = 10
            ;
            this.move = function(dx, dy) {
                if (dx && dy)
                    this.px += this.speed,
                    this.spriteCycle(),
                    this.y = 478
                ;
                if (dx && !dy)
                    this.px -= this.speed,
                    this.spriteCycle(),
                    this.y = 445
                ;
                if (!dx && dy)
                    this.py -= this.speed;
                    if (!this.game.keys.includes("d") && !this.game.keys.includes("a") && !this.game.keys.includes("s"))
                        this.spriteCycle(),
                        this.y = 409
                ;
                if (!dx && !dy)
                    this.py += this.speed;
                    if (!this.game.keys.includes("d") && !this.game.keys.includes("a") && !this.game.keys.includes("w"))
                        this.spriteCycle(),
                        this.y = 371
            };
            this.shoot = function(px, py, dx, dy, diag, speed) {
                if (this.projectileTimer <= 0)
                    this.projectiles.push(new Projectile(this.game, px, py, dx, dy, diag, speed)), 
                    this.projectileTimer = this.projectileDelay
            };
            this.spriteCycle = function () {
                if (gameFrame % stagFrames == 0)
                    if (this.x < 88)
                        this.x += 26
                    else this.x = 10
            };
            this.playableArea = function() {
                if (this.py <= 1)
                    this.py = 1
                ;
                if (this.py >= 692)
                    this.py = 692
                ;
                if (this.px <= 0)
                    this.px = 0
                ;
                if (this.px >= 858)
                    this.px = 858
            }
        };

        update() {
            game.input.update();
            this.projectiles.forEach(projectile => projectile.update());
            this.projectiles = this.projectiles.filter(projectile => !projectile.delete);
            this.projectileTimer--;
            this.playableArea()
        };

        draw(context) {
            context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px, this.py, this.width * 1.3, this.height * 1.3);
            this.projectiles.forEach(projectile => projectile.draw(context))
        }
    };



    class Game {
        constructor(width, height) {
            this.keys = []
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.projectile = new Projectile(this);
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
