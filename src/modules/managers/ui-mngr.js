export {UserInterface};

class UserInterface {
    constructor(game) {
        this.game = game;
        this.canvas = document.querySelector("canvas");
        this.setCanvasScaledResolution(3);
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.scoreElement = document.getElementById("score");
        this.scoreElement.innerHTML = game.scoreMngr.score;
        this.livesElement = document.getElementById("lives");
        this.fpsElement = document.getElementById("fps-counter");
    }
    update() {
        this.updateScoreElement();
        this.updateLivesElement();
    }
    // Removes sprites from the previous frame
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
    updateScoreElement() {
        if (this.scoreHasChanged()) {
            this.scoreElement.innerHTML = this.game.scoreMngr.score;
        }
    }
    updateLivesElement() {
        if (!this.livesHasChanged()) {
            return;
        }
        const currentLives = this.game.player.lives;
        if (this.livesElement.childElementCount < 20) {
            this.updateLifeIndicators(currentLives);
        } else {
            this.updateSurplusLivesIndicator(currentLives);
        }
    }
    updateLifeIndicators(currentLives) {
        this.livesElement.innerHTML = "";
        for (let i = 0; i < currentLives; i++) {
            const lifeIndicator = document.createElement("img");
            lifeIndicator.src = this.game.spritesIndex.life;
            lifeIndicator.alt = "Life Indicator";
            lifeIndicator.className = "life-indicator";
            this.livesElement.appendChild(lifeIndicator);
        }
    }
    // Creates a string indicating the amount of lives beyond 20
    updateSurplusLivesIndicator(currentLives) {
        const surplusLivesCount = currentLives - 20;
        let surplusLivesIndicator = document.querySelector("#surplus-lives-indicator");
        if (surplusLivesCount > 0) {
            if (!surplusLivesIndicator) {
                this.createSurplusLivesIndicator();
                surplusLivesIndicator = document.querySelector("#surplus-lives-indicator");
            }
            if (surplusLivesIndicator && surplusLivesCount !== parseInt(surplusLivesIndicator.innerHTML)) {
                surplusLivesIndicator.innerHTML = `+${surplusLivesCount}`;
            }
        } else {
            this.removeSurplusLivesIndicator(surplusLivesIndicator);
        }
    }
    createSurplusLivesIndicator() {
        const surplusLivesIndicator = document.createElement("span");
        surplusLivesIndicator.id = "surplus-lives-indicator";
        this.livesElement.appendChild(surplusLivesIndicator);
    }
    removeSurplusLivesIndicator(surplusLivesIndicator) {
        if (surplusLivesIndicator) {
            surplusLivesIndicator.parentNode.removeChild(surplusLivesIndicator);
        }
    }
    updateFPS(FPS) {
        this.fpsElement.innerHTML = FPS;
    }
    scoreHasChanged() {
        return this.scoreElement.innerHTML != this.game.scoreMngr.score;
    }
    livesHasChanged() {
        return this.livesElement.childElementCount !== this.game.player.lives;
    }
}
