var scoreManager = (function() {
    var score = 0;
    var domElement = document.getElementById('score');

    function addToScore(balloon) {
        score += parseInt(balloon.speed * 10);
        updateScore();
    }

    function removeFromScore(balloon) {
        //score -= parseInt(balloon.speed * 20);
        //updateScore();
    }

    function updateScore() {
        domElement.textContent = 'Score: ' + score.toString();
    }

    return {
        addToScore: addToScore,
        removeFromScore: removeFromScore
    };
}());