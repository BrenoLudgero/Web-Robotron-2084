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
    createLifeIndicator(spritesIndex) {
        const lifeIndicator = document.createElement("img");
        lifeIndicator.src = spritesIndex.life;
        lifeIndicator.alt = "Life Indicator";
        lifeIndicator.className = "life-indicator";
        lifeIndicator.width = "";
        lifeIndicator.height = "";
        return lifeIndicator;
    }
    updateLifeIndicators(ui, currentLives, spritesIndex) {
        ui.livesElement.innerHTML = "";
        for (let i = 0; i < currentLives; i++) {
            let lifeIndicator = this.createLifeIndicator(spritesIndex);
            ui.livesElement.appendChild(lifeIndicator);
        }
    }
    enoughSpaceForLives(ui) {
        return ui.livesElement.childElementCount < 20;
    }
    updateLivesElement(ui, actorMngr, spritesIndex) {
        let playerLives = actorMngr.actors.player.lives;
        if (!this.livesHasChanged(ui, playerLives)) {
            return;
        }
        if (this.enoughSpaceForLives(ui)) {
            this.updateLifeIndicators(ui, playerLives, spritesIndex);
        } else {
            this.updateSurplusIndicator(ui, playerLives);
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
    updateFPSElement(ui, FPS) {
        ui.fpsElement.innerHTML = FPS;
    }
}
