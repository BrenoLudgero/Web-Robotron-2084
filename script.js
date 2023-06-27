// Robotron: 2084 (Released in 1982)
// Developed by Vid Kidz (Disbanded in 1984)
// Manufactured and Published by Williams Electronics, Inc. (Now a Light & Wonder brand)
// Copyrights: Williams Electronics, Inc. / Williams Electronics Games, Inc. / Midway Amusement Games, LLC / Lawrence DeMar & Eugene Jarvis (1978 - Present)

// Reprogrammed in JavaScript by Breno Ludgero (https://www.linkedin.com/in/breno-ludgero/)
// Based on the blue label ROM revision with default game settings

/* TO DO LIST (IN DESCENDING ORDER OF PRIORITY):
FIX circleAround
FIX MOMMY BEHAVIOR THEN UPDATE HULK TO GO AFTER CLOSEST HUMAN (?)
RIP YOUR OWN SPRITESHEET (NO MORE ADJUSTING DIMENSIONS)
SPLIT SPRITES INTO MULTIPLE IMAGES
SPLIT CODE INTO MULTIPLE SCRIPTS
REFACTOR CODE. MAKE BETTER USE OF CLASSES
COMMENT CODE
IMPLEMENT SOUNDS FOR EVERY NEW ADDITION
REWORK HTML SIZES, RESPONSIVENESS
IMPLEMENT ALL ACTORS & OBSTACLES
HUMAN, ENEMY INTERACTION WITH OBSTACLES
IMPLEMENT SCORE
SPAWN / DEATH ANIMATIONS
IMPLEMENT ENEMY WAVES
FIX CAPS LOCK LACK OF MOVEMENT
ADD MOUSE FIRE SUPPORT
CHECK CROSS-BROWSER SUPPORT */

