export {UIManager};

class UIManager {
    update(scoreMngr, ui, actorMngr, spritesIndex) {
        this.updateScoreElement(ui, scoreMngr);
        this.updateLivesElement(ui, actorMngr, spritesIndex);
    }
    // Removes sprites from the previous frame
    clear(ui) {
        const {ctx, canvas} = ui;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    // Creates a string indicating the amount of lives beyond 20
    createSurplusLivesIndicator(ui) {
        const surplusLivesIndicator = document.createElement("span");
        surplusLivesIndicator.id = "surplus-lives-indicator";
        ui.livesElement.appendChild(surplusLivesIndicator);
        return surplusLivesIndicator;
    }
    removeSurplusLivesIndicator(surplusLivesIndicator) {
        if (surplusLivesIndicator) {
            surplusLivesIndicator.parentNode.removeChild(surplusLivesIndicator);
        }
    }
    updateSurplusLivesCount(surplusLivesIndicator, surplusLivesCount) {
        if (surplusLivesCount !== parseInt(surplusLivesIndicator.innerHTML)) {
            surplusLivesIndicator.innerHTML = `+${surplusLivesCount}`;
        }
    }
    updateSurplusLivesIndicator(ui, currentLives) {
        const surplusLivesCount = currentLives - 20;
        let surplusLivesIndicator = document.querySelector("#surplus-lives-indicator");
        if (surplusLivesCount > 0) {
            if (!surplusLivesIndicator) {
                surplusLivesIndicator = this.createSurplusLivesIndicator(ui);
            }
            this.updateSurplusLivesCount(surplusLivesIndicator, surplusLivesCount);
        } else {
            this.removeSurplusLivesIndicator(surplusLivesIndicator);
        }
    }
    livesHasChanged(ui, actorMngr) {
        return ui.livesElement.childElementCount !== actorMngr.player.lives;
    }
    updateLifeIndicators(ui, currentLives, spritesIndex) {
        ui.livesElement.innerHTML = "";
        for (let i = 0; i < currentLives; i++) {
            const lifeIndicator = document.createElement("img");
            lifeIndicator.src = spritesIndex.life;
            lifeIndicator.alt = "Life Indicator";
            lifeIndicator.className = "life-indicator";
            ui.livesElement.appendChild(lifeIndicator);
        }
    }
    updateLivesElement(ui, actorMngr, spritesIndex) {
        if (!this.livesHasChanged(ui, actorMngr)) {
            return;
        }
        const currentLives = actorMngr.player.lives;
        if (ui.livesElement.childElementCount < 20) {
            this.updateLifeIndicators(ui, currentLives, spritesIndex);
        } else {
            this.updateSurplusLivesIndicator(ui, currentLives);
        }
    }
    scoreHasChanged(ui, scoreMngr) {
        return ui.scoreElement.innerHTML != scoreMngr.score;
    }
    updateScoreElement(ui, scoreMngr) {
        if (this.scoreHasChanged(ui, scoreMngr)) {
            ui.scoreElement.innerHTML = scoreMngr.score;
        }
    }
    updateFPS(ui, FPS) {
        ui.fpsElement.innerHTML = FPS;
    }
}
