var game = (function(balloonManager, cloudManager, soundManager) {
    var canvas = document.getElementsByClassName('canvas')[0];
    var maxBalloons = 5;

    function initialize() {
        console.log('init');
        soundManager.initialize();
        cloudManager.initialize(canvas);
        balloonManager.initialize(canvas);
    }

    function start() {
        function render(time) {
            //console.log('render');
            console.log(time);
            balloonManager.moveBalloons();
            cloudManager.moveClouds();
            cloudManager.refreshClouds();

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
}(window.balloonManager, window.cloudManager, window.soundManager));