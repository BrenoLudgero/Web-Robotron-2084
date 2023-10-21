export {Mommy}
import {Human} from "./actors.js";

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
        this.playableArea = {
            "x": 990,
            "y": 738
        }
    }
    
    /* 
    UP: spriteCycle(actor, 114, 26, 192, 408)
    DOWN: spriteCycle(actor, 114, 26, 192, 369)
    LEFT: spriteCycle(actor, 114, 26, 192, 443)
    RIGHT: spriteCycle(actor, 114, 26, 192, 476)
    */
}
