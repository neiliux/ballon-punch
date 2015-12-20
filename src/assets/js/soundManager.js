var soundManager = (function() {
    var popIndex = 0;
    var lostIndex = 0;
    var queueLength = 5;
    var popAudio = [];
    var lostAudio = [];

    function initialize() {
        for (var i=0; i<queueLength; i++) {
            popAudio.push(new Audio('assets/audio/balloon-popping.wav'));
            lostAudio.push(new Audio('assets/audio/balloon-water.wav'));
        }
    }

    function playPop() {
        popIndex++;
        if (popIndex >= popAudio.length) {
            popIndex = 0;
        }
        //popAudio[popIndex].play();
    }

    function playLost() {
        lostIndex++;
        if (lostIndex >= lostAudio.length) {
            lostIndex = 0;
        }
        //lostAudio[lostIndex].play();
    }

    return {
        initialize: initialize,
        playPop: playPop,
        playLost: playLost
    }
}());