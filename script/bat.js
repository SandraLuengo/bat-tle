function Bat(ctx, canvas, canvasWidth, canvasHeight, game) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.game = game;
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.batWidth = 120;
    this.batHeight = 120;
    this.batPositionX = (this.width / 2) - (this.batWidth / 2);
    this.batPositionY = this.height - 300;
    this.drawBat();

}


Bat.prototype.drawBat = function () {

    this.img = new Image();
    this.img.src = 'img/bat1.png';
    this.ctx.drawImage(this.img, this.batPositionX, this.batPositionY, this.batHeight, this.batHeight);



}



