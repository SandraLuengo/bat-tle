function Enemy(ctx,width,height,posX,posY){
    this.ctx = ctx;
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.positionX = posX;
    this.positionY = posY;
    this.raccoonWidth=100;
    this.raccoonHeight=90;
    this.dx=5;
    this.img = new Image();
    this.img.src = 'img/raccoon1.png';
    this.imgLine = new Image();
    this.srcArray=[{src:'img/verticaLine.png',width:10},{src:'img/horizontaLine.png',width:35},{src:'img/negativeTriangle.png',width:30},{src:'img/positiveTriangle.png',width:30}];
    this.imgLineInfo = this.srcArray[Math.floor(Math.random()*this.srcArray.length)];
    
    
}

Enemy.prototype.draw = function () {
    this.imgLine.src=this.imgLineInfo.src;
    this.iconWidth=this.imgLineInfo.width;
    this.ctx.globalCompositeOperation='darken';
    this.ctx.drawImage(this.imgLine,this.positionX+(this.raccoonWidth/2),this.positionY-25,this.iconWidth,20);
    this.ctx.drawImage(this.img,this.positionX,this.positionY,this.raccoonWidth, this.raccoonHeight);
};

Enemy.prototype.move = function () {
    console.log('me muevo');
    this.positionX -= this.dx;
};

