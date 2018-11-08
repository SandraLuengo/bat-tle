
function LastEnemy(canvas, ctx, width, height, posX, posY, positionAttack) {
    Enemy.call(this, canvas, ctx, width, height, posX, posY, positionAttack);
    this.img = new Image();
    this.img.src = 'img/badRaccoon.png';
    this.arrayAttacks = [];
    this.numberAttacks = 10;
    this.dy = 0.07;
    this.widthInd = 88;
    this.heightInd = 66;
    this.frames = 6;
    this.frameIndex = 0;
    this.velFrames = 7;
    this.numFramesMenosUno = 5;
    this.animationHeight = 2798;
    this.imgLevelTwo = new Image();
    this.imgLevelTwo.src = 'img/level2.png';
}

LastEnemy.prototype = Object.create(Enemy.prototype);
LastEnemy.prototype.constructor = LastEnemy;

LastEnemy.prototype.generateAttacks = function () {

    var attacks = [{ src: 'img/verticaLine.png', width: 10 }, { src: 'img/horizontaLine.png', width: 35 },
    { src: 'img/negativeTriangle.png', width: 30 },
    { src: 'img/positiveTriangle.png', width: 30 }];



    for (i = 0; i < this.numberAttacks; i++) {
        this.img[i] = new Image();
        this.img[i].src = attacks[Math.floor(Math.random() * attacks.length)].src;
        this.arrayAttacks.push(this.img[i]);
    }

    console.log(this.arrayAttacks);
}
LastEnemy.prototype.draw = function () {
    var av = 0;

    this.arrayAttacks.forEach(function (attack) {


        this.ctx.drawImage(attack, this.positionX + av + (this.widthInd / 2), this.positionY - 25, 30, 20);
        av += 32;
    }.bind(this))


    this.ctx.drawImage(this.img, this.positionX, this.positionY, this.widthInd, this.heightInd);

}

LastEnemy.prototype.move = function () {

    this.positionY += this.dy;
}

LastEnemy.prototype.lastBattle = function (enemyType) {
    console.log(enemyType);
    var url = `file:///home/sandra/Escritorio/PROYECT1/${enemyType}`;
    console.log(this.arrayAttacks[0].src);
    console.log(url);

    if (this.arrayAttacks[0].src == url) {
        this.arrayAttacks.shift(this.arrayAttacks[0]);
    }

}

LastEnemy.prototype.isCollision = function () {

    if (this.positionX + this.widthInd >= this.canvas.bat.batPositionX &&
        this.canvas.bat.batPositionX + (this.canvas.bat.batWidth / this.canvas.bat.frames) > this.positionX &&
        (this.heightInd) + this.positionY >= this.canvas.bat.batPositionY - 5) {
        return true
    } else {
        return false;
    }
}

LastEnemy.prototype.drawLevelTwo = function () {

    this.ctx.drawImage(this.imgLevelTwo, 0,0, 830,400);
    
}
