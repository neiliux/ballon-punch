var game = (function(balloonManager, cloudManager, soundManager) {
    var canvas = document.getElementsByClassName('canvas')[0];
    var fpsElement = document.getElementById('fps');

    function initialize() {
        soundManager.initialize();
        cloudManager.initialize(canvas);
        balloonManager.initialize(canvas);
    }

    function start() {
        var timestep = 1000 / 60,
            delta = 0,
            lastTimeFrameMs = 0,
            fps = 60,
            frameCount = 0,
            lastFpsUpdate = 0;

        function render(time) {
            delta += time - lastTimeFrameMs;
            lastTimeFrameMs = time;

            while (delta >= timestep) {
                balloonManager.moveBalloons(timestep);
                balloonManager.refreshBalloons();
                cloudManager.moveClouds(timestep);
                cloudManager.refreshClouds(timestep);
                delta -= timestep;
            }

            balloonManager.render();
            cloudManager.render();
            updateFps(time);
            renderFps();

            window.requestAnimationFrame(render);
        }

        function updateFps(time) {
            if (time > lastFpsUpdate + 1000) {
                fps = 0.25 * frameCount + (1 - 0.25) * fps;
                lastFpsUpdate = time;
                frameCount = 0;
            }
            frameCount++;
        }

        function renderFps() {
            fpsElement.innerText = "  FPS: " + Math.round(fps);
        }

        window.requestAnimationFrame(render);
    }

    return {
        initialize: initialize,
        start: start
    };
}(window.balloonManager, window.cloudManager, window.soundManager));