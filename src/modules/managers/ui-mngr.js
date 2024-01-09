export {UIManager};

class UIManager {
    constructor(game, ui, spritesIndex) {
        this.game = game;
        this.spritesIndex = spritesIndex;
        this.ui = ui;
    }
    update() {
        this.updateScoreElement();
        this.updateLivesElement();
    }
    // Removes sprites from the previous frame
    draw() {
        const {ctx, canvas} = this.ui;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    updateScoreElement() {
        if (this.scoreHasChanged()) {
            this.ui.scoreElement.innerHTML = this.game.scoreMngr.score;
        }
    }
    livesHasChanged() {
        return this.ui.livesElement.childElementCount !== this.game.player.lives;
    }
    updateLifeIndicators(currentLives) {
        this.ui.livesElement.innerHTML = "";
        for (let i = 0; i < currentLives; i++) {
            const lifeIndicator = document.createElement("img");
            lifeIndicator.src = this.spritesIndex.life;
            lifeIndicator.alt = "Life Indicator";
            lifeIndicator.className = "life-indicator";
            this.ui.livesElement.appendChild(lifeIndicator);
        }
    }
    createSurplusLivesIndicator() {
        const surplusLivesIndicator = document.createElement("span");
        surplusLivesIndicator.id = "surplus-lives-indicator";
        this.ui.livesElement.appendChild(surplusLivesIndicator);
    }
    removeSurplusLivesIndicator(surplusLivesIndicator) {
        if (surplusLivesIndicator) {
            surplusLivesIndicator.parentNode.removeChild(surplusLivesIndicator);
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
    updateLivesElement() {
        if (!this.livesHasChanged()) {
            return;
        }
        const currentLives = this.game.player.lives;
        if (this.ui.livesElement.childElementCount < 20) {
            this.updateLifeIndicators(currentLives);
        } else {
            this.updateSurplusLivesIndicator(currentLives);
        }
    }
    updateFPS(FPS) {
        this.ui.fpsElement.innerHTML = FPS;
    }
    scoreHasChanged() {
        return this.ui.scoreElement.innerHTML != this.game.scoreMngr.score;
    }
}
