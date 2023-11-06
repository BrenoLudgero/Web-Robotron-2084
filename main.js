// Robotron: 2084
// Developed by Vid Kidz
// Manufactured and Published by Williams Electronics, Inc.
// Copyrights: Williams Electronics, Inc. / Williams Electronics Games, Inc. / Midway Amusement Games, LLC / Lawrence DeMar & Eugene Jarvis
// Sprites ripped by Sean Riddle's program (https://seanriddle.com/ripper.html)
// Robotron font by André Nossek (http://www.thealmightyguru.com/GameFonts/Series-Robotron.html)
// Reprogrammed in JavaScript by Breno Ludgero (https://www.linkedin.com/in/breno-ludgero/)
// Based on the blue label ROM revision with default game settings

/* TO-DO LIST (IN DESCENDING ORDER OF PRIORITY):
SET INDIVIDUAL WALK DISTANCES ?
SET INDIVIDUAL MOVEMENT BOUNDARIES ?
ADJUST ENEMIES HITBOXES (DYNAMIC HITBOX BASED ON SPRITE CYCLE)
ADD MINIMUM DISTANCE HULK TO HULK, GRUNT TO GRUNT ETC
COMMENT CODE
IMPLEMENT SOUNDS FOR EVERY NEW ADDITION
REWORK HTML SIZES, RESPONSIVENESS (CHECK PROJECTILE POSITIONS)
CHECK CROSS-BROWSER SUPPORT
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
    const targetFrameRate = 60;
    const frameInterval = 1000 / targetFrameRate;
    function execute(timeStamp) {
        const deltaTime = timeStamp - lastTimeStamp;
        if (deltaTime >= frameInterval) {
            lastTimeStamp = timeStamp;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            game.update(deltaTime);
            game.draw(ctx);
            game.currentFrame++
        }
        requestAnimationFrame(execute)
    };
    requestAnimationFrame(execute);
    game.spawnEnemies()
    game.logActorCount()
})
