function CanvasDraw(id,canvas) {
    this.charactersCanvas=canvas
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.width = 900;
    this.height = 600;
    this.position = [];
    this.clientCoords = {};
    this.prevX = 0;
    this.currX = 0;
    this.prevY = 0;
    this.currY = 0;
    this.flag = false;
    this.dot_flag = false;
    this.arrayFigureXY = [];
    this.addListener();
}

CanvasDraw.prototype.addListener = function () {


    this.canvas.addEventListener("mousemove", function (e) {

        this.findxy('move', e)
    }.bind(this), false);
    this.canvas.addEventListener("mousedown", function (e) {
        this.findxy('down', e)
    }.bind(this), false);
    this.canvas.addEventListener("mouseup", function (e) {
        this.findxy('up', e)
    }.bind(this), false);
    this.canvas.addEventListener("mouseout", function (e) {
        this.findxy('out', e)
    }.bind(this), false);
}
CanvasDraw.prototype.draw = function () {

    ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(this.prevX, this.prevY);
    ctx.lineTo(this.currX, this.currY);
    ctx.lineWidth = 8;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.shadowBlur = 10;
    ctx.strokeStyle = 'rgb(222, 222, 222 )';
    ctx.shadowColor = 'rgb(241, 241, 241)';
    this.arrayFigureXY.push([this.currX, this.currY]);
    ctx.stroke();
    ctx.closePath();
    ctx.shadowBlur = 0;

}

CanvasDraw.prototype.changeColor = function (color) {

    ctx = this.ctx;
    ctx.beginPath();
    ctx.shadowBlur = 10;
    ctx.strokeStyle = color;
    ctx.shadowColor = color;
    ctx.moveTo(this.arrayFigureXY[0][0], this.arrayFigureXY[0][1]);
    this.arrayFigureXY.forEach(function (currentValues) {
        ctx.lineTo(currentValues[0], currentValues[1]);
    });
    ctx.stroke();
    ctx.closePath();
    ctx.shadowBlur = 0;
    //this.arrayFigureXY.length = 0;
}

CanvasDraw.prototype.clear = function () {
    ctx = this.ctx;
    ctx.shadowBlur = 0;
    this.arrayFigureXY.length = 0;
    ctx.clearRect(0, 0, this.width, this.height);
    this.position.length = 0;
    this.charactersCanvas.bat.drawBat();
}
CanvasDraw.prototype.findxy = function (res, e) {
    ctx = this.ctx;
    if (res == 'down') {
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = e.clientX - this.canvas.offsetLeft;
        this.currY = e.clientY - this.canvas.offsetTop;

        this.flag = true;
        this.dot_flag = true;
        if (this.dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = 'grey';
            ctx.fillRect(this.currX, this.currY, 2, 2);
            ctx.closePath();
            this.dot_flag = false;
        }
    }
    if (res == 'up') {
        this.flag = false;
        if (this.isPositiveTriangle()) {
            this.charactersCanvas.killEnemies('positive');
            this.changeColor('green');
        } else if (this.isNegativeTriangle()) {
            this.charactersCanvas.killEnemies('negative');
            this.changeColor('yellow');
        } else if (this.isVerticalLine()) {
            this.charactersCanvas.killEnemies('vertical');
            this.changeColor('blue');
        } else if (this.isHorizontalLine()) {
            this.charactersCanvas.killEnemies('horizontal');
            this.changeColor('red');
        }
        setTimeout(function () {
            this.clear();
        }.bind(this), 500)


    }
    if (res == 'move') {
        
        if (this.flag) {
            this.prevX = this.currX;
            this.prevY = this.currY;
            this.currX = e.clientX - this.canvas.offsetLeft;
            this.currY = e.clientY - this.canvas.offsetTop;
            var actualx = this.prevX;
            var actualy = this.prevY;
            this.clientCoords = { prevX: actualx, prevY: actualy };
            this.position.push(this.clientCoords);
           
            this.draw();
        }
    }
}
CanvasDraw.prototype.isVerticalLine = function () {

    var arrayInterval = [this.position[this.position.length - 1].prevX - 50, this.position[this.position.length - 1].prevX + 50];

    if (((this.position[0].prevY < this.position[this.position.length - 1].prevY) || (this.position[0].prevY > this.position[this.position.length - 1].prevY))
        && (this.position[0].prevX > arrayInterval[0] && this.position[0].prevX < arrayInterval[1])) return true;

    return false;
}

CanvasDraw.prototype.isHorizontalLine = function () {

    var arrayInterval = [this.position[this.position.length - 1].prevY - 50, this.position[this.position.length - 1].prevY + 50];

    if (((this.position[0].prevX < this.position[this.position.length - 1].prevX) || (this.position[0].prevX > this.position[this.position.length - 1].prevX))
        && (this.position[0].prevY > arrayInterval[0] && this.position[0].prevY < arrayInterval[1])) return true;
    return false;
}

//TRIANGULOS LOS DIBUJA AUNQUE SEAN UNA CURVUTA
CanvasDraw.prototype.isNegativeTriangle = function () {

    var arrayInterval = [this.position[this.position.length - 1].prevY - 50, this.position[this.position.length - 1].prevY + 50];

    if ((this.position[0].prevY > arrayInterval[0] && this.position[0].prevY < arrayInterval[1]) &&
        (this.position[Math.floor(this.position.length / 2)].prevY > this.position[0].prevY &&
            this.position[Math.floor(this.position.length / 2)].prevY > this.position[this.position.length - 1].prevY) &&
        (this.position[Math.floor(this.position.length / 2)].prevX > this.position[0].prevX &&
            this.position[Math.floor(this.position.length / 2)].prevX < this.position[this.position.length - 1].prevX)) return true;

    return false;
}

CanvasDraw.prototype.isPositiveTriangle = function () {

    var arrayInterval = [this.position[this.position.length - 1].prevY - 50, this.position[this.position.length - 1].prevY + 50];

    if ((this.position[0].prevY > arrayInterval[0] && this.position[0].prevY < arrayInterval[1]) &&
        (this.position[Math.floor(this.position.length / 2)].prevY < this.position[0].prevY &&
            this.position[Math.floor(this.position.length / 2)].prevY < this.position[this.position.length - 1].prevY) &&
        (this.position[Math.floor(this.position.length / 2)].prevX > this.position[0].prevX &&
            this.position[Math.floor(this.position.length / 2)].prevX < this.position[this.position.length - 1].prevX)) return true;

    return false;
}