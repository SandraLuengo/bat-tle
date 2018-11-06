function Enemy(canvas, ctx, width, height, posX, posY, positionAttack) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.positionX = posX;
    this.positionY = posY;
    this.raccoonWidth = 80;
    this.raccoonHeight = 60;
    this.dx = 0.3;
    this.dy = 0.3;
    this.vy = 0.05;
    this.vx = 0.1;
    this.positionAttack = positionAttack;
    this.img = new Image();
    this.img.src = 'img/raccoon1.png';
    this.imgLine = new Image();
    this.srcArray = [{ src: 'img/verticaLine.png', width: 10 }, { src: 'img/horizontaLine.png', width: 35 }, { src: 'img/negativeTriangle.png', width: 30 }, { src: 'img/positiveTriangle.png', width: 30 }];
    this.imgLineInfo = this.srcArray[Math.floor(Math.random() * this.srcArray.length)];


}

Enemy.prototype.draw = function () {
    this.imgLine.src = this.imgLineInfo.src;
    this.iconWidth = this.imgLineInfo.width;
    this.ctx.globalCompositeOperation = 'darken';
    this.ctx.drawImage(this.imgLine, this.positionX + (this.raccoonWidth / 2), this.positionY - 25, this.iconWidth, 20);
    this.ctx.drawImage(this.img, this.positionX, this.positionY, this.raccoonWidth, this.raccoonHeight);
};

Enemy.prototype.move = function () {
    if (this.positionAttack == 'top') {
        
        if ( this.positionX<290) {
            this.positionX += this.vx;
        }
        if(this.positionX >370){

            this.positionX -= this.vx*2;
        }
        this.positionY += this.dy;
    } else if (this.positionAttack == 'right') {

        if (this.positionY <250) {

            this.positionY += this.vy;
        }

        this.positionX += this.dx;

    } else if (this.positionAttack == 'left') {
        if (this.positionY <250) {
            this.positionY += this.vy;
        }
        this.positionX -= this.dx;
    }

};

