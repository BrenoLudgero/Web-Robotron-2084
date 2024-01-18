export {UIManager};

class UIManager {
    update(score, ui, actorMngr) {
        this.updateScoreElement(ui, score.currentScore);
        this.updateLivesElement(ui, actorMngr);
    }
    // Removes sprites from the previous frame
    clear(ui) {
        const {context, canvas} = ui;
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    // Creates a string indicating the amount of lives beyond 20
    createSurplusLivesIndicator(ui) {
        const surplusIndicator = document.createElement("span");
        surplusIndicator.id = "surplus-lives-indicator";
        ui.livesElement.appendChild(surplusIndicator);
        return surplusIndicator;
    }
    removeSurplusIndicator(surplusIndicator) {
        if (surplusIndicator) {
            surplusIndicator.parentNode.removeChild(surplusIndicator);
        }
    }
    shouldUpdateSurplus(surplusLivesCount, surplusIndicator) {
        return surplusLivesCount !== parseInt(surplusIndicator.innerHTML);
    }
    updateSurplusLivesCount(surplusLivesCount, surplusIndicator) {
        if (this.shouldUpdateSurplus(surplusLivesCount, surplusIndicator)) {
            surplusIndicator.innerHTML = `+${surplusLivesCount}`;
        }
    }
    updateSurplusIndicator(ui, currentLives) {
        const surplusLivesCount = currentLives - 20;
        let surplusIndicator = document.querySelector("#surplus-lives-indicator");
        if (surplusLivesCount > 0) {
            if (!surplusIndicator) {
                surplusIndicator = this.createSurplusLivesIndicator(ui);
            }
            this.updateSurplusLivesCount(surplusLivesCount, surplusIndicator);
        } else {
            this.removeSurplusIndicator(surplusIndicator);
        }
    }
    livesHasChanged(ui, playerLives) {
        let interfaceLivesCount = ui.livesElement.childElementCount;
        return interfaceLivesCount !== playerLives;
    }
    createLifeIndicator(ui) {
        const lifeIndicator = document.createElement("img");
        lifeIndicator.src = ui.lifeIndicatorSprite.src;
        lifeIndicator.alt = "Life Indicator";
        lifeIndicator.className = "life-indicator";
        lifeIndicator.width = "";
        lifeIndicator.height = "";
        return lifeIndicator;
    }
    updateLifeIndicators(ui, currentLives) {
        ui.livesElement.innerHTML = "";
        for (let i = 0; i < currentLives; i++) {
            let lifeIndicator = this.createLifeIndicator(ui);
            ui.livesElement.appendChild(lifeIndicator);
        }
    }
    enoughSpaceForLives(ui) {
        return ui.livesElement.childElementCount < 20;
    }
    updateLivesElement(ui, actorMngr) {
        let playerLives = actorMngr.actors.player.lives;
        if (!this.livesHasChanged(ui, playerLives)) {
            return;
        }
        if (this.enoughSpaceForLives(ui)) {
            this.updateLifeIndicators(ui, playerLives);
        } else {
            this.updateSurplusIndicator(ui, playerLives);
        }
    }
    scoreHasChanged(ui, score) {
        return ui.scoreElement.innerHTML != score;
    }
    updateScoreElement(ui, score) {
        if (this.scoreHasChanged(ui, score)) {
            ui.scoreElement.innerHTML = score;
        }
    }
    updateFPSElement(ui, FPS) {
        ui.FPSElement.innerHTML = FPS;
    }
}
