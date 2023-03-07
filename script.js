
// Robotron: 2084 (Released in 1982)
// Developed by Vid Kidz (Disbanded in 1984)
// Manufactured and Published by Williams Electronics, Inc. (Now a Light & Wonder brand)
// Copyright: Williams Electronics, Inc.  /  Williams Electronics Games, Inc.  /  Midway Amusement Games, LLC  /  Lawrence DeMar & Eugene Jarvis (1978 to present)

// Reprogrammed in JavaScript by Breno Ludgero (https://www.linkedin.com/in/breno-ludgero/)
// Based on the blue label ROM revision

window.addEventListener("load", function() {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 1016;
    canvas.height = 786;

    var gameFrame = 0;

    const sprites = new Image();
    sprites.src = "img/sprites.png"; // Ripped by Sean Riddle

    const controls = ["w", "a", "s", "d", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"];

    function RNG(min, max) {
        return Math.floor(Math.random() * (max - min)) + 1;
    };



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
            }) */
        };

        update() {
            if (this.game.keys.includes("w")) {
                game.player.move(false, true)
            };
            if (this.game.keys.includes("s")) {
                game.player.move(false, false)
            };
            if (this.game.keys.includes("d")) {
                game.player.move(true, true)
            } else if (this.game.keys.includes("a")) {
                game.player.move(true, false)
            };
            if (this.game.keys.includes("ArrowUp") && !this.game.keys.includes("ArrowLeft") && !this.game.keys.includes("ArrowRight")) {
                game.player.shoot(game.player.px + game.player.adjustedWidth / 2, game.player.py + 20, false, true, false, -45)
            } else if (this.game.keys.includes("ArrowUp") && this.game.keys.includes("ArrowLeft")) {
                game.player.shoot(game.player.px + 25, game.player.py + 25, true, true, true, -45)
            } else if (this.game.keys.includes("ArrowUp") && this.game.keys.includes("ArrowRight")) {
                game.player.shoot(game.player.px - 1, game.player.py + 25, false, false, true, -45)
            };
            if (this.game.keys.includes("ArrowDown") && !this.game.keys.includes("ArrowLeft") && !this.game.keys.includes("ArrowRight")) {
                game.player.shoot(game.player.px + game.player.adjustedWidth / 2, game.player.py + 35, false, true, false, 10)
            } else if (this.game.keys.includes("ArrowDown") && this.game.keys.includes("ArrowRight")) {
                game.player.shoot(game.player.px + 20, game.player.py + 38, true, true, true, 10)
            } else if (this.game.keys.includes("ArrowDown") && this.game.keys.includes("ArrowLeft")) {
                game.player.shoot(game.player.px + 1, game.player.py + 38, false, false, true, 10)
            };
            if (this.game.keys.includes("ArrowLeft") && !this.game.keys.includes("ArrowDown")  && !this.game.keys.includes("ArrowUp")) {
                game.player.shoot(game.player.px + 20, game.player.py + game.player.adjustedHeight / 2, true, false, false, -45)
            } else if (this.game.keys.includes("ArrowRight") && !this.game.keys.includes("ArrowDown")  && !this.game.keys.includes("ArrowUp")) {
                game.player.shoot(game.player.px + 20, game.player.py + game.player.adjustedHeight / 2, true, false, false, 10)
            }
        }
    };



    class Projectile {
        constructor(game, px, py, dx, dy, diag, speed) {
            this.game = game;
            this.width = 2;
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
            if (this.px > canvas.width || this.px < 0 || this.py > canvas.height || this.py < 0) {
                this.delete = true
            };
            if (this.dx) {
                this.px += this.speed
            };
            if (this.dy) {
                this.py += this.speed
            } else if (!this.dx && !this.dy) {
                this.px -= this.speed,
                this.py += this.speed
            }
        };

        draw(context) {
            if (this.dx && !this.diag) {
                context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px, this.py, this.width, this.height);
                for (let i = 0; i < 18; i ++) {
                    context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px++, this.py, this.width, this.height)
                }
            } else if (this.dy && !this.diag) {
                context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px, this.py, this.width, this.height);
                for (let i = 0; i < 18; i ++) {
                    context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px, this.py++, this.width, this.height)
                }
            } else if (this.dx && this.diag || this.dy && this.diag) {
                context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px, this.py, this.width, this.height);
                for (let i = 0; i < 14; i ++) {
                    context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px++, this.py++, this.width, this.height)
                }
            } else if (!this.dx && this.diag || !this.dy && this.diag) {
                context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px, this.py, this.width, this.height);
                for (let i = 0; i < 14; i ++) {
                    context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px--, this.py++, this.width, this.height)
                }
            }
        }
    };



    class Player {
        constructor(game) {
            this.game = game;
            this.width = 14;
            this.adjustedWidth = 25;
            this.height = 24;
            this.adjustedHeight = 43;
            this.x = 10;
            this.y = 371;
            this.px = canvas.width /2 - this.width;
            this.py = canvas.height /2 - this.height;
            this.speed = 3.5;
            this.projectiles = [];
            this.projectileTimer = 0;
            this.projectileDelay = 12;
            this.animationDelay = 4;
            this.alive = true;

            this.move = function(dx, dy) {
                if (dx && dy) {
                    this.px += this.speed,
                    this.spriteCycle(),
                    this.y = 478
                } else if (dx && !dy) {
                    this.px -= this.speed,
                    this.spriteCycle(),
                    this.y = 445
                } else if (!dx && dy) {
                    this.py -= this.speed;
                    if (!this.game.keys.includes("d") && !this.game.keys.includes("a") && !this.game.keys.includes("s")) {
                        this.spriteCycle(),
                        this.y = 409
                    }
                } else if (!dx && !dy) {
                    this.py += this.speed;
                    if (!this.game.keys.includes("d") && !this.game.keys.includes("a") && !this.game.keys.includes("w")) {
                        this.spriteCycle(),
                        this.y = 371
                    }
                }
            };

            this.shoot = function(px, py, dx, dy, diag, speed) {
                if (this.projectileTimer <= 0) {
                    this.projectiles.push(new Projectile(this.game, px, py, dx, dy, diag, speed)), 
                    this.projectileTimer = this.projectileDelay
                }
            };

            this.spriteCycle = function () {
                if (gameFrame % this.animationDelay == 0) {
                    if (this.x < 88) {
                        this.x += 26
                    } else {
                        this.x = 10
                    }
                }
            };

            this.playableArea = function() {
                if (this.py <= 1) {
                    this.py = 1
                } else if (this.py >= 742) {
                    this.py = 742
                };
                if (this.px <= 1) {
                    this.px = 1
                } else if (this.px >= 990) {
                    this.px = 990
                }
            }
        };

        update() {
            game.input.update();
            this.projectiles.forEach(projectile => projectile.update());
            this.projectiles = this.projectiles.filter(projectile => !projectile.delete);
            this.projectileTimer --;
            this.playableArea()
        };

        draw(context) {
            context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px, this.py, this.adjustedWidth, this.adjustedHeight);
            this.projectiles.forEach(projectile => projectile.draw(context))
        }
    };



    class Enemy {
        constructor(game, width, height, x, y, px, py, speed) {
            this.game = game;
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
            this.px = px;
            this.py = py;
            this.speed = speed;
            this.delete = false;

            this.playableArea = function() {
                if (this.py <= 1) {
                    this.py = 1
                } else if (this.py >= 738) {
                    this.py = 738
                };
                if (this.px <= 1) {
                    this.px = 1
                } else if (this.px >= 982) {
                    this.px = 982
                }
            }
        };

        update() {
            
        };

        draw(context) {
            context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px, this.py, this.adjustedWidth, this.adjustedHeight)
        }
    };


    
    class Grunt extends Enemy {
        constructor(game) {
            super(game);
            this.width = 18;
            this.adjustedWidth = 32;
            this.height = 27;
            this.adjustedHeight = 48;
            this.x = 8;
            this.y = 285;
            this.px = RNG(1, 982);              // Limit Spawn Posisiton
            this.py = RNG(1, 732);              // Limit Spawn Posisiton
            this.movementTimer = 0;
            this.movementInterval = 80;
            this.movementRate = 10;
            this.speed = 6;
            this.delete = false;

            this.spriteCycle = function () {
                if (this.x < 98) {
                    this.x += 30
                } else {
                    this.x = 8
                }
            }
        };

        update() {
            let randomNumber = RNG(1, 4);
            if (this.movementTimer > this.movementInterval) {
                if (randomNumber === 1) {
                    if (this.px > game.player.px) {
                        this.px -= this.speed
                    } else {
                        this.px += this.speed
                    };
                    if (this.py > game.player.py) {
                        this.py -= this.speed
                    } else {
                        this.py += this.speed
                    };
                    this.spriteCycle()
                }
                this.movementTimer = 0
            } else {
                this.movementTimer += this.movementRate
            }
            this.playableArea()
        }
    };



    class Game {
        constructor(width, height) {
            this.keys = [];
            this.width = width;
            this.height = height;
            this.enemy = new Enemy(this);
            this.enemies = [];
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.projectile = new Projectile(this)
        };

        update() {
            if (this.player.alive) {
                this.player.update()
                this.enemies.forEach (enemy => {
                    enemy.update();
                    if (this.checkCollision(this.player, this.player.adjustedWidth, this.player.adjustedHeight, enemy, enemy.adjustedWidth, enemy.adjustedHeight)) {
                        this.player.alive = false
                    };
                    this.player.projectiles.forEach(projectile => {
                        if (this.checkCollision(projectile, 2, 2, enemy, enemy.adjustedWidth, enemy.adjustedHeight)) {
                            enemy.delete = true,
                            projectile.delete = true
                        }
                    })
                })
                this.enemies = this.enemies.filter (enemy => !enemy.delete)
            }
        };

        draw(context) {
            this.player.draw(context)
            this.enemies.forEach (enemy => {
                enemy.draw(context)
            })
        };

        addEnemy(numberEnemies, enemy) {
            for (let i = 0; i < numberEnemies; i ++) {
                this.enemies.push(new enemy(this))
            }
        };

        checkCollision(actorA, widthA, heightA, actorB, widthB, heightB) {
            return (actorA.px < actorB.px + widthB &&
                actorA.px + widthA > actorB.px &&
                actorA.py < actorB.py + heightB &&
                actorA.py + heightA > actorB.py
            )
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

    game.addEnemy(11, Grunt);
    animate(0)

});
