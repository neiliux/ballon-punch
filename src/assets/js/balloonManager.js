var balloonManager = (function() {
    var balloons = [];
    var activeBalloonsCount = 0;
    var maxBalloonWidth = 100;
    var balloonHeight = 100;

    function initialize(canvas) {
        console.log('bm init');
        for (var i=0; i<30; i++) {
            var balloon = {
                id: i,
                top: getCanvasHeight(),
                left: 0,
                color: 1,
                speed: 0.5,
                domElement: document.createElement("div"),
                active: false
            };

            balloon.domElement.className = 'balloon';
            balloon.domElement.setAttribute('balloon-id', balloon.id.toString());
            balloon.domElement.style.top = balloon.top + 'px';
            balloon.domElement.onclick = function() {
                var balloon = balloons[parseInt(this.getAttribute('balloon-id'))];
                balloon.active = false;
                balloon.domElement.top = getCanvasHeight();
                console.log('b');
            };

            balloons.push(balloon);

            canvas.appendChild(balloon.domElement);
        }
    }

    function moveBalloons() {
        activeBalloonsCount = 0;

        for (var i=0; i<balloons.length; i++) {
            var balloon = balloons[i];
            if (balloon.active) {
                activeBalloonsCount++;

                if (balloon.top < -10) {
                    balloonReset(balloon);
                }

                balloon.top -= balloon.speed;
                balloon.domElement.style.top = balloon.top + 'px';
            }
        }
    }

    function getActiveBalloons() {
        return activeBalloonsCount;
    }

    function activateBalloon() {
        for (var i=0; i<balloons.length; i++) {
            if (!balloons[i].active) {
                var balloon = balloons[i];
                balloon.speed = getRandomNumber(1, 5);
                balloon.active = true;
                balloon.top = getCanvasHeight();
                balloon.left = getStartingLeftPosition();
                balloon.domElement.style.top = balloon.top + 'px';
                balloon.domElement.style.left = balloon.left + 'px';
                return;
            }
        }
    }

    function balloonReset(balloon) {
        balloon.active = false;
        activeBalloonsCount--;
    }

    function getCanvasHeight() {
        return window.innerHeight;
    }

    function getStartingLeftPosition() {
        var max = window.innerWidth-maxBalloonWidth;
        return Math.floor(Math.random() * (max + 1));
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return {
        initialize: initialize,
        moveBalloons: moveBalloons,
        getActiveBalloons: getActiveBalloons,
        activateBalloon: activateBalloon
    };
}());