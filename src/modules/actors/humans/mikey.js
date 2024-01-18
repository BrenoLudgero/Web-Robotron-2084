export {Mikey};
import {Human} from "../../models/human.js";

class Mikey extends Human {
    constructor(game) {
        super(game, 10, 22);
        this.spritesheetIncrement = 12;
        this.hitboxConfig = {
            "left": {
                spritesheetY: 48,
                head: {},
                torso: {xPosition: 3, yPosition: 12},
                leftArm: {width: 0, height: 0, xPosition: this.centerX, yPosition: this.centerY},
                rightArm: {width: 0, height: 0, xPosition: this.centerX, yPosition: this.centerY},
                legs: {height: 9}
            },
            "right": {
                spritesheetY: 70,
                head: {},
                torso: {xPosition: 3, yPosition: 12},
                leftArm: {width: 0, height: 0, xPosition: this.centerX, yPosition: this.centerY},
                rightArm: {width: 0, height: 0, xPosition: this.centerX, yPosition: this.centerY},
                legs: {height: 9}
            },
            "up": {
                spritesheetY: 24,
                head: {width: 9, height: 9, xPosition: 3, yPosition: 0},
                torso: {width: 9, height: 9, xPosition: 4, yPosition: 12},
                rightArm: {width: 3, height: 9, xPosition: 0, yPosition: 12},
                leftArm: {width: 3, height: 9, xPosition: 12, yPosition: 12},
                legs: {width: 8, height: 6, xPosition: 4, yPosition: 21}
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
        game.hitboxMngr.setAllHitboxes(this);
    }
}
