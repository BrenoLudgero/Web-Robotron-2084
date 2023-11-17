export {UserInterface};

class UserInterface {
    constructor(game) {
        this.game = game;
        this.canvas = document.querySelector("canvas");
        this.setCanvasScaledResolution(3);
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.scoreElement = document.getElementById("score");
        this.scoreElement.innerHTML = game.score;
        this.livesElement = document.getElementById("lives");
        this.fpsElement = document.getElementById("fps-counter")
    };
    update() {
        this.updateScore();
        this.updateLives()
    };
    // Removes sprites from the previous frame
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    };
    // Initializes canvas.width and height with scaled dimensions
    setCanvasScaledResolution(scaleFactor) {
        const originalWidth = 292;
        const originalHeight = 240;
        const aspectRatio = originalWidth / originalHeight;
        const newWidth = Math.round(originalWidth * scaleFactor);
        const newHeight = Math.round(newWidth / aspectRatio);
        this.canvas.width = newWidth;
        this.canvas.height = newHeight
    };
    updateScore() {
        if (this.scoreHasChanged()) {
            this.scoreElement.innerHTML = this.game.score
        }
    };
    updateLives() {
        if (this.livesHasChanged()) {
            this.livesElement.innerHTML = "";
            for (let i = 0; i < this.game.player.lives; i++) {
                const lifeIndicator = document.createElement("img");
                lifeIndicator.src = this.game.spritesIndex.life;
                lifeIndicator.alt = "Life Indicator";
                lifeIndicator.className = "life";
                this.livesElement.appendChild(lifeIndicator)
            }
        }
    };
    updateFPS(FPS) {
        this.fpsElement.innerHTML = FPS
    };
    scoreHasChanged() {
        return this.scoreElement.innerHTML != this.game.score
    };
    livesHasChanged() {
        return this.livesElement.childElementCount != this.game.player.lives
    }
}
