window.onload = function () {

    
    //canvas.init();

    document.getElementById("start-button").onclick = function () {
        document.querySelector('#start-button').style.display='none';
        startGame();
       
    };

    function startGame() {
        var canvas = new Canvas("myCanvas");
        var canvasDraw = new CanvasDraw("myCanvasDraw",canvas);

    }
};
