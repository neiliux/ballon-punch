var cloudManager = (function() {
    var maxClouds = 5;
    var clouds = [];
    var canvas;

    function initialize(canvasRef) {
        canvas = canvasRef;

        for (var i=0; i<getRandomNumber(1, maxClouds); i++) {
            createCloud();
        }

        createStaticClouds();
    }

    function moveClouds(delta) {
        clouds.forEach(function(cloud) {
            if (cloud.sleep > 0) {
                cloud.sleep--;
                return;
            }

            cloud.left += cloud.speed * delta;

            if (cloud.left > getMaxWidth() + 20) {
                removeCloud(cloud);
            }
        });
    }

    function render() {
        clouds.forEach(function(cloud) {
            cloud.domElement.style.left = cloud.left + 'px';
        });
    }

    function refreshClouds() {
        if (clouds.length < maxClouds) {
            createCloud();
        }
    }

    function getMaxHeight() {
        return window.innerHeight;
    }

    function getMaxWidth() {
        return window.innerWidth;
    }

    function removeCloud(cloud) {
        if (!cloud) {
            return;
        }
        cloud.domElement.remove();
        clouds.splice(clouds.indexOf(cloud), 1);
    }

    function createStaticClouds() {
        for (var i=0; i<maxClouds; i++) {
            createCloud(true);
        }
    }

    function createCloud(isStaticCloud) {
        var cloud = {
            type: getRandomNumber(1, 2),
            speed: getRandomNumber(5, 15) / 100,
            top: getRandomNumber(50, getMaxHeight()),
            left: isStaticCloud ? getRandomNumber(30, getMaxHeight()) : -300,
            sleep: getRandomNumber(1, 1000),
            domElement: document.createElement('div')
        };

        cloud.domElement.style.className = 'cloud';
        cloud.domElement.style.top = cloud.top + 'px';
        cloud.domElement.style.left = cloud.left + 'px';

        if (cloud.type === 1) {
            cloud.domElement.className += ' cloud1';
        } else {
            cloud.domElement.className += ' cloud2';
        }

        if (!isStaticCloud) {
            clouds.push(cloud);
        }

        canvas.appendChild(cloud.domElement);
    }

    function activeCloudCount() {
        return clouds.length;
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return {
        initialize: initialize,
        moveClouds: moveClouds,
        activeCloudCount: activeCloudCount,
        refreshClouds: refreshClouds,
        render: render
    };
}());