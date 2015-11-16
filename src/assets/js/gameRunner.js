(function(game) {
    if (window.PhoneGap || window.cordova) {
        document.addEventListener('deviceready', bootstrap, false);
    } else {
        bootstrap();
    }

    function bootstrap() {
        console.log('bootstrap');
        rafPollyfill();
        console.log('poly');

        document.addEventListener('DOMContentLoaded', function() {
            if (window.FastClick) {
                console.log('Invoking fast click');
                window.FastClick.attach(document.body);
            }
        }, false);

        console.log('starting');

        game.initialize();
        game.start();
    }

    function rafPollyfill() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
                || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                        callback(currTime + timeToCall);
                    },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
    }
}(window.game));
