function Canvas(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;
    this.width = 900;
    this.height = 600;
    this.bat = new Bat(this.ctx, this.canvas, this.width, this.height, this);
    this.enemies = [];
    this.framesCounter = 0;
    this.drawAll();
}

Canvas.prototype.drawAll = function () {
    var idInterval = setInterval(function () {
        //BUCLE PARA PINTAR ENEMIGOS
        if (this.enemies.length > 0) {
            this.enemies.forEach(function (enemy) {
               
                enemy.draw();
            })

        }
        this.framesCounter++;

        if (this.framesCounter > 1000) {
            this.framesCounter = 0;
        }
        if (this.framesCounter % 250 === 0) {
            this.generateObstacle();
        }

    }.bind(this), 1000 / this.fps)
}

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
    this.enemies.forEach(function (enemy) {

        if (enemy.imgLineInfo.src === enemyTipe) {
            console.log('MATO!');

            this.enemies.pop(enemy)
        }
    }.bind(this))
}
Canvas.prototype.generateObstacle = function () {
    this.enemies.push(new Enemy(this.ctx, this.width, this.height, Math.random() * this.width - 200, Math.random() * this.height - 50));
};