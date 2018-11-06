function Canvas(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;
    this.width = 900;
    this.height = 600;
    this.bat = new Bat(this.ctx, this.canvas, this.width, this.height, this);
    this.enemies = [];
    this.enemy = new Enemy(this.ct, this.width, this.height, 0, 0)
    this.framesCounter = 0;
    this.init();
}

Canvas.prototype.init = function () {
    var idInterval = setInterval(function () {
       this.clear();
        //BUCLE PARA PINTAR ENEMIGOS
        
        this.framesCounter++;

        if (this.framesCounter > 1000) {
            this.framesCounter = 0;
        }
        if (this.framesCounter % 200 === 0) {
            this.generateEnemy();
        }
    this.drawAll()
    this.enemies.forEach(function(enemy) { enemy.move(); });

    }.bind(this), 1000 / this.fps)
}
Canvas.prototype.drawAll = function(){
    this.bat.drawBat();
  //this.bat.draw();
    this.enemies.forEach(function(enemy) { enemy.draw() });
}
Canvas.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Canvas.prototype.killEnemies = function (move) {
    var enemyTipe;
    switch (move) {
        case 'vertical':
            enemyTipe = 'img/verticaLine.png';
            break;
        case 'horizontal':
            enemyTipe = 'img/horizontaLine.png';
            break;
        case 'positive':
            enemyTipe = 'img/positiveTriangle.png';
            break;
        case 'negative':
            enemyTipe = 'img/negativeTriangle.png';
            break;
        default:
            break;
    }
    console.log(enemyTipe)
    this.enemies.some(function (enemy) {
        console.log(this.enemies.length);
        if (enemy.imgLineInfo.src === enemyTipe) {
            this.enemies.pop(enemy);
        }
    }.bind(this))
}
Canvas.prototype.generateEnemy = function () {
    //Math.random()*(max-min+1)+min
    //  debugger;
    var positionX = Math.random() * (this.width - this.enemy.raccoonWidth + 1) + this.enemy.raccoonWidth;
    var positionY = Math.random() * (this.height - this.enemy.raccoonHeight + 1) + this.enemy.raccoonHeight;
    this.enemies.push(new Enemy(this.ctx, this.width, this.height, positionX, positionY));
};