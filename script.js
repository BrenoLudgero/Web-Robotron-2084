const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const canvasWidth = canvas.width = 876;
const canvasHeight = canvas.height = 720;

var gameFrame = 0;
var stagFrames = 3;

const sprites = new Image();
sprites.src = "img/sprites.png";

function spriteCycle() {
    if(gameFrame % stagFrames == 0) {
        if (player.x < 88) {player.x+=26}
        else player.x = 10
    }
};

const player = {
    x: 10,
    y: 371,
    w: 14,
    h: 23,
    px:424,
    py:338,
    speed: 3.5,
    // SPEED === 3.5 ! ! !
    moveUp: function() {this.py-=this.speed},
    moveLeft: function() {this.px-=this.speed},
    moveDown: function() {this.py+=this.speed},
    moveRight: function() {this.px+=this.speed},
    animateUp: function() {if (!controls.d.pressed && !controls.a.pressed && !controls.s.pressed){this.y = 409; spriteCycle()}},
    animateDown: function() {if (!controls.d.pressed && !controls.a.pressed && !controls.w.pressed){this.y = 371; spriteCycle()}},
    animateLeft: function() {if (!controls.d.pressed){this.y = 445; spriteCycle()}},
    animateRight: function() {if (!controls.a.pressed){this.y = 478; spriteCycle()}},
    shootUp: function() {},
    shootLeft: function() {},
    shootDown: function() {},
    shootRight: function() {},
};

const controls = {
    w: {pressed: false, function() {player.animateUp(), player.moveUp()}},
    a: {pressed: false, function() {player.animateLeft(), player.moveLeft()}},
    s: {pressed: false, function() {player.animateDown(), player.moveDown()}},
    d: {pressed: false, function() {player.animateRight(), player.moveRight()}},
    ArrowUp: {pressed: false, function() {player.shootUp()}},                            //<----------------
    ArrowLeft: {pressed: false, function() {player.shootLeft()}},                        //<---------------
    ArrowDown: {pressed: false, function() {player.shootDown()}},                        //<--------------
    ArrowRight: {pressed: false, function() {player.shootRight()}}                       //<-------------
};

document.addEventListener("keydown", (e) => {
    if (controls[e.key]) {controls[e.key].pressed = true}
});

document.addEventListener("keyup", (e) => {
    if (controls[e.key]) {controls[e.key].pressed = false}
});

// ADD MOUSE FIRE SUPPORT ! ! !

/* canvas.addEventListener("mousedown", e => {
    console.log("CLICK")
});

canvas.addEventListener("mouseup", e => {
    console.log("NO CLICK")
}); */

const actions = () => {
    Object.keys(controls).forEach(key=> {
        controls[key].pressed && controls[key].function()
    })
};

function playableArea () {
    if (player.py <= 1) {player.py = 1};
    if (player.py >= 692) {player.py = 692};
    if (player.px <= 0) {player.px = 0};
    if (player.px >= 858) {player.px = 858}
};

function animate() {
    actions();
    playableArea();
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.drawImage(sprites, player.x, player.y, player.w, player.h, player.px, player.py, player.w * 1.3, player.h * 1.3);
    gameFrame++;
    requestAnimationFrame(animate)
};

animate();
