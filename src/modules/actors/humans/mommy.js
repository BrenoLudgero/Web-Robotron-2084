export {Mommy};
import {Human} from "../../models/human.js";

class Mommy extends Human {
    constructor(game) {
        super(game, 14, 28);
        this.spritesheetIncrement = 16;
        this.hitboxConfig = {
            "left": {
                spritesheetY: 59,
                head: {xPosition: 5, yPosition: 5},
                torso: {width: 11, height: 11, xPosition: 5, yPosition: 16},
                leftArm: {width: 0, height: 0, xPosition: null, yPosition: null},
                rightArm: {width: 0, height: 0, xPosition: null, yPosition: null},
                legs: {width: 9, height: 19, xPosition: 6, yPosition: 21}
            },
            "right": {
                spritesheetY: 88,
                head: {xPosition: 6, yPosition: 3},
                torso: {width: 11, height: 11, xPosition: 6, yPosition: 14},
                leftArm: {width: 0, height: 0, xPosition: null, yPosition: null},
                rightArm: {width: 0, height: 0, xPosition: null, yPosition: null},
                legs: {width: 9, height: 19, xPosition: 7, yPosition: 21}
            },
            "up": {
                spritesheetY: 30,
                head: {width: 9, height: 9, xPosition: 6, yPosition: 2},
                torso: {width: 14, height: 10, xPosition: 4, yPosition: 12},
                rightArm: {width: 3, height: 10, xPosition: 0, yPosition: 12},
                leftArm: {width: 3, height: 10, xPosition: 18, yPosition: 12},
                legs: {width: 10, height: 13, xPosition: 5, yPosition: 23}
            },
            "down": {},
            "upleft": {},
            "upright": {},
            "downleft": {},
            "downright": {}
        };
        this.hitboxConfig.downleft = {...this.hitboxConfig.left};
        this.hitboxConfig.downright = {...this.hitboxConfig.right};
        this.hitboxConfig.upleft = {...this.hitboxConfig.left};
        this.hitboxConfig.upright = {...this.hitboxConfig.right};
        this.hitboxConfig.down = {...this.hitboxConfig.up};
        this.hitboxConfig.down.spritesheetY = 0;
        this.limbs = this.hitboxConfig.down;
        this.game.hitboxMngr.setAllHitboxes(this);
    }
}
