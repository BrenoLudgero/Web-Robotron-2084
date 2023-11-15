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
COMMENT CODE
IMPLEMENT SOUNDS FOR EVERY NEW ADDITION
REWORK HTML SIZES, RESPONSIVENESS (CHECK PROJECTILE POSITIONS)
CHECK CROSS-BROWSER SUPPORT
IMPLEMENT ALL ACTORS & OBSTACLES
HUMAN, ENEMY INTERACTION WITH OBSTACLES
REFACTOR CODE
SPAWN / DEATH ANIMATIONS
IMPLEMENT WAVES
IMPLEMENT HUMAN SCORE BONUS
FIX CAPS LOCK LACK OF MOVEMENT
ADD MOUSE FIRE SUPPORT */

import {Game} from "./models/game.js";

window.addEventListener("load", () => {
    const game = new Game();
    const updateRate = 1000 / 60; // 60 times per second (1000 milliseconds)
    let last = performance.now();
    let lag = 0; // Accumulates time between frames
    let framesThisSecond = 0;
    let lastFPSUpdate = performance.now();
    function runGame() {
        let current = performance.now();
        const elapsed = current - last;
        last = current;
        lag += elapsed;
        while (lag >= updateRate) {
            game.update();
            game.draw();
            lag -= updateRate;
            game.globalTimer++;
            framesThisSecond++
        };
        if (current - lastFPSUpdate >= 1000) {
            const FPS = Math.round((framesThisSecond * 1000) / (current - lastFPSUpdate));
            game.ui.updateFPS(FPS);
            framesThisSecond = 0;
            lastFPSUpdate = current
        };
        requestAnimationFrame(runGame)
    }
    // Called once
    runGame();
    game.actorMngr.spawnActors()
    game.debuggerr.logActorCount()
})
