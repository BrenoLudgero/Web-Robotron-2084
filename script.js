window.addEventListener("load", function() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 876;
    canvas.height = 720;

    var gameFrame = 0;
    var stagFrames = 3;

    const sprites = new Image();
    sprites.src = "img/sprites.png";

    const controls = ["w", "a", "s", "d"/* , "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight" */];

    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener("keydown", (e) => {
                if ((controls.includes(e.key)) && this.game.keys.indexOf(e.key) === -1) this.game.keys.push(e.key)
            });
            window.addEventListener("keyup", (e) => {
                if (this.game.keys.indexOf(e.key) > -1) this.game.keys.splice(this.game.keys.indexOf(e.key), 1)
            });
            // ADD MOUSE FIRE SUPPORT ! ! !
            /* window.addEventListener("mousedown", e => {
                console.log("CLICK")
            });
            window.addEventListener("mouseup", e => {
                console.log("NO CLICK")
            }); */
        }
    };

    class Player {
        constructor(game) {
            this.game = game;
            this.width = 14;
            this.height = 23;
            this.x = 10;
            this.y = 371;
            this.px = 424;
            this.py = 338;
            this.speed = 3.5;
            this.animateUp = function() {{if (!this.game.keys.includes("d") && !this.game.keys.includes("a") && !this.game.keys.includes("s")){this.y = 409; this.spriteCycle()}}};
            this.animateLeft = function() {{if (!this.game.keys.includes("d")){this.y = 445; this.spriteCycle()}}},
            this.animateDown = function() {{if (!this.game.keys.includes("d") && !this.game.keys.includes("a") && !this.game.keys.includes("w")){this.y = 371; this.spriteCycle()}}},
            this.animateRight = function() {{if (!this.game.keys.includes("a")){this.y = 478; this.spriteCycle()}}},
            this.playableArea = function() {
                if (this.py <= 1) {this.py = 1};
                if (this.py >= 692) {this.py = 692};
                if (this.px <= 0) {this.px = 0};
                if (this.px >= 858) {this.px = 858}
            };
            this.spriteCycle = function() {
                if(gameFrame % stagFrames == 0) {
                    if (this.x < 88) {this.x+=26}
                    else this.x = 10
                }
            };
        };
        update() {
            if (this.game.keys.includes("w")) this.py -= this.speed, this.animateUp();
            if (this.game.keys.includes("a")) this.px -= this.speed, this.animateLeft();
            if (this.game.keys.includes("s")) this.py += this.speed, this.animateDown();
            if (this.game.keys.includes("d")) this.px += this.speed, this.animateRight();
            this.playableArea()
        };
        draw(context) {
            context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px, this.py, this.width * 1.3, this.height * 1.3);
        }
    }

    class Game {
        constructor(height, width) {
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.keys = []
        };
        update() {
            this.player.update();
        };
        draw(context) {
            this.player.draw(context);
        }
    }

    const game = new Game(canvas.height, canvas.width);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        gameFrame++;
        requestAnimationFrame(animate);
    };

    animate();
});
