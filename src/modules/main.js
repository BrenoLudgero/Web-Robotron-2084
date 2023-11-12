// Robotron: 2084
// Developed by Vid Kidz
// Programmed by Lawrence DeMar & Eugene Jarvis
// Manufactured and Published by Williams Electronics, Inc.
// Copyrights: Williams Electronics, Inc. / Williams Electronics Games, Inc. / Midway Amusement Games, LLC / Lawrence DeMar & Eugene Jarvis

// Sprites ripped by Sean Riddle's program (https://seanriddle.com/ripper.html)
// Robotron font by André Nossek (http://www.thealmightyguru.com/GameFonts/Series-Robotron.html)
// Reprogrammed in JavaScript by Breno Ludgero (https://www.linkedin.com/in/breno-ludgero/)
// Based on the blue label ROM revision with default game settings

/* TO-DO LIST (IN DESCENDING ORDER OF PRIORITY):
PROJECTILE MANAGER
AI, UI CLASSES
ADJUST HITBOXES (DYNAMIC HITBOX BASED ON SPRITE CYCLE)
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

import {Game} from "./models/game.js";

window.addEventListener("load", () => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    const game = new Game(canvas, ctx);

    const updateRate = 1000 / 60; // 60 times per second
    let last = performance.now();
    let lag = 0;
    function runGame() {
        let current = performance.now();
        const elapsed = current - last;
        last = current;
        lag += elapsed;
        while (lag >= updateRate) {
            game.update(updateRate);
            lag -= updateRate;
            game.globalTimer++
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.draw(ctx);
        requestAnimationFrame(runGame)
    }
    runGame();
    game.actorMngr.spawnActors()
    game.debuggerr.logActorCount()
})
