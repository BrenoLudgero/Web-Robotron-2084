// Robotron: 2084
// Developed by Vid Kidz
// Manufactured and Published by Williams Electronics, Inc.
// Copyrights: Williams Electronics, Inc. / Williams Electronics Games, Inc. / Midway Amusement Games, LLC / Lawrence DeMar & Eugene Jarvis
// Sprites ripped by Sean Riddle's program (https://seanriddle.com/ripper.html)
// Reprogrammed in JavaScript by Breno Ludgero (https://www.linkedin.com/in/breno-ludgero/)
// Based on the blue label ROM revision with default game settings

/* TO-DO LIST (IN DESCENDING ORDER OF PRIORITY):
REFACTOR CODE
UPDATE MOMMY, HULK SPRITE CYCLE
REFINE MOMMY, HULK BEHAVIOR
ADD MINIMUM DISTANCE HULK TO HULK, GRUNT TO GRUNT ETC
RIP YOUR OWN SPRITESHEET (NO MORE DIMENSION ADJUSTMENT)
SPLIT SPRITES INTO MULTIPLE IMAGES
UPDATE SPRITE CYCLE
ADJUST ENEMIES HITBOXES
REFACTOR CODE
COMMENT CODE
UPDATE PLAYER SHOOTING (HITBOX AND VISUAL)
IMPLEMENT SOUNDS FOR EVERY NEW ADDITION
CHECK CROSS-BROWSER SUPPORT
REWORK HTML SIZES, RESPONSIVENESS
IMPLEMENT ALL ACTORS & OBSTACLES
HUMAN, ENEMY INTERACTION WITH OBSTACLES
REFACTOR CODE
IMPLEMENT SCORE
SPAWN / DEATH ANIMATIONS
IMPLEMENT ENEMY WAVES
FIX CAPS LOCK LACK OF MOVEMENT
ADD MOUSE FIRE SUPPORT */

import {Game} from "./modules/game.js";

window.addEventListener("load", function() {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    canvas.width = 1016;
    canvas.height = 786;
    const game = new Game(canvas, ctx);
    let lastTimeStamp = 0;
    function execute(timeStamp) {
        const deltaTime = timeStamp - lastTimeStamp;
        lastTimeStamp = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        game.currentFrame ++;
        requestAnimationFrame(execute)
    };
    game.spawnEnemies()
    execute(0)
    console.log("Humans: " + game.humans.length)
    console.log("Enemies: " + game.enemies.length)
})
