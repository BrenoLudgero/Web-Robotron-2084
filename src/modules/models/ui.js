export {UserInterface};

class UserInterface {
    constructor(game) {
        this.canvas = document.querySelector("canvas");
        this.setCanvasScaledResolution(3);
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.scoreElement = document.getElementById("score");
        this.scoreElement.innerHTML = game.scoreMngr.score;
        this.livesElement = document.getElementById("lives");
        this.fpsElement = document.getElementById("fps-counter");
    }
    // Initializes canvas.width and height with scaled dimensions
    setCanvasScaledResolution(scaleFactor) {
        const originalWidth = 292;
        const originalHeight = 240;
        const aspectRatio = originalWidth / originalHeight;
        const newWidth = Math.round(originalWidth * scaleFactor);
        const newHeight = Math.round(newWidth / aspectRatio);
        this.canvas.width = newWidth;
        this.canvas.height = newHeight;
    }
}
