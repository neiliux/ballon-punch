var scoreManager = (function() {
    var score = 0;
    var domElement = document.getElementById('score');

    function addToScore(balloon) {
        score += Math.floor(parseInt((balloon.speed*100) * 10));
        updateScore();
    }

    function removeFromScore(balloon) {
        score -= Math.floor(Math.max(0, (balloon.speed*100) * 5));
        updateScore();
    }

    function updateScore() {
        domElement.textContent = 'Score: ' + score.toString();
    }

    return {
        addToScore: addToScore,
        removeFromScore: removeFromScore
    };
}());