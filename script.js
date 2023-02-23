const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const canvasWidth = canvas.width = 876;
const canvasHeight = canvas.height = 720;

gameFrame = 0;
stagFrames = 7;

const sprites = new Image();
sprites.src = "img/sprites.png";

const actors = {
    player: {
    x: 10,
    y: 371,
    w: 14,
    h: 22
    }
}

function animate() {
    context.drawImage(sprites, actors.player.x, actors.player.y, actors.player.w, actors.player.h, 424, 338, actors.player.w * 1.3, actors.player.h * 1.3);
    if (gameFrame % stagFrames == 0) {
        if (actors.player.x < 88) actors.player.x+=26;
        else actors.player.x = 10;
    }
    gameFrame++;
    requestAnimationFrame(animate)
};
animate();