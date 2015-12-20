var balloonManager = (function(scoreManager, soundManager) {
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
                    balloonRef.isExploding = true;
                    balloonRef.domElement.className += ' exploding';
                    scoreManager.addToScore(balloonRef);
                    soundManager.playPop();

                    setTimeout(function () {
                        balloonRef.active = false;
                        balloonRef.isExploding = false;
                        balloonRef.domElement.top = getCanvasHeight();
                        balloonRef.domElement.style.top = balloon.top + 'px';
                    }, 1000);
                };
            })();

            balloons.push(balloon);
            canvas.appendChild(balloon.domElement);
        }
    }

    function moveBalloons(timestep) {
        activeBalloonsCount = 0;

        for (var i=0; i<balloons.length; i++) {
            var balloon = balloons[i];
            if (balloon.active && !balloon.isExploding) {
                activeBalloonsCount++;

                if (balloon.top < -200) {
                    balloonReset(balloon);
                    scoreManager.removeFromScore(balloon);
                    soundManager.playLost();
                    continue;
                }

                balloon.top -= balloon.speed * timestep;
                //balloon.domElement.style.top = balloon.top + 'px';
            }
        }
    }

    function render() {
        for (var i=0; i<balloons.length; i++) {
            var balloon = balloons[i];
            if (balloon.active && !balloon.isExploding) {
                balloon.domElement.style.top = balloon.top + 'px';
            }
        }
    }

    function getActiveBalloons() {
        return activeBalloonsCount;
    }

    function activateBalloon() {
        for (var i=0; i<balloons.length; i++) {
            if (!balloons[i].active && !balloons[i].isExploding) {
                var balloon = balloons[i];
                balloon.speed = getRandomNumber(8, 15) / 100;
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
        balloon.isExploding = false;
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
        balloon.color =  colorIndex || getRandomNumber(0, 26);
        if (balloon.color <= 5) {
            balloon.domElement.className += ' purple';
        } else if (balloon.color <= 10) {
            balloon.domElement.className += ' orange';
        } else if (balloon.color <= 15) {
            balloon.domElement.className += ' yellow';
        } else if (balloon.color <= 20) {
            balloon.domElement.className += ' red';
        } else if (balloon.color <= 25) {
            balloon.domElement.className += ' green';
        } else {
            balloon.domElement.className += ' blue';
        }
    }

    return {
        initialize: initialize,
        moveBalloons: moveBalloons,
        getActiveBalloons: getActiveBalloons,
        activateBalloon: activateBalloon,
        render: render
    };
}(window.scoreManager, window.soundManager));