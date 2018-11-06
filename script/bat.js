//herencia personaje general

function Bat(ctx, canvas, canvasWidth, canvasHeight, game) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.game = game;
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.batWidth = 90;
    this.batHeight = 100;
    this.batPositionX = (this.width / 2) - (this.batWidth);
    this.batPositionY =200;
    this.life=10;
    //no auto llamar desde el constructor

    this.drawBat();

}


Bat.prototype.drawBat = function () {

    this.img = new Image();
    this.img.src = 'img/bat1.png';
    this.ctx.drawImage(this.img, this.batPositionX, this.batPositionY, this.batWidth, this.batHeight);

}



