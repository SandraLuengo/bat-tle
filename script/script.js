window.onload = function () {

    
    //canvas.init();

    document.getElementById("start-button").onclick = function () {
        startGame();
       
    };

    function startGame() {
        var canvas = new Canvas("myCanvas");
        var canvasDraw = new CanvasDraw("myCanvasDraw",canvas);

    }
};
