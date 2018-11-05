function Canvas(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;
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
}

Canvas.prototype.init = function () {

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

Canvas.prototype.draw = function () {
    ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(this.prevX, this.prevY);
    ctx.lineTo(this.currX, this.currY);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.closePath();
}

Canvas.prototype.clear = function () {
    ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    this.position.length = 0;
}
Canvas.prototype.findxy = function (res, e) {
    ctx = this.ctx;
    if (res == 'down') {
        console.log('pincho el raton');
        this.prevX = this.currX;
        this.prevY = this.currY;
        this.currX = e.clientX - this.canvas.offsetLeft;
        this.currY = e.clientY - this.canvas.offsetTop;

        this.flag = true;
        this.dot_flag = true;
        if (this.dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.currX, this.currY, 2, 2);
            ctx.closePath();
            this.dot_flag = false;
        }
    }
    if (res == 'up') {
        console.log('levanto el dedo del raton');
        this.flag = false;
        if (this.isPositiveTriangle()) {
            console.log('POSITIVE TRIANGLE');
        } else if (this.isNegativeTriangle()) {
            console.log('NEGATIVE TRIANGLE');
        } else if (this.isVerticalLine()) {
            console.log('VERTICAL LINE');
        } else if (this.isHorizontalLine()) {
            console.log('HORIZONTAL LINE');
        }

        this.clear();
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
Canvas.prototype.isVerticalLine = function () {

    var arrayInterval = [this.position[this.position.length - 1].prevX - 50, this.position[this.position.length - 1].prevX + 50];

    if (((this.position[0].prevY < this.position[this.position.length - 1].prevY) || (this.position[0].prevY > this.position[this.position.length - 1].prevY))
        && (this.position[0].prevX > arrayInterval[0] && this.position[0].prevX < arrayInterval[1])) return true;

    return false;
}

Canvas.prototype.isHorizontalLine = function () {

    var arrayInterval = [this.position[this.position.length - 1].prevY - 50, this.position[this.position.length - 1].prevY + 50];

    if (((this.position[0].prevX < this.position[this.position.length - 1].prevX) || (this.position[0].prevX > this.position[this.position.length - 1].prevX)) 
    && (this.position[0].prevY > arrayInterval[0] && this.position[0].prevY < arrayInterval[1])) return true;
    return false;
}


Canvas.prototype.isNegativeTriangle = function () {

    var arrayInterval = [this.position[this.position.length - 1].prevY - 50, this.position[this.position.length - 1].prevY + 50];

    if ((this.position[0].prevY > arrayInterval[0] && this.position[0].prevY < arrayInterval[1]) && 
    (this.position[Math.floor(this.position.length / 2)].prevY > this.position[0].prevY && 
    this.position[Math.floor(this.position.length / 2)].prevY > this.position[this.position.length - 1].prevY) && 
    (this.position[Math.floor(this.position.length / 2)].prevX > this.position[0].prevX && 
    this.position[Math.floor(this.position.length / 2)].prevX <  this.position[this.position.length - 1].prevX)) return true;

    return false;
}

Canvas.prototype.isPositiveTriangle = function () {


    var arrayInterval = [this.position[this.position.length - 1].prevY - 50, this.position[this.position.length - 1].prevY + 50];

    if ((this.position[0].prevY > arrayInterval[0] && this.position[0].prevY < arrayInterval[1]) && 
    (this.position[Math.floor(this.position.length / 2)].prevY < this.position[0].prevY && 
    this.position[Math.floor(this.position.length / 2)].prevY < this.position[this.position.length - 1].prevY) && 
    (this.position[Math.floor(this.position.length / 2)].prevX > this.position[0].prevX && 
    this.position[Math.floor(this.position.length / 2)].prevX <  this.position[this.position.length - 1].prevX)) return true;

    return false;
}
