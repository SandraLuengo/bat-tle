//separar  //json config


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
        this.framesCounter++;

        if (this.framesCounter > 1000) {

            this.framesCounter = 0;
            this.enemy.dx += 0.1;
            this.enemy.dy += 0.1;

            //console.log(this.enemy.dx)
        }
        if (this.framesCounter % 100 === 0) {
            this.generateEnemy();
        }

        this.drawAll();

        this.enemies.forEach(function (enemy) { enemy.move(); });

        if (this.isCollision()) {

            this.bat.life -= 1;
        }

        if (this.bat.life === 0) {
            clearInterval(idInterval)
            alert('muerto');
        }

    }.bind(this), 1000 / this.fps);


}
Canvas.prototype.drawAll = function () {

    this.bat.drawBat();
    this.enemies.forEach(function (enemy) { enemy.draw() });
}
Canvas.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Canvas.prototype.killEnemies = function (move) {
    var enemyType;
    switch (move) {
        case 'vertical':
            enemyType = 'img/verticaLine.png';
            break;
        case 'horizontal':
            enemyType = 'img/horizontaLine.png';
            break;
        case 'positive':
            enemyType = 'img/positiveTriangle.png';
            break;
        case 'negative':
            enemyType = 'img/negativeTriangle.png';
            break;
        default:
            break;
    }

    this.enemies = this.enemies.filter(function (enemy) {
        // debugger

        if (enemy.imgLineInfo.src !== enemyType) {

            return true;
        } else {
            return false;
        }
    }.bind(this))
}
Canvas.prototype.generateEnemy = function () {

    var posiblePositions = [
        {
            type: 'top',
            x: Math.random() * (630 - 200 + 1) + 200,
            y: Math.random() * (-110 - (-100) + 1) + (-100)

        },
        {
            type: 'right',
            x: Math.random() * (-110 - (-100) + 1) + (-100),
            y: Math.random() * (150 - 100 + 1) + 100

        },
        {
            type: 'left',
            x: Math.random() * (1030 - 930 + 1) + 930,
            y: Math.random() * (150 - 100 + 1) + 100

        }
    ]
    var i = Math.floor(Math.random() * posiblePositions.length);

    //poner asi cuando sean muchas lineas

    this.enemies.push(
        new Enemy(
            this,
            this.ctx,
            this.width,
            this.height,
            posiblePositions[i].x,
            posiblePositions[i].y,
            posiblePositions[i].type)
    );
};

Canvas.prototype.isCollision = function () {

    // colisiones genéricas 
    // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
    return this.enemies.some(function (enemy, i) {
        //debugger
        if (enemy.positionX + enemy.raccoonWidth >= this.bat.batPositionX &&
            this.bat.batPositionX + this.bat.batWidth > enemy.positionX &&
            enemy.raccoonHeight + enemy.positionY >= this.bat.batPositionY + 25) {
            this.enemies.splice(i, 1);
            return true
        } else {
            return false;
        }
    }.bind(this));
};