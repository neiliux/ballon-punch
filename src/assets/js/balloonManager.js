var balloonManager = (function() {
    var balloons = [];
    var activeBalloonsCount = 0;
    var maxBalloonWidth = 100;

    function initialize(canvas) {
        console.log('bm init');
        for (var i=0; i<30; i++) {
            var balloon = {
                id: i,
                top: getCanvasHeight(),
                left: 0,
                color: getRandomNumber(0, 15),
                speed: getRandomNumber(1, 5),
                domElement: document.createElement("div"),
                active: false
            };

            balloon.domElement.className = 'balloon';
            balloon.domElement.style.top = balloon.top + 'px';
            setColor(balloon);

            (function() {
                var balloonRef = balloon;

                balloonRef.domElement.onclick = function() {
                    balloonRef.active = false;
                    balloonRef.domElement.top = getCanvasHeight();
                };
            })();

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
                    continue;
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
                balloon.domElement.className = 'balloon';
                setColor(balloon);
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

    function setColor(balloon, colorIndex) {
        balloon.color =  colorIndex || getRandomNumber(0, 15);
        if (balloon.color <= 5) {
            balloon.domElement.className += ' blue';
        } else if (balloon.color <= 10) {
            balloon.domElement.className += ' red';
        } else {
            balloon.domElement.className += ' yellow';
        }
    }

    return {
        initialize: initialize,
        moveBalloons: moveBalloons,
        getActiveBalloons: getActiveBalloons,
        activateBalloon: activateBalloon
    };
}());