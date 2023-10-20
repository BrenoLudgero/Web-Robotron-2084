// Robotron: 2084 (Released in 1982)
// Developed by Vid Kidz (Disbanded in 1984)
// Manufactured and Published by Williams Electronics, Inc. (Now a Light & Wonder brand)
// Copyrights: Williams Electronics, Inc. / Williams Electronics Games, Inc. / Midway Amusement Games, LLC / Lawrence DeMar & Eugene Jarvis (1978 - Present)

// Reprogrammed in JavaScript by Breno Ludgero (https://www.linkedin.com/in/breno-ludgero/)
// Based on the blue label ROM revision with default game settings

/* TO-DO LIST (IN DESCENDING ORDER OF PRIORITY):
SPLIT CODE INTO MULTIPLE SCRIPTS
REFACTOR CODE. MAKE BETTER USE OF CLASSES
UPDATE MOMMY, HULK SPRITE CYCLE
REFINE MOMMY, HULK BEHAVIOR
RIP YOUR OWN SPRITESHEET (NO MORE DIMENSION ADJUSTMENT)
SPLIT SPRITES INTO MULTIPLE IMAGES
UPDATE SPRITE CYCLE
ADJUST ENEMIES HITBOXES
COMMENT CODE
UPDATE PLAYER SHOOTING (HITBOX AND VISUAL)
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
    let currentFrame = 0;
    const sprites = new Image();
    sprites.src = "img/sprites.png"; // Ripped by Sean Riddle
    const playerControls = ["w", "a", "s", "d", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"];
    let drawHitboxes = false;
    let everyoneInvincible = true;

    function RNG(min, max) {
        return Math.floor(Math.random() * (max - min)) + 1
    };
    function calculateDistance(actor1XPosition, actor1YPosition, actor2XPosition, actor2YPosition) {
        const distanceX = actor2XPosition - actor1XPosition;
        const distanceY = actor2YPosition - actor1YPosition;
        return Math.sqrt(distanceX * distanceX + distanceY * distanceY)
    };
    function spriteCycle(actor, initialSpritesheetXPosition, increment, maxSpritesheetXPosition, spritesheetYPosition) {
        actor.spritesheetYPosition = spritesheetYPosition;
        if (actor.spritesheetXPosition < maxSpritesheetXPosition) {
            actor.spritesheetXPosition += increment
        } else {
            actor.spritesheetXPosition = initialSpritesheetXPosition
        }
    };
    function setRandomDirection(actor) {
        const fourDirections = ["left", "right", "up", "down"];
        const eightDirections = ["left", "right", "up", "down", "upleft", "upright", "downleft", "downright"];
        if (actor.movementType == 1) {
            return fourDirections[Math.floor(Math.random() * fourDirections.length)]
        } else if (actor.movementType == 2) {
            return eightDirections[Math.floor(Math.random() * eightDirections.length)]
        }
        
    };
    function setRandomWalkDistance() {
        const distances = [500, 650, 800];
        return distances[Math.floor(Math.random() * distances.length)]
    };
    function setMovementBoundaries(actor, maxScreenXPosition, maxScreenYPosition) {
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
    function isActorAgainstWall(actor) {
        if (actor.screenXPosition >= actor.playableArea["x"] ||
            actor.screenXPosition <= 2 ||
            actor.screenYPosition >= actor.playableArea["y"] ||
            actor.screenYPosition <= 2) {
                return true
        }
    };
    function walkRandomly(actor) {
        if (actor.remainingWalkingDistance > 0) {
            switch(actor.currentDirection) {
                case("left"):
                    actor.screenXPosition -= actor.movingSpeed
                    break
                case("right"):
                    actor.screenXPosition += actor.movingSpeed
                    break;
                case("up"):
                    actor.screenYPosition -= actor.movingSpeed
                    break
                case("down"):
                    actor.screenYPosition += actor.movingSpeed
                    break
                case("upleft"):
                    actor.screenYPosition -= actor.movingSpeed,
                    actor.screenXPosition -= actor.movingSpeed
                    break
                case("upright"):
                    actor.screenYPosition -= actor.movingSpeed,
                    actor.screenXPosition += actor.movingSpeed
                    break
                case("downleft"):
                    actor.screenYPosition += actor.movingSpeed,
                    actor.screenXPosition -= actor.movingSpeed
                    break
                case("downright"):
                    actor.screenYPosition += actor.movingSpeed,
                    actor.screenXPosition += actor.movingSpeed
                    break
            }
            actor.remainingWalkingDistance -= actor.movementRate
        } else {
            actor.currentDirection = setRandomDirection(actor);
            actor.remainingWalkingDistance = setRandomWalkDistance();
        };
    };
    function turnAwayFromWall(actor) {
        if (isActorAgainstWall(actor)) {
            switch(actor.currentDirection) {
                case("left"):
                    actor.currentDirection = "right"
                    break
                case("right"):
                    actor.currentDirection = "left"
                    break;
                case("up"):
                    actor.currentDirection = "down"
                    break
                case("down"):
                    actor.currentDirection = "up"
                    break
                case("upleft"):
                    actor.currentDirection = "downright"
                    break
                case("upright"):
                    actor.currentDirection = "downleft"
                    break
                case("downleft"):
                    actor.currentDirection = "upright"
                    break
                case("downright"):
                    actor.currentDirection = "upleft"
                    break
            }
        }
    };

    class InputHandler {
        constructor(game) {
            this.game = game;
            window.addEventListener("keydown", (e) => {
                if (playerControls.includes(e.key) && this.game.keysPressed.indexOf(e.key) === -1) {
                    this.game.keysPressed.push(e.key)
                }
            });
            window.addEventListener("keyup", (e) => {
                if (this.game.keysPressed.indexOf(e.key) > -1) {
                    this.game.keysPressed.splice(this.game.keysPressed.indexOf(e.key), 1)
                };
                if (e.key == "h") {
                    drawHitboxes = !drawHitboxes
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
        constructor(game, screenXPosition, screenYPosition, left, right, up, down) {
            this.game = game;
            this.width = 2;
            this.height = 2;
            this.spritesheetXPosition = 0;
            this.spritesheetYPosition = 510;
            this.screenXPosition = screenXPosition;
            this.screenYPosition = screenYPosition;
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
            this.width = 15;
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
            this.playableArea = {
                "x": 990,
                "y": 742
            };
            this.spriteCycle = function () {
                if (currentFrame % this.movementAnimationDelay == 0) {
                    if (this.spritesheetXPosition < 88) {
                        this.spritesheetXPosition += 26
                    } else {
                        this.spritesheetXPosition = 10
                    }
                }
            };
            this.move = function(movingHorizontally, movingVertically) {
                if (movingHorizontally && movingVertically) {
                    this.spriteCycle(),
                    this.spritesheetYPosition = 478,
                    this.screenXPosition += this.movingSpeed
                } else if (movingHorizontally && !movingVertically) {
                    this.spriteCycle(),
                    this.spritesheetYPosition = 445,
                    this.screenXPosition -= this.movingSpeed
                } else if (!movingHorizontally && movingVertically) {
                    this.screenYPosition -= this.movingSpeed;
                    if (!this.game.keysPressed.includes("d") && !this.game.keysPressed.includes("a") && !this.game.keysPressed.includes("s")) {
                        this.spritesheetYPosition = 409,
                        this.spriteCycle()
                    }
                } else if (!movingHorizontally && !movingVertically) {
                    this.screenYPosition += this.movingSpeed;
                    if (!this.game.keysPressed.includes("d") && !this.game.keysPressed.includes("a") && !this.game.keysPressed.includes("w")) {
                        this.spritesheetYPosition = 371,
                        this.spriteCycle()
                    }
                }
            };
            this.shoot = function(screenXPosition, screenYPosition, left, right, up, down) {
                if (this.projectileTimer <= 0) {
                    this.projectiles.push(new Projectile(this.game, screenXPosition, screenYPosition, left, right, up, down)), 
                    this.projectileTimer = this.projectileDelay
                }
            }
        };
        update() {
            game.input.update();
            this.projectiles.forEach(projectile => projectile.update());
            this.projectiles = this.projectiles.filter(projectile => !projectile.shouldDelete);
            this.projectileTimer --;
            setMovementBoundaries(this, this.playableArea["x"], this.playableArea["y"])
            if (isActorAgainstWall(this)) {
                console.log("A")
            }
        };
        draw(context) {
            context.drawImage(sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition, this.screenYPosition, this.adjustedWidth, this.adjustedHeight);
            this.projectiles.forEach(projectile => projectile.draw(context));
            game.drawHitbox(this)
        }
    };

    class Enemy {
        constructor(game) {
            this.game = game;
            this.isAlive = true
            this.movementRate = 5;  //  DO  NOT  CHANGE !
            this.walkingDistance = setRandomWalkDistance();
            this.remainingWalkingDistance = this.walkingDistance
            // screenX and screenY positions defined in game.addEnemy()
        };
        draw(context) {
            context.drawImage(sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition, this.screenYPosition, this.adjustedWidth, this.adjustedHeight);
            game.drawHitbox(this)
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
            this.playableArea = {
                "x": 982,
                "y": 738
            }
            this.movingSpeed = 7; // INCREASES ACCORDING TO WAVE LENGTH ?
            this.movementTimer = 0;
            this.movementInterval = 100 // DECREASES ACCORDING TO WAVE LENGTH
        };
        update() {
            let randomNumber = RNG(1, 3);
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
                    spriteCycle(this, 8, 30, 98, 285)
                }
                this.movementTimer = 0
            } else {
                this.movementTimer += this.movementRate
            }
            setMovementBoundaries(this, this.playableArea["x"], this.playableArea["y"])
        }
    };

    class Hulk extends Enemy {
        constructor(game) {
            super(game);
            this.width = 26;
            this.adjustedWidth = 47;
            this.height = 32;
            this.movementType = 1;
            this.currentDirection = setRandomDirection(this);
            this.adjustedHeight = 57;
            this.spritesheetXPosition = 409;
            this.spritesheetYPosition = 434;
            this.playableArea = {
                "x": 968,
                "y": 728
            }
            this.movingSpeed = 1; // INCREASES ACCORDING TO WAVE
            this.isHulk = true
        };
        update() {
            turnAwayFromWall(this);
            walkRandomly(this);
            /* 
            UP: spriteCycle(this, 409, 26, 487, 434)
            DOWN: spriteCycle(this, 409, 26, 487, 434)
            LEFT: spriteCycle(this, 409, 26, 487, 398)
            RIGHT: spriteCycle(this, 409, 26, 487, 474)
            */
            setMovementBoundaries(this, this.playableArea["x"], this.playableArea["y"])
        }
    };

    class Human {
        constructor(game) {
            this.game = game;
            this.movementRate = 4;
            this.movingSpeed = 0.8;
            this.isAlive = true;
            this.wasRescued = false;
            this.movementType = 2;
            this.playableArea = {
                "x": 990,
                "y": 738
            }
            this.currentDirection = setRandomDirection(this);
            this.walkingDistance = setRandomWalkDistance();
            this.remainingWalkingDistance = this.walkingDistance
            // screenX and screenY positions defined in game.addHuman()
        };
        draw(context) {
            context.drawImage(sprites, this.spritesheetXPosition, this.spritesheetYPosition, this.width, this.height, this.screenXPosition, this.screenYPosition, this.adjustedWidth, this.adjustedHeight);
            game.drawHitbox(this)
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
            this.spritesheetYPosition = 369
        };
        update() {
            turnAwayFromWall(this);
            walkRandomly(this);
            /* 
            UP: spriteCycle(actor, 114, 26, 192, 408)
            DOWN: spriteCycle(actor, 114, 26, 192, 369)
            LEFT: spriteCycle(actor, 114, 26, 192, 443)
            RIGHT: spriteCycle(actor, 114, 26, 192, 476)
            */
            setMovementBoundaries(this, this.playableArea["x"], this.playableArea["y"])
        }
    };

    class CollisionHandler {
        constructor(game) {
            this.game = game
        };
        checkCollision(actorA, widthActorA, heightActorA, actorB, widthActorB, heightActorB) {
            return (
                actorA.screenXPosition <= actorB.screenXPosition + widthActorB &&
                actorA.screenXPosition + widthActorA >= actorB.screenXPosition &&
                actorA.screenYPosition <= actorB.screenYPosition + heightActorB &&
                actorA.screenYPosition + heightActorA >= actorB.screenYPosition
            )
        };
        update() {
            game.enemies.forEach (enemy => {
                game.player.projectiles.forEach(projectile => {
                    if (this.checkCollision(projectile, projectile.width, projectile.height, enemy, enemy.adjustedWidth, enemy.adjustedHeight)) {
                        if (!enemy.isHulk) {
                            enemy.isAlive = false
                        } else {
                            // Calculate knockback direction based on projectile direction
                            const knockbackXDirection = projectile.shotRight ? 1 : (projectile.shotLeft ? -1 : 0);
                            const knockbackYDirection = projectile.shotDown ? 1 : (projectile.shotUp ? -1 : 0);
                            // Apply knockback
                            enemy.screenXPosition += knockbackXDirection * 10;
                            enemy.screenYPosition += knockbackYDirection * 10
                        };
                        projectile.shouldDelete = true
                    }
                });
                if (!everyoneInvincible) {  // ! ! ! ! !
                    if (this.checkCollision(game.player, game.player.adjustedWidth, game.player.adjustedHeight, enemy, enemy.adjustedWidth, enemy.adjustedHeight)) {
                        game.player.isAlive = false
                    }
                    game.humans.forEach (human => {
                        if (this.checkCollision(human, human.adjustedWidth, human.adjustedHeight, enemy, enemy.adjustedWidth, enemy.adjustedHeight)) {
                            human.isAlive = false
                        }
                    })
                }
            });
            game.humans.forEach (human => {
                if (this.checkCollision(human, human.adjustedWidth, human.adjustedHeight, game.player, game.player.adjustedWidth, game.player.adjustedHeight)) {
                    human.wasRescued = true
                }
            })
        }
    };

    class Game {
        constructor() {
            this.keysPressed = [];
            this.player = new Player(this);
            this.enemy = new Enemy(this);
            this.enemies = [];
            this.human = new Human(this);
            this.humans = [];
            this.input = new InputHandler(this);
            this.collision = new CollisionHandler(this);
            this.projectile = new Projectile(this);
            this.addEnemy = function(numberEnemies, enemy) {
                const minimumDistanceFromPlayer = 200; // SHRINKS ACCORDING TO WAVE (120 MINUMUM)
                const minimumDistanceBetweenEnemies = 48;
                const minimumDistanceFromHumans = 68;
                for (let i = 0; i < numberEnemies; i++) {
                    const newEnemy = new enemy(this);
                    let safeToSpawn = false;
                    // MULTIPLE FUNCTIONS
                    while (!safeToSpawn) {
                        newEnemy.screenXPosition = RNG(1, canvas.width - newEnemy.adjustedWidth);
                        newEnemy.screenYPosition = RNG(1, canvas.height - newEnemy.adjustedHeight);
                        const playerDistance = calculateDistance(newEnemy.screenXPosition, newEnemy.screenYPosition, this.player.screenXPosition, this.player.screenYPosition);
                        let isSafeFromPlayer = playerDistance >= minimumDistanceFromPlayer;
                        let isSafeFromEnemies = true;
                        let isSafeFromHumans = true;
                        for (let j = 0; j < this.enemies.length; j++) {
                            const otherEnemy = this.enemies[j];
                            const distanceBetweenEnemies = calculateDistance(newEnemy.screenXPosition, newEnemy.screenYPosition, otherEnemy.screenXPosition, otherEnemy.screenYPosition);
                            if (distanceBetweenEnemies <= minimumDistanceBetweenEnemies) {
                                isSafeFromEnemies = false;
                                break
                            }
                        };
                        for (let k = 0; k < this.humans.length; k++) {
                            const human = this.humans[k];
                            const distanceFromHumans = calculateDistance(newEnemy.screenXPosition, newEnemy.screenYPosition, human.screenXPosition, human.screenYPosition);
                            if (distanceFromHumans <= minimumDistanceFromHumans) {
                                isSafeFromHumans = false;
                                break
                            }
                        };
                        if (isSafeFromPlayer && isSafeFromEnemies && isSafeFromHumans) {
                            this.enemies.push(newEnemy);
                            safeToSpawn = true
                        }
                    }
                }
            };
            this.addHuman = function(numberHumans, human) {
                const minimumDistanceFromPlayer = 100;
                const minimumDistanceBetweenHumans = 120;
                for (let i = 0; i < numberHumans; i++) {
                    const newHuman = new human(this);
                    let safeToSpawn = false;
                    // MULTIPLE FUNCTIONS
                    while (!safeToSpawn) {
                        newHuman.screenXPosition = RNG(1, canvas.width - newHuman.adjustedWidth);
                        newHuman.screenYPosition = RNG(1, canvas.height - newHuman.adjustedHeight);
                        const playerDistance = calculateDistance(newHuman.screenXPosition, newHuman.screenYPosition, this.player.screenXPosition, this.player.screenYPosition);
                        let isSafeFromPlayer = playerDistance >= minimumDistanceFromPlayer;
                        let isSafeFromEnemies = true;
                        let isSafeFromHumans = true;
                        for (let k = 0; k < this.humans.length; k++) {
                            const otherHuman = this.humans[k];
                            const distanceFromHumans = calculateDistance(newHuman.screenXPosition, newHuman.screenYPosition, otherHuman.screenXPosition, otherHuman.screenYPosition);
                            if (distanceFromHumans <= minimumDistanceBetweenHumans) {
                                isSafeFromHumans = false;
                                break
                            }
                        };
                        if (isSafeFromPlayer && isSafeFromEnemies && isSafeFromHumans) {
                            this.humans.push(newHuman);
                            safeToSpawn = true
                        }
                    }
                }
            }
        };
        drawHitbox(actor) {
            if (drawHitboxes) {
                ctx.beginPath(),
                ctx.rect(actor.screenXPosition, actor.screenYPosition, actor.adjustedWidth, actor.adjustedHeight),
                ctx.strokeStyle = "red",
                ctx.stroke()
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

    const game = new Game();
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
    // ALWAYS SPAWN HUMANS -> OBSTACLES -> HULKS -> ELSE
    game.addHuman(15, Mommy);
    game.addEnemy(7, Hulk);
    game.addEnemy(10, Grunt);
    execute(0)
    console.log("Humans: " + game.humans.length)
    console.log("Enemies: " + game.enemies.length)
})
