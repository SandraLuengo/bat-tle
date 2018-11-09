//separar  //json config


function Canvas(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;
    this.width = 900;
    this.height = 600;
    this.bat = new Bat(this.ctx, this.canvas, this.width, this.height, this);
    this.enemies = [];
    this.enemy = new Enemy(this.canvas, this.ctx, this.width, this.height, 0, 0, this)
    this.framesCounter = 0;
    this.imgBackground = new Image();
    this.mylastEnemy = new LastEnemy(this, this.ctx, this.width, this.height, (this.width / 2) - 60, 0, 'top');
    this.imgBackground.src = 'img/forest3.png';
    this.levelTwo = false;
    this.imgEnd = new Image();
    this.imgEnd.src = 'img/lost.png';
    this.imgWin = new Image();
    this.imgWin.src = 'img/winner.png';
    this.myAudio = new Audio('music/musica_juego.mp3');
    this.init();
}
Canvas.prototype.contentInit = function () {
    if (this.bat.life === 0) {
      
        clearInterval(this.idInterval);

        this.end();
    }
    this.clear();
    this.framesCounter++;

    if (this.framesCounter > 1000) {

        this.framesCounter = 0;
        this.enemy.dx += 0.1;
        this.enemy.dy += 0.1;
    }
    if (this.framesCounter % 110 === 0) {
        this.generateEnemy();
    }

    this.drawAll();

    this.enemies.forEach(function (enemy) { enemy.move(); });

    if (this.isCollision()) {
        this.bat.life -= 1;
    }



}
Canvas.prototype.init = function () {

    this.myAudio.play();

    this.idInterval = setInterval(function () {
        this.contentInit();
    }.bind(this), 1000 / this.fps);


}
Canvas.prototype.end = function () {

    this.framesCounter = 0;
    this.bat.frameIndex = 0;
    this.bat.changeFrames(400, 200, 4, 12, 3, 'img/bat_die.png');
    this.enemies.length = 0;

    var endInterval = setInterval(function () {

        this.framesCounter++;
        this.clear();
        this.drawBackground();
        this.bat.drawBat();

    }.bind(this), 1000 / this.fps);

    setTimeout(function () {
     
        
        clearInterval(endInterval);
        clearInterval(this.idInterval);
        this.backgroundEnd();

    }.bind(this), 400)
}
Canvas.prototype.drawAll = function () {
    this.drawBackground();

    this.bat.drawBat();

    this.enemies.forEach(function (enemy) { enemy.draw() });
}
Canvas.prototype.clear = function () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Canvas.prototype.drawBackground = function () {
    this.ctx.drawImage(this.imgBackground, 0, 0, this.canvas.width, this.canvas.height);

}


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
    this.framesCounter = 0;
    this.bat.changeFrames(600, 160, 6, 40, 5, 'img/attack.png');


    this.enemies.some(function (enemy) {

        if (enemy.imgLineInfo.src === enemyType) {

            enemy.changeFrames(5, 20, 4, 'img/racconndie.png');
        }
    }.bind(this));

    if (this.levelTwo) {
        this.mylastEnemy.lastBattle(enemyType);


    }

    this.setTimeout= setTimeout(function () {

        this.bat.changeFrames(800, 200, 8, 7, 7, 'img/8_bats.png');
        this.enemies = this.enemies.filter(function (enemy) {
            if (enemy.imgLineInfo.src !== enemyType) {

                return true;
            } else {
                this.bat.points++;
              
                if (this.bat.points === 3) {


                    this.mylastEnemy.generateAttacks();
                    this.levelTwo = true;

                    clearInterval(this.idInterval);
                    this.enemies.length = 0;
                    this.clear();
                    this.mylastEnemy.drawLevelTwo();

                    setTimeout(function () {
                        this.clear();

                        this.lastEnemy();

                    }.bind(this), 2000)



                }
                return false;
            }
        }.bind(this))

    }.bind(this), 1000)
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

    return this.enemies.some(function (enemy, i) {
        
        if (enemy.positionX + enemy.raccoonWidth >= this.bat.batPositionX &&
            this.bat.batPositionX + (this.bat.batWidth / this.bat.frames) > enemy.positionX &&
            (enemy.raccoonHeight / enemy.frames) + enemy.positionY >= this.bat.batPositionY - 5) {

            this.framesCounter = 0;

            this.bat.changeFrames(400, 160, 4, 17, 3, 'img/batDamage.png');
            enemy.changeFrames(5, 22, 4, 'img/raccoonAttackDie.png');

            clearInterval(this.idInterval);

            var damageBat = setInterval(function () {
                this.framesCounter++;
                this.clear();
                this.drawBackground();
                this.bat.drawBat();
                this.enemies.forEach(function (enemy) { enemy.draw() });

            }.bind(this), 1000 / this.fps);


            setTimeout(function () {

                clearInterval(damageBat);
                this.idInterval = setInterval(function () {
                    this.contentInit();
                }.bind(this), 1000 / this.fps);
                this.bat.changeFrames(400, 200, 4, 17, 3, 'img/8_bats.png');
                this.enemies.splice(i, 1);

            }.bind(this), 1000);


            return true
        } else {
            return false;
        }
    }.bind(this));
};

Canvas.prototype.lastEnemy = function () {
    this.framesCounter = 0;

    var lastEnemyInterval = setInterval(function () {

        this.framesCounter++;
        this.clear();
        this.drawBackground();

        this.bat.drawBat();
        this.mylastEnemy.draw();
        this.mylastEnemy.move();
        if (this.mylastEnemy.arrayAttacks.length == 0) {
         

            clearInterval(lastEnemyInterval);
            clearInterval(this.idInterval);
            this.clear();
            this.backgroundWin();
        }
        if (this.mylastEnemy.isCollision()) {
            this.end();
            clearInterval(lastEnemyInterval);
            this.backgroundEnd();
        }
    }.bind(this), 1000 / this.fps);
}
Canvas.prototype.backgroundEnd = function () {

    setTimeout(function () {
        this.clear();
        clearTimeout(this.setTimeout);
        this.ctx.drawImage(this.imgEnd, 0, 0, 830, 400);
    }.bind(this), 500)

    setTimeout(function(){
        this.myAudio.pause();
        location.reload();
    }.bind(this),2000)
}
Canvas.prototype.backgroundWin = function () {
   
    setTimeout(function () {
        this.clear();
        clearTimeout(this.setTimeout);
        this.ctx.drawImage(this.imgWin, 0, 0, 830, 400);
    }.bind(this), 500)

    setTimeout(function(){
        this.myAudio.pause();
        location.reload();
    }.bind(this),2000)
}