window.addEventListener("load", function() {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    canvas.width = 1016;
    canvas.height = 786;
    var currentFrame = 0;
    const sprites = new Image();
    sprites.src = "img/sprites.png"; // Ripped by Sean Riddle
    const controls = ["w", "a", "s", "d", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"];

    function RNG(min, max) {
        return Math.floor(Math.random() * (max - min)) + 1
    };
    function calculateDistance(actor1xPosition, actor1yPosition, actor2xPosition, actor2yPosition) {
        const distanceX = actor2xPosition - actor1xPosition;
        const distanceY = actor2yPosition - actor1yPosition;
        return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    };

    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener("keydown", (e) => {
                if (controls.includes(e.key) && this.game.keysPressed.indexOf(e.key) === -1) {
                    this.game.keysPressed.push(e.key)
                }
            });
            window.addEventListener("keyup", (e) => {
                if (this.game.keysPressed.indexOf(e.key) > -1) {
                    this.game.keysPressed.splice(this.game.keysPressed.indexOf(e.key), 1)
                }
            })
            /*; window.addEventListener("mousedown", e => {
                console.log("CLICK")
            });
            window.addEventListener("mouseup", e => {
                console.log("NO CLICK")
            }) */
        };
        update() {
            if (this.game.keysPressed.includes("w")) {
                game.player.move(false, true)
            };
            if (this.game.keysPressed.includes("s")) {
                game.player.move(false, false)
            };
            if (this.game.keysPressed.includes("d")) {
                game.player.move(true, true)
            } else if (this.game.keysPressed.includes("a")) {
                game.player.move(true, false)
            };
            if (this.game.keysPressed.includes("ArrowUp") && !this.game.keysPressed.includes("ArrowLeft") && !this.game.keysPressed.includes("ArrowRight")) {
                game.player.shoot(game.player.screenXPosition + game.player.adjustedWidth / 2, game.player.screenYPosition - 4, false, false, true, false)
            } else if (this.game.keysPressed.includes("ArrowUp") && this.game.keysPressed.includes("ArrowLeft")) {
                game.player.shoot(game.player.screenXPosition - 4, game.player.screenYPosition - 4, true, false, true, false)
            } else if (this.game.keysPressed.includes("ArrowUp") && this.game.keysPressed.includes("ArrowRight")) {
                game.player.shoot(game.player.screenXPosition + game.player.adjustedWidth + 4, game.player.screenYPosition - 4, false, true, true, false)
            };
            if (this.game.keysPressed.includes("ArrowDown") && !this.game.keysPressed.includes("ArrowLeft") && !this.game.keysPressed.includes("ArrowRight")) {
                game.player.shoot(game.player.screenXPosition + game.player.adjustedWidth / 2, game.player.screenYPosition + game.player.adjustedHeight, false, false, false, true)
            } else if (this.game.keysPressed.includes("ArrowDown") && this.game.keysPressed.includes("ArrowRight")) {
                game.player.shoot(game.player.screenXPosition  + game.player.adjustedWidth + 3, game.player.screenYPosition + game.player.adjustedHeight, false, true, false, true)
            } else if (this.game.keysPressed.includes("ArrowDown") && this.game.keysPressed.includes("ArrowLeft")) {
                game.player.shoot(game.player.screenXPosition - 4, game.player.screenYPosition + game.player.adjustedHeight, true, false, false, true)
            };
            if (this.game.keysPressed.includes("ArrowLeft") && !this.game.keysPressed.includes("ArrowDown")  && !this.game.keysPressed.includes("ArrowUp")) {
                game.player.shoot(game.player.screenXPosition - 4, game.player.screenYPosition + game.player.adjustedHeight / 2, true, false, false, false)
            } else if (this.game.keysPressed.includes("ArrowRight") && !this.game.keysPressed.includes("ArrowDown")  && !this.game.keysPressed.includes("ArrowUp")) {
                game.player.shoot(game.player.screenXPosition + game.player.adjustedWidth + 3, game.player.screenYPosition + game.player.adjustedHeight / 2, false, true, false, false)
            }
        }
    };

    class Projectile {
        constructor(game, px, py, left, right, up, down) {
            this.game = game;
            this.width = 1;
            this.height = 1;
            this.spritesheetXPosition = 0;
            this.spritesheetYPosition = 510;
            this.screenXPosition = px;
            this.screenYPosition = py;
            this.shotLeft = left;
            this.shotRight = right;
            this.shotUp = up;
            this.shotDown = down;
            this.shouldDelete = false
        };
        update() {
            if (this.screenXPosition > canvas.width + 10 || this.screenXPosition < -10 || this.screenYPosition > canvas.height + 10 || this.screenYPosition < -10) {
                this.shouldDelete = true
            }
        };
        draw(context) {
            if (this.shotUp && !this.shotLeft && !this.shotRight) {
                for (let i = 0; i < 18; i ++) {
                    context.drawImage(sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition, this.screenYPosition --, this.width, this.height)
                }
            } else if (this.shotUp && this.shotLeft) {
                for (let i = 0; i < 18; i ++) {
                    context.drawImage(sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition --, this.screenYPosition --, this.width, this.height)
                }
            } else if (this.shotUp && this.shotRight) {
                for (let i = 0; i < 18; i ++) {
                    context.drawImage(sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition ++, this.screenYPosition --, this.width, this.height)
                }
            } else if (this.shotLeft && !this.shotUp && !this.shotDown) {
                for (let i = 0; i < 18; i ++) {
                    context.drawImage(sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition --, this.screenYPosition, this.width, this.height)
                }
            } else if (this.shotRight && !this.shotUp && !this.shotDown) {
                for (let i = 0; i < 18; i ++) {
                    context.drawImage(sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition ++, this.screenYPosition, this.width, this.height)
                }
            } else if (this.shotDown && this.shotLeft) {
                for (let i = 0; i < 18; i ++) {
                    context.drawImage(sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition --, this.screenYPosition ++, this.width, this.height)
                }
            } else if (this.shotDown && !this.shotLeft && !this.shotRight) {
                for (let i = 0; i < 18; i ++) {
                    context.drawImage(sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition, this.screenYPosition ++, this.width, this.height)
                }
            } else if (this.shotDown && this.shotRight) {
                for (let i = 0; i < 18; i ++) {
                    context.drawImage(sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition ++, this.screenYPosition ++, this.width, this.height)
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
            this.spritesheetXPosition = 10;
            this.spritesheetYPosition = 371;
            this.screenXPosition = canvas.width /2 - this.width;
            this.screenYPosition = canvas.height /2 - this.height;
            this.movingSpeed = 3.5;
            this.movementAnimationDelay = 4;
            this.projectiles = [];
            this.projectileTimer = 0;
            this.projectileDelay = 9;
            this.isAlive = true;
            this.circleAround = {
                color: "white",
                circleAroundX: this.screenXPosition + this.adjustedWidth / 2,
                circleAroundY: this.screenYPosition + this.adjustedHeight / 2,
                radius: Math.sqrt((this.spritesheetXPosition / 4) ** 2 + (this.spritesheetYPosition / 4) ** 2),
                visible: true
            };
            this.move = function(dx, dy) {
                if (dx && dy) {
                    this.spriteCycle(),
                    this.spritesheetYPosition = 478,
                    this.screenXPosition += this.movingSpeed
                } else if (dx && !dy) {
                    this.spriteCycle(),
                    this.spritesheetYPosition = 445,
                    this.screenXPosition -= this.movingSpeed
                } else if (!dx && dy) {
                    this.screenYPosition -= this.movingSpeed;
                    if (!this.game.keysPressed.includes("d") && !this.game.keysPressed.includes("a") && !this.game.keysPressed.includes("s")) {
                        this.spritesheetYPosition = 409,
                        this.spriteCycle()
                    }
                } else if (!dx && !dy) {
                    this.screenYPosition += this.movingSpeed;
                    if (!this.game.keysPressed.includes("d") && !this.game.keysPressed.includes("a") && !this.game.keysPressed.includes("w")) {
                        this.spritesheetYPosition = 371,
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
                if (currentFrame % this.movementAnimationDelay == 0) {
                    if (this.spritesheetXPosition < 88) {
                        this.spritesheetXPosition += 26
                    } else {
                        this.spritesheetXPosition = 10
                    }
                }
            }
        };
        update() {
            game.input.update();
            this.projectiles.forEach(projectile => projectile.update());
            this.projectiles = this.projectiles.filter(projectile => !projectile.shouldDelete);
            this.projectileTimer --;
            game.playableArea(this, 990, 742)
        };
        draw(context) {
            context.drawImage(sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition, this.screenYPosition, this.adjustedWidth, this.adjustedHeight);
            this.projectiles.forEach(projectile => projectile.draw(context));
            //game.drawCircleAround(this)
        }
    };

    class Enemy {
        constructor(game) {
            this.game = game;
            this.isAlive = true
            // screenX and screenY positions defined in game.addEnemy()
        };
        draw(context) {
            context.drawImage(sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition, this.screenYPosition, this.adjustedWidth, this.adjustedHeight);
            //game.drawCircleAround(this)
        }
    };

    class Grunt extends Enemy {
        constructor(game) {
            super(game);
            this.width = 18;
            this.adjustedWidth = 32;
            this.height = 27;
            this.adjustedHeight = 48;
            this.spritesheetXPosition = 8;
            this.spritesheetYPosition = 285;
            this.movingSpeed = 6;
            this.movementTimer = 0;
            this.movementInterval = 40;
            this.movementRate = 0;
            this.circleAround = {
                color: "red",
                circleAroundX: this.screenXPosition + this.adjustedWidth / 2,
                circleAroundY: this.screenYPosition + this.adjustedHeight / 2,
                radius: Math.sqrt((this.spritesheetXPosition * 2) + (this.spritesheetYPosition * 2)),
                visible: true
            }
        };
        update() {
            let randomNumber = RNG(1, 4);
            if (this.movementTimer > this.movementInterval) {
                if (randomNumber === 1) {
                    if (this.screenXPosition > game.player.screenXPosition) {
                        this.screenXPosition -= this.movingSpeed
                    } else {
                        this.screenXPosition += this.movingSpeed
                    };
                    if (this.screenYPosition > game.player.screenYPosition) {
                        this.screenYPosition -= this.movingSpeed
                    } else {
                        this.screenYPosition += this.movingSpeed
                    };
                    game.spriteCycle(this, 8, 30, 98, 285)
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
            this.spritesheetXPosition = 409;
            this.spritesheetYPosition = 434;
            this.movementTimer = 0;
            this.movementInterval = 10;
            this.movementRate = 0;
            this.movingSpeed = 8;
            this.isHulk = true;
            this.circleAround = {
                color: "lime",
                circleAroundX: this.screenXPosition + this.adjustedWidth / 2,
                circleAroundY: this.screenYPosition + this.adjustedHeight / 2,
                radius: Math.sqrt((this.spritesheetXPosition * 1.5) + (this.spritesheetYPosition * 1.5)),
                visible: true
            }
        };
        update() {
            let randomNumber = RNG(1, 20);  // Temporary
            if (this.movementTimer > this.movementInterval) { 
                if (randomNumber <= 5) {
                    game.spriteCycle(this, 409, 26, 487, 398),
                    this.screenXPosition -= this.movingSpeed
                } else if (randomNumber <= 10) {
                    game.spriteCycle(this, 409, 26, 487, 474),
                    this.screenXPosition += this.movingSpeed
                } else if (randomNumber <= 15) {
                    game.spriteCycle(this, 409, 26, 487, 434),
                    this.screenYPosition -= this.movingSpeed
                } else if (randomNumber <= 20) {
                    game.spriteCycle(this, 409, 26, 487, 434),
                    this.screenYPosition += this.movingSpeed
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
            this.movementTimer = 0;
            this.movementInterval = 10;
            this.movementRate = 0;
            this.directionTimer = 1000;
            this.movingSpeed = 3.5;
            this.isAlive = true;
            this.wasRescued = false
        };
        update() {
            if (this.movementTimer > this.movementInterval) {
                if (this.screenXPosition > game.player.screenXPosition) {
                    game.spriteCycle(this, 114, 26, 192, 443),
                    this.screenXPosition -= this.movingSpeed
                } else {
                    game.spriteCycle(this, 114, 26, 192, 476),
                    this.screenXPosition += this.movingSpeed
                };
                if (this.screenYPosition > game.player.screenYPosition) {
                    game.spriteCycle(this, 114, 26, 192, 408),
                    this.screenYPosition -= this.movingSpeed
                } else {
                    game.spriteCycle(this, 114, 26, 192, 369),
                    this.screenYPosition += this.movingSpeed
                };
                this.movementTimer = 0
            } else {
                this.movementTimer += this.movementRate
            };
            game.playableArea(this, 990, 742)
        };
        draw(context) {
            context.drawImage(sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition, this.screenYPosition, this.adjustedWidth, this.adjustedHeight);
            //game.drawCircleAround(this)
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
            this.spritesheetXPosition = 114;
            this.spritesheetYPosition = 369;
            this.circleAround = {
                color: "deepPink",
                circleAroundX: this.screenXPosition + this.adjustedWidth / 2,
                circleAroundY: this.screenYPosition + this.adjustedHeight / 2,
                radius: Math.sqrt((this.spritesheetXPosition * 2) + (this.spritesheetYPosition * 2)),
                visible: true
            }
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
                        if (!enemy.isHulk) {
                            enemy.isAlive = false
                        } else {
                            if (game.player.screenXPosition + game.player.adjustedWidth < enemy.screenXPosition && game.player.screenYPosition + game.player.adjustedHeight < enemy.screenYPosition) {
                                enemy.screenXPosition += enemy.movingSpeed,
                                enemy.screenYPosition += enemy.movingSpeed
                            } else if (game.player.screenXPosition + game.player.adjustedWidth < enemy.screenXPosition && game.player.screenYPosition - game.player.adjustedHeight > enemy.screenYPosition) {
                                enemy.screenXPosition += enemy.movingSpeed,
                                enemy.screenYPosition -= enemy.movingSpeed
                            } else if (game.player.screenXPosition - game.player.adjustedWidth > enemy.screenXPosition && game.player.screenYPosition + game.player.adjustedHeight < enemy.screenYPosition) {
                                enemy.screenXPosition -= enemy.movingSpeed,
                                enemy.screenYPosition += enemy.movingSpeed
                            } else if (game.player.screenXPosition - game.player.adjustedWidth > enemy.screenXPosition && game.player.screenYPosition - game.player.adjustedHeight > enemy.screenYPosition) {
                                enemy.screenXPosition -= enemy.movingSpeed,
                                enemy.screenYPosition -= enemy.movingSpeed
                            } else if (game.player.screenXPosition + game.player.adjustedWidth < enemy.screenXPosition) {
                                enemy.screenXPosition += enemy.movingSpeed
                            } else if (game.player.screenXPosition - game.player.adjustedWidth > enemy.screenXPosition) {
                                enemy.screenXPosition -= enemy.movingSpeed
                            } else if (game.player.screenYPosition < enemy.screenYPosition) {
                                enemy.screenYPosition += enemy.movingSpeed
                            } else if (game.player.screenYPosition > enemy.screenYPosition) {
                                enemy.screenYPosition -= enemy.movingSpeed
                            }
                        }
                        projectile.shouldDelete = true
                    }
                });
                if (this.checkCollision(game.player, game.player.adjustedWidth, game.player.adjustedHeight, enemy, enemy.adjustedWidth, enemy.adjustedHeight)) {
                    game.player.isAlive = false
                }
                game.humans.forEach (human => {
                    if (this.checkCollision(human, human.adjustedWidth, human.adjustedHeight, enemy, enemy.adjustedWidth, enemy.adjustedHeight)) {
                        human.isAlive = false
                    }
                })
            });
            game.humans.forEach (human => {
                if (this.checkCollision(human, human.adjustedWidth, human.adjustedHeight, game.player, game.player.adjustedWidth, game.player.adjustedHeight)) {
                    human.wasRescued = true
                }
            })
        };
        checkCollision(actorA, widthActorA, heightActorA, actorB, widthActorB, heightActorB) {
            // --- Improve. Draws multiple times  ---
            // ---     Put in drawHitboxes()      ---
            /* ctx.beginPath(),
            ctx.rect(actorA.screenXPosition, actorA.screenYPosition, actorA.adjustedWidth, actorA.adjustedHeight),
            ctx.rect(actorB.screenXPosition, actorB.screenYPosition, actorB.adjustedWidth, actorB.adjustedHeight),
            ctx.strokeStyle = "red",
            ctx.stroke(); */
            // --------------------------------------
            return (
                actorA.screenXPosition <= actorB.screenXPosition + widthActorB &&
                actorA.screenXPosition + widthActorA >= actorB.screenXPosition &&
                actorA.screenYPosition <= actorB.screenYPosition + heightActorB &&
                actorA.screenYPosition + heightActorA >= actorB.screenYPosition
            )
        }
    };

    class Game {
        constructor(width, height) {
            this.keysPressed = [];
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
            this.spriteCycle = function (actor, initialSpritesheetXPosition, increment, maxSpritesheetXPosition, spritesheetYPosition) {
                actor.spritesheetYPosition = spritesheetYPosition;
                if (actor.spritesheetXPosition < maxSpritesheetXPosition) {
                    actor.spritesheetXPosition += increment
                } else {
                    actor.spritesheetXPosition = initialSpritesheetXPosition
                }
            };
            this.playableArea = function (actor, maxScreenXPosition, maxScreenYPosition) {
                if (actor.screenYPosition <= 1) {
                    actor.screenYPosition = 1
                } else if (actor.screenYPosition >= maxScreenYPosition) {
                    actor.screenYPosition = maxScreenYPosition
                };
                if (actor.screenXPosition <= 1) {
                    actor.screenXPosition = 1
                } else if (actor.screenXPosition >= maxScreenXPosition) {
                    actor.screenXPosition = maxScreenXPosition
                }
            };
            this.addEnemy = function(numberEnemies, enemy) {
                const minimumDistanceFromPlayer = 120;
                const minumumDistanceBetweenEnemies = 40;
                for (let i = 0; i < numberEnemies; i++) {
                    const newEnemy = new enemy(this);
                    let isSafe = false;
                    while (!isSafe) {
                        newEnemy.screenXPosition = RNG(1, canvas.width - 30);
                        newEnemy.screenYPosition = RNG(1, canvas.height - 30);
                        const playerDistance = calculateDistance(newEnemy.screenXPosition, newEnemy.screenYPosition, this.player.screenXPosition, this.player.screenYPosition);
                        let isSafeFromPlayer = playerDistance >= minimumDistanceFromPlayer;
                        let isSafeFromEnemies = true;
                        for (let j = 0; j < this.enemies.length; j++) {
                            const otherEnemy = this.enemies[j];
                            const distanceBetweenEnemies = calculateDistance(newEnemy.screenXPosition, newEnemy.screenYPosition, otherEnemy.screenXPosition, otherEnemy.screenYPosition);
                            if (distanceBetweenEnemies <= minumumDistanceBetweenEnemies) {
                                isSafeFromEnemies = false;
                                break
                            }
                        };
                        if (isSafeFromPlayer && isSafeFromEnemies) {
                            this.enemies.push(newEnemy);
                            isSafe = true
                        }
                    }
                }
            };
            this.addHuman = function(numberHumans, human) {
                const minimumDistanceFromPlayer = 100;
                const minimumDistanceFromEnemies = 60;
                for (let i = 0; i < numberHumans; i++) {
                    const newHuman = new human(this);
                    let isSafe = false;
                    while (!isSafe) {
                        newHuman.screenXPosition = RNG(1, canvas.width);
                        newHuman.screenYPosition = RNG(1, canvas.height);
                        const playerDistance = calculateDistance(newHuman.screenXPosition, newHuman.screenYPosition, this.player.screenXPosition, this.player.screenYPosition);
                        let isSafeFromPlayer = playerDistance >= minimumDistanceFromPlayer;
                        let isSafeFromEnemies = true;
                        for (let j = 0; j < this.enemies.length; j++) {
                            const enemy = this.enemies[j];
                            const distanceFromEnemy = calculateDistance(newHuman.screenXPosition, newHuman.screenYPosition, enemy.screenXPosition, enemy.screenYPosition);
                            if (distanceFromEnemy <= minimumDistanceFromEnemies) {
                                isSafeFromEnemies = false;
                                break
                            }
                        };
                        if (isSafeFromPlayer && isSafeFromEnemies) {
                            this.humans.push(newHuman);
                            isSafe = true
                        }
                    }
                }
            }
        };
        update() {
            if (this.player.isAlive) {
                this.collision.update();
                this.player.update();
                this.enemies.forEach(enemy => {
                    enemy.update()
                });
                this.humans.forEach (human => {
                    human.update()
                });
                this.enemies = this.enemies.filter(enemy => enemy.isAlive);
                this.humans = this.humans.filter(human => human.isAlive && !human.wasRescued)
            }
        };
        /* drawCircleAround(actor) {
            if (actor.circleAround.visible) {
                ctx.strokeStyle = actor.circleAround.color;
                ctx.beginPath();
                ctx.arc(actor.circleAround.circleAroundX, actor.circleAround.circleAroundY, actor.circleAround.radius, 0, 2 * Math.PI);
                ctx.stroke()
            }
        }; */
        draw(context) {
            this.player.draw(context)
            this.enemies.forEach(enemy => {
                enemy.draw(context)
            });
            this.humans.forEach(human => {
                human.draw(context)
            })
        }
    };

    const game = new Game(canvas.width, canvas.height);
    let lastTimeStamp = 0;
    function execute(timeStamp) {
        const deltaTime = timeStamp - lastTimeStamp;
        lastTimeStamp = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        currentFrame ++;
        requestAnimationFrame(execute)
    };
    game.addEnemy(120, Grunt);
    game.addEnemy(30, Hulk);
    game.addHuman(10, Mommy);
    execute(0)
});
