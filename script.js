// Robotron: 2084 (Released in 1982)
// Developed by Vid Kidz (Disbanded in 1984)
// Manufactured and Published by Williams Electronics, Inc. (Now a Light & Wonder brand)
// Copyrights: Williams Electronics, Inc.  /  Williams Electronics Games, Inc.  /  Midway Amusement Games, LLC  /  Lawrence DeMar & Eugene Jarvis (1978 to present)

// Reprogrammed in JavaScript by Breno Ludgero (https://www.linkedin.com/in/breno-ludgero/)
// Based on the blue label ROM revision with default game settings



/*          TO DO:
IMPLEMENT ALL ACTORS & OBSTACLES
HUMAN, ENEMY OBSTACLE INTERACTION
IMPLEMENT SCORE
SPAWN / DEATH ANIMATIONS
SPLIT INTO MULTIPLE SCRIPTS
IMPLEMENT WAVES
SOUNDS
REFINE LIMITED SPAWN, HULK SPAWNS FUTHER FROM PLAYER
CAPS LOCK MOVEMENT
ADD MOUSE FIRE SUPPORT
CROSS-BROWSER SUPPORT */



window.addEventListener("load", function() {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    canvas.width = 1016;
    canvas.height = 786;

    var gameFrame = 0;

    const sprites = new Image();
    sprites.src = "img/sprites.png"; // Ripped by Sean Riddle

    const controls = ["w", "a", "s", "d", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"];



    function RNG(min, max) {
        return Math.floor(Math.random() * (max - min)) + 1
    };

    function randomPX(min, max) {
        limitX = game.player.px - 130;
        startX = game.player.px + 130;
      
        let randomNumber = Math.floor(Math.random() * max) + 1;
      
        if (randomNumber < limitX) {
            return Math.floor(Math.random() * (limitX - min)) + 1;
        } else {
            return Math.floor(Math.random() * (max - startX)) + startX;
        }
    };

    function randomPY(min, max) {
        limitY = game.player.py - 130;
        startY = game.player.py + 130;
      
        let randomNumber = Math.floor(Math.random() * max) + 1;
      
        if (randomNumber < limitY) {
            return Math.floor(Math.random() * (limitY - min)) + 1;
        } else {
            return Math.floor(Math.random() * (max - startY)) + startY;
        }
    };



    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener("keydown", (e) => {
                if (controls.includes(e.key) && this.game.keys.indexOf(e.key) === -1) {
                    this.game.keys.push(e.key)
                }
            });

            window.addEventListener("keyup", (e) => {
                if (this.game.keys.indexOf(e.key) > -1) {
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1)
                }
            })

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
                game.player.shoot(game.player.px + game.player.adjustedWidth / 2, game.player.py - 4, false, false, true, false)
            } else if (this.game.keys.includes("ArrowUp") && this.game.keys.includes("ArrowLeft")) {
                game.player.shoot(game.player.px - 4, game.player.py - 4, true, false, true, false)
            } else if (this.game.keys.includes("ArrowUp") && this.game.keys.includes("ArrowRight")) {
                game.player.shoot(game.player.px + game.player.adjustedWidth + 4, game.player.py - 4, false, true, true, false)
            };
            if (this.game.keys.includes("ArrowDown") && !this.game.keys.includes("ArrowLeft") && !this.game.keys.includes("ArrowRight")) {
                game.player.shoot(game.player.px + game.player.adjustedWidth / 2, game.player.py + game.player.adjustedHeight, false, false, false, true)
            } else if (this.game.keys.includes("ArrowDown") && this.game.keys.includes("ArrowRight")) {
                game.player.shoot(game.player.px  + game.player.adjustedWidth + 3, game.player.py + game.player.adjustedHeight, false, true, false, true)
            } else if (this.game.keys.includes("ArrowDown") && this.game.keys.includes("ArrowLeft")) {
                game.player.shoot(game.player.px - 4, game.player.py + game.player.adjustedHeight, true, false, false, true)
            };
            if (this.game.keys.includes("ArrowLeft") && !this.game.keys.includes("ArrowDown")  && !this.game.keys.includes("ArrowUp")) {
                game.player.shoot(game.player.px - 4, game.player.py + game.player.adjustedHeight / 2, true, false, false, false)
            } else if (this.game.keys.includes("ArrowRight") && !this.game.keys.includes("ArrowDown")  && !this.game.keys.includes("ArrowUp")) {
                game.player.shoot(game.player.px + game.player.adjustedWidth + 3, game.player.py + game.player.adjustedHeight / 2, false, true, false, false)
            }
        }
    };



    class Projectile {
        constructor(game, px, py, left, right, up, down) {
            this.game = game;
            this.width = 1;
            this.height = 1;
            this.x = 0;
            this.y = 510;
            this.px = px;
            this.py = py;
            this.left = left;
            this.right = right;
            this.up = up;
            this.down = down;
            this.delete = false
        };

        update() {
            if (this.px > canvas.width + 10 || this.px < -10 || this.py > canvas.height + 10 || this.py < -10) {
                this.delete = true
            }
        };

        draw(context) {
            if (this.up && !this.left && !this.right) {
                for (let i = 0; i < 18; i ++) {
                    context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px, this.py --, this.width, this.height)
                }
            } else if (this.up && this.left) {
                for (let i = 0; i < 18; i ++) {
                    context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px --, this.py --, this.width, this.height)
                }
            } else if (this.up && this.right) {
                for (let i = 0; i < 18; i ++) {
                    context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px ++, this.py --, this.width, this.height)
                }
            } else if (this.left && !this.up && !this.down) {
                for (let i = 0; i < 18; i ++) {
                    context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px --, this.py, this.width, this.height)
                }
            } else if (this.right && !this.up && !this.down) {
                for (let i = 0; i < 18; i ++) {
                    context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px ++, this.py, this.width, this.height)
                }
            } else if (this.down && this.left) {
                for (let i = 0; i < 18; i ++) {
                    context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px --, this.py ++, this.width, this.height)
                }
            } else if (this.down && !this.left && !this.right) {
                for (let i = 0; i < 18; i ++) {
                    context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px, this.py ++, this.width, this.height)
                }
            } else if (this.down && this.right) {
                for (let i = 0; i < 18; i ++) {
                    context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px ++, this.py ++, this.width, this.height)
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
            this.animationDelay = 4;
            this.projectiles = [];
            this.projectileTimer = 0;
            this.projectileDelay = 8;
            this.alive = true;
            this.border = {
                color: "white",
                borderX: this.px + this.adjustedWidth / 2,
                borderY: this.py + this.adjustedHeight / 2,
                radius: Math.sqrt((this.x / 2.8) ** 2 + (this.y / 2.8) ** 2),
                visible: false
            };

            this.move = function(dx, dy) {
                if (dx && dy) {
                    this.spriteCycle(),
                    this.y = 478,
                    this.px += this.speed
                } else if (dx && !dy) {
                    this.spriteCycle(),
                    this.y = 445,
                    this.px -= this.speed
                } else if (!dx && dy) {
                    this.py -= this.speed;
                    if (!this.game.keys.includes("d") && !this.game.keys.includes("a") && !this.game.keys.includes("s")) {
                        this.y = 409,
                        this.spriteCycle()
                    }
                } else if (!dx && !dy) {
                    this.py += this.speed;
                    if (!this.game.keys.includes("d") && !this.game.keys.includes("a") && !this.game.keys.includes("w")) {
                        this.y = 371,
                        this.spriteCycle()
                    }
                }
            };

            this.shoot = function(px, py, left, right, up, down) {
                if (this.projectileTimer <= 0) {
                    this.projectiles.push(new Projectile(this.game, px, py, left, right, up, down)), 
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
            }
        };

        update() {
            game.input.update();
            this.projectiles.forEach(projectile => projectile.update());
            this.projectiles = this.projectiles.filter(projectile => !projectile.delete);
            this.projectileTimer --;
            game.playableArea(this, 990, 742)
        };

        draw(context) {
            context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px, this.py, this.adjustedWidth, this.adjustedHeight);
            this.projectiles.forEach(projectile => projectile.draw(context));
            game.drawBorder(this)
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
            this.alive = true
        };

        update() {
        };

        draw(context) {
            context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px, this.py, this.adjustedWidth, this.adjustedHeight);
            game.drawBorder(this)
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
            this.px = randomPX(1, 981);
            this.py = RNG(1, 737);
            this.movementTimer = 0;
            this.movementInterval = 40;
            this.movementRate = 8;
            this.speed = 6;
            this.border = {
                color: "red",
                borderX: this.px + this.adjustedWidth / 2,
                borderY: this.py + this.adjustedHeight / 2,
                radius: Math.sqrt((this.x * 2) + (this.y * 2)),
                visible: false
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
                    game.spriteCycle(this, 8, 30, 98)
                }
                this.movementTimer = 0
            } else {
                this.movementTimer += this.movementRate
            }
            game.playableArea(this, 982, 738)
        }
    };



    class Hulk extends Enemy {
        constructor(game) {
            super(game);
            this.width = 26;
            this.adjustedWidth = 47;
            this.height = 32;
            this.adjustedHeight = 57;
            this.x = 409;
            this.y = 434;
            this.px = RNG(1, 967);
            this.py = randomPY(1, 727);
            this.movementTimer = 0;
            this.movementInterval = 10;
            this.movementRate = 1;
            this.speed = 8;
            this.hulk = true;
            this.border = {
                color: "lime",
                borderX: this.px + this.adjustedWidth / 2,
                borderY: this.py + this.adjustedHeight / 2,
                radius: Math.sqrt((this.x * 1.5) + (this.y * 1.5)),
                visible: false
            }
        };

        update() {
            let randomNumber = RNG(1, 7000);                                // Temporary
            if (this.movementTimer > this.movementInterval) { 
                if (randomNumber >= 1 && randomNumber <= 1000) {
                    this.y = 398,
                    this.px -= this.speed,
                    game.spriteCycle(this, 409, 26, 487)
                } else if (randomNumber > 1001 && randomNumber <= 2000) {
                    this.y = 474,
                    this.px += this.speed,
                    game.spriteCycle(this, 409, 26, 487)
                } else if (randomNumber > 2001 && randomNumber <= 3000) {
                    this.y = 434,
                    this.py -= this.speed,
                    game.spriteCycle(this, 409, 26, 487)
                } else if (randomNumber > 3001 && randomNumber <= 4000) {
                    this.y = 434,
                    this.py += this.speed,
                    game.spriteCycle(this, 409, 26, 487)
                };
                this.movementTimer = 0
            } else {
                this.movementTimer += this.movementRate
            };
            game.playableArea(this, 968, 728)
        }
    };



    class Human {
        constructor(game) {
            this.game = game;
            this.width = this.width;
            this.adjustedWidth = this.adjustedWidth;
            this.height = this.height;
            this.adjustedHeight = this.adjustedHeight;
            this.x = this.x;
            this.y = this.y;
            this.px = this.px;
            this.py = this.py;
            this.speed = 3.5;
            this.animationDelay = 4;
            this.alive = true;
            this.human = true;
            this.rescued = false
        }

        update() {
        };

        draw(context) {
            context.drawImage(sprites, this.x, this.y, this.width, this.height, this.px, this.py, this.adjustedWidth, this.adjustedHeight);
            game.drawBorder(this)
        }
    };



    class Mommy extends Human {
        constructor(game) {
            super(game);
            this.game = game;
            this.width = 14;
            this.adjustedWidth = 25;
            this.height = 28;
            this.adjustedHeight = 50;
            this.x = 114;
            this.y = 369;
            this.px = RNG(100, 970);
            this.py = randomPY(100, 718);
            this.border = {
                color: "deepPink",
                borderX: this.px + this.adjustedWidth / 2,
                borderY: this.py + this.adjustedHeight / 2,
                radius: Math.sqrt((this.x * 2) + (this.y * 2)),
                visible: false
            }
        };

        update() {

        }
    };



    class CollisionHandler {
        constructor(game) {
            this.game = game
        };

        update() {
            game.enemies.forEach (enemy => {
                game.player.projectiles.forEach(projectile => {
                    if (this.checkCollision(projectile, projectile.width, projectile.height, enemy, enemy.adjustedWidth, enemy.adjustedHeight)) {
                        if (!enemy.hulk) {
                            enemy.alive = false
                        } else {
                            if (game.player.px + game.player.adjustedWidth < enemy.px && game.player.py + game.player.adjustedHeight < enemy.py) {
                                enemy.px += enemy.speed,
                                enemy.py += enemy.speed
                            } else if (game.player.px + game.player.adjustedWidth < enemy.px && game.player.py - game.player.adjustedHeight > enemy.py) {
                                enemy.px += enemy.speed,
                                enemy.py -= enemy.speed
                            } else if (game.player.px - game.player.adjustedWidth > enemy.px && game.player.py + game.player.adjustedHeight < enemy.py) {
                                enemy.px -= enemy.speed,
                                enemy.py += enemy.speed
                            } else if (game.player.px - game.player.adjustedWidth > enemy.px && game.player.py - game.player.adjustedHeight > enemy.py) {
                                enemy.px -= enemy.speed,
                                enemy.py -= enemy.speed
                            } else if (game.player.px + game.player.adjustedWidth < enemy.px) {
                                enemy.px += enemy.speed
                            } else if (game.player.px - game.player.adjustedWidth > enemy.px) {
                                enemy.px -= enemy.speed
                            } else if (game.player.py < enemy.py) {
                                enemy.py += enemy.speed
                            } else if (game.player.py > enemy.py) {
                                enemy.py -= enemy.speed
                            }
                        }
                        projectile.delete = true
                    }
                });
                if (this.checkCollision(game.player, game.player.adjustedWidth, game.player.adjustedHeight, enemy, enemy.adjustedWidth, enemy.adjustedHeight)) {
                    game.player.alive = false
                }
                game.humans.forEach (human => {
                    if (this.checkCollision(human, human.adjustedWidth, human.adjustedHeight, enemy, enemy.adjustedWidth, enemy.adjustedHeight)) {
                        human.alive = false
                    }
                })
            });
            game.humans.forEach (human => {
                if (this.checkCollision(human, human.adjustedWidth, human.adjustedHeight, game.player, game.player.adjustedWidth, game.player.adjustedHeight)) {
                    human.rescued = true
                }
            })
        };

        checkCollision(actorA, widthA, heightA, actorB, widthB, heightB) {
            /* ctx.beginPath(),
            ctx.rect(actorA.px, actorA.py, actorA.adjustedWidth, actorA.adjustedHeight),
            ctx.rect(actorB.px, actorB.py, actorB.adjustedWidth, actorB.adjustedHeight),        // Improve
            ctx.strokeStyle = "red",
            ctx.stroke(); */
            return (
                actorA.px <= actorB.px + widthB &&
                actorA.px + widthA >= actorB.px &&
                actorA.py <= actorB.py + heightB &&
                actorA.py + heightA >= actorB.py
            )
        }
    };



    class Game {
        constructor(width, height) {
            this.keys = [];
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.enemy = new Enemy(this);
            this.enemies = [];
            this.human = new Human(this);
            this.humans = [];
            this.input = new InputHandler(this);
            this.collision = new CollisionHandler(this);
            this.projectile = new Projectile(this);
            
            this.spriteCycle = function (actor, initial, increase, limit) {
                if (actor.x < limit) {
                    actor.x += increase
                } else {
                    actor.x = initial
                }
            };

            this.playableArea = function (actor, maxPx, maxPy) {
                if (actor.py <= 1) {
                    actor.py = 1
                } else if (actor.py >= maxPy) {
                    actor.py = maxPy
                };
                if (actor.px <= 1) {
                    actor.px = 1
                } else if (actor.px >= maxPx) {
                    actor.px = maxPx
                }
            }
        };

        update() {
            if (this.player.alive) {
                this.collision.update();
                this.player.update();
                this.enemies.forEach(enemy => {
                    enemy.update()
                });
                this.humans.forEach (human => {
                    human.update()
                });
                this.enemies = this.enemies.filter(enemy => enemy.alive);
                this.humans = this.humans.filter(human => human.alive && !human.rescued)
            }
        };

        drawBorder(actor) {
            if (actor.border.visible) {
                ctx.strokeStyle = actor.border.color;
                ctx.beginPath();
                ctx.arc(actor.border.borderX, actor.border.borderY, actor.border.radius, 0, 2 * Math.PI);
                ctx.stroke()
            }
        };

        draw(context) {
            this.player.draw(context)
            this.enemies.forEach(enemy => {
                enemy.draw(context),
                this.drawBorder(enemy)
            });
            this.humans.forEach (human => {
                human.draw(context),
                this.drawBorder(human)
            })
        };

        addEnemy(numberEnemies, enemy) {
            for (let i = 0; i < numberEnemies; i ++) {
                this.enemies.push(new enemy(this))
            }
        };

        addHuman(numberHumans, human) {
            for (let i = 0; i < numberHumans; i ++) {
                this.humans.push(new human(this))
            }
        }
    };



    const game = new Game(canvas.width, canvas.height);

    let lastTime = 0;
    
    function execute(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        gameFrame ++;
        requestAnimationFrame(execute)
    };

    game.addEnemy(14, Grunt);
    game.addEnemy(6, Hulk);
    game.addHuman(10, Mommy);
    
    execute(0)
});
