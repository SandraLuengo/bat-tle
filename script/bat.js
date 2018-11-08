//herencia personaje general

function Bat(ctx, canvas, canvasWidth, canvasHeight, game) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.game = game;
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.batWidth = 800;
    this.batHeight = 160;
    this.batWidthSmall = 95;
    this.batPositionX = (this.width / 2) - (this.batWidthSmall / 1.2);
    this.batPositionY = 200;
    this.life = 5;
    this.points = 0;
    //no auto llamar desde el constructor
    this.frames = 8;
    this.frameIndex = 0;
    this.velFrames = 7;
    this.numFramesMenosUno = 7;
    //this.drawBat();
    this.img = new Image();
    this.img.src = 'img/8_bats.png';
    //this.img.src = 'img/attack.png';

}


Bat.prototype.drawBat = function () {


    //void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

    this.ctx.drawImage(this.img, this.frameIndex * Math.floor(this.batWidth / this.frames), 0, Math.floor(this.batWidth / this.frames),
        this.batHeight, this.batPositionX, this.batPositionY, this.batWidthSmall, this.batHeight);
    this.animateImg();

}



Bat.prototype.animateImg = function () {
    // debugger

    // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
    if (this.game.framesCounter % this.velFrames === 0) {
        this.frameIndex += 1;

        // Si el frame es el último, se vuelve al primero
        if (this.frameIndex > this.numFramesMenosUno) this.frameIndex = 0;
    }
};
Bat.prototype.changeFrames = function (batWidth, batPositionY, frames, velFrames, numFramesMenosUno, src) {
    
    this.batWidth = batWidth;
    this.batPositionY = batPositionY;
    this.frames = frames;
    this.velFrames = velFrames;
    this.numFramesMenosUno = numFramesMenosUno;
    this.img.src = src;
    this.drawBat();

}