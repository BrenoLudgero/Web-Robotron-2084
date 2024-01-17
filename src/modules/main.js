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
HITBOX MODEL, HITBOXMNGR
UPDATE SOUND 'STOP'
REDUCE MAGIC NUMBERS
IMPROVE STATE PATTERN
IMPLEMENT ALL ACTORS + SOUNDS & OBSTACLES
HUMAN, ENEMY INTERACTION WITH OBSTACLES
SPAWN / DEATH ANIMATIONS
IMPLEMENT WAVES
REWORK HTML SIZES, RESPONSIVENESS (CHECK PROJECTILE POSITIONS)
CHECK CROSS-BROWSER SUPPORT
ADD MOUSE FIRE SUPPORT
ADD JOYSTICK SUPPORT */

import {Game} from "./models/game.js";

window.addEventListener("load", () => {
    const game = new Game();
    // Ensures 60 updates per second despite hardware
    const frameRate = 1000 / 60; // 1000 milliseconds
    let lag = 0; // Accumulates time between frames
    let framesThisSecond = 0;
    let lastFrame = performance.now();
    let lastFPSUpdate = performance.now();

    function runGame() {
        let currentFrame = performance.now();
        const elapsed = currentFrame - lastFrame;
        lastFrame = currentFrame;
        lag += elapsed;
        // Game loop
        while (lag >= frameRate) {
            game.update();
            game.draw();
            lag -= frameRate;
            game.globalTimer++;
            framesThisSecond++;
        }
        // Updates framerate indicator
        if (currentFrame - lastFPSUpdate >= 1000) {
            const FPS = Math.round((framesThisSecond * 1000) / (currentFrame - lastFPSUpdate));
            game.uiMngr.updateFPSElement(game.ui, FPS);
            framesThisSecond = 0;
            lastFPSUpdate = currentFrame;
        }
        requestAnimationFrame(runGame);
    }
    // Called once
    runGame();
    game.spawnActors();
    game.debuggerr.logActorCount(game);
});
