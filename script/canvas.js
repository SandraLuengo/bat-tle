function Canvas(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;
    this.width = 900;
    this.height = 600;
    this.bat = new Bat(this.ctx, this.canvas, this.width, this.height, this);
    this.enemies = [new Enemy(this.ctx, this.width, this.height)];
    this.drawAll();
}

Canvas.prototype.drawAll = function () {
    var idInterval = setInterval(function () {
        //BUCLE PARA PINTAR ENEMIGOS
        if(this.enemies.length>0){
            this.enemies[0].draw();
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
            enemyTipe = 'img/negativeTriangle.png';
            break;
        case 'negative':
            enemyTipe = 'img/positiveTriangle.png';
            break;
        default:
            break;
    }
    this.enemies.forEach(function (enemy) {
        console.log(enemy.imgLineInfo.src)
        console.log(enemyTipe)
        if(enemy.imgLineInfo.src===enemyTipe){
            console.log('mato');
            
            this.enemies.pop(enemy)
        }
    }.bind(this))
}