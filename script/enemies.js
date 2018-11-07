function Enemy(canvas, ctx, width, height, posX, posY, positionAttack) {
    
    this.canvas = canvas;
    this.ctx = ctx;
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.positionX = posX;
    this.positionY = posY;
    this.raccoonWidth = 90;
    this.raccoonHeight = 333;
    this.individualWidth=80;
    this.individualHeight=75;
    this.dx = 0.5;
    this.dy = 0.5;
    this.vy = 0.05;
    this.vx = 0.1;
    this.positionAttack = positionAttack;
    this.img = new Image();
    this.img.src = 'img/raccoonVertical.png';
    this.imgLine = new Image();
    this.srcArray = [{ src: 'img/verticaLine.png', width: 10 }, { src: 'img/horizontaLine.png', width: 35 }, { src: 'img/negativeTriangle.png', width: 30 }, { src: 'img/positiveTriangle.png', width: 30 }];
    this.imgLineInfo = this.srcArray[Math.floor(Math.random() * this.srcArray.length)];
    this.frames = 5;
    this.frameIndex = 0;
    this.velFrames = 17;
    this.numFramesMenosUno = 4;


}

Enemy.prototype.draw = function () {
    this.imgLine.src = this.imgLineInfo.src;
    this.iconWidth = this.imgLineInfo.width;
    //this.ctx.globalCompositeOperation = 'darken';
    this.ctx.drawImage(this.imgLine, this.positionX + (this.raccoonWidth / 2), this.positionY - 25, this.iconWidth, 20);


    
    //void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

    this.ctx.drawImage(this.img,0, this.frameIndex * Math.floor(this.raccoonHeight / this.frames),this.raccoonWidth,
     Math.floor(this.raccoonHeight / this.frames), this.positionX, this.positionY, this.raccoonWidth, this.individualHeight);

    this.animateImgEnemy();
};


Enemy.prototype.animateImgEnemy = function () {
    // debugger

    if (this.canvas.framesCounter % this.velFrames === 0) {
        this.frameIndex += 1;

        if (this.frameIndex > this.numFramesMenosUno) this.frameIndex = 0;
    }
};


Enemy.prototype.move = function () {
    if (this.positionAttack == 'top') {

        if (this.positionX < 340) {
            this.positionX += this.vx;
        }
        if (this.positionX > 370) {

            this.positionX -= this.vx * 2;
        }
        this.positionY += this.dy;
    } else if (this.positionAttack == 'right') {

        if (this.positionY < 250) {

            this.positionY += this.vy;
        }

        this.positionX += this.dx;

    } else if (this.positionAttack == 'left') {
        if (this.positionY < 250) {
            this.positionY += this.vy;
        }
        this.positionX -= this.dx;
    }

};

