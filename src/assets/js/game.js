var game = (function(balloonManager) {
    var canvas = document.getElementsByClassName('canvas')[0];
    var maxBalloons = 5;

    function initialize() {
        console.log('init');
        balloonManager.initialize(canvas);
    }

    function start() {
        function render() {
            console.log('render');
            balloonManager.moveBalloons();

            if (balloonManager.getActiveBalloons() < maxBalloons) {
                balloonManager.activateBalloon();
            }

            window.requestAnimationFrame(render);
        }

        render();
    }

    return {
        initialize: initialize,
        start: start
    };
}(window.balloonManager));