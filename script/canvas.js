function Canvas(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;
    this.width = 900;
    this.height = 600;
    this.bat = new Bat(this.ctx, this.canvas, this.width, this.height,this);
    this.enemies = new Enemy(this.ctx, this.width, this.height);
    this.drawAll();
}

Canvas.prototype.drawAll = function () {
    var idInterval = setInterval(function () {
        this.enemies.draw();
       

    }.bind(this), 1000 / this.fps)
}

Canvas.prototype.killEnemies = function (move) {
   
    switch (move) {
        case 'vertical':
            console.log('vertical');
            break;
        case 'horizontal':
            console.log('hori');
            break;
        case 'positive':
            console.log('pos');
            break;
        case 'negative':
            console.log('neg');
            break;
        default:
            break;
    }
}