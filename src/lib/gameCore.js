(function(window, document, undefined) {

    var _mainContainer = null,
        _isPlaying = false,
        _assets = null,
        _scene = null,
        _requestAnimFrame =  window.requestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.oRequestAnimationFrame ||
                            window.msRequestAnimationFrame ||
                            function(callback) {
                                window.setTimeout(callback, 1000 / 60);
                            };

    /*
    * Main facade to the game engine
    */
    var GameCore = Object.create(null);

    /*
    * Constructor. Load resources
    */
    GameCore.init = function( config ) {
        _assets = GameCore.AssetsManager.getInstance();
        // config = config;

        // Load background map asset
        if (config.map && config.map.backgroundImage) {
            _assets.queueDownload( config.map.backgroundImage );
        }

        // Load sprite assets
        if (config.sprites) {
            for (var i=0,len=config.sprites.length; i<len; i++) {
                if (config.sprites[i].sprite) _assets.queueDownload( config.sprites[i].sprite );
            }
        }

        // Load player asset
        if (config.player) {
            _assets.queueDownload( config.player.sprite );
        }

        // Once resources are loaded, start game engine
        _assets.downloadAll(function() {
            if (_assets.isDone()) loadConfig( config );
        });
    }

    /*
    * Initialize game objects needded
    */
    function loadConfig( config ) {
        if (!config || !config.map) return;

        // Get main container
        _mainContainer = document.getElementById( config.mainContainer );
        if (!_mainContainer) return GameCore.Logger.error('Cannot find main container');
        _mainContainer.className = 'gcMainContainer';

        // Create current scenet
        _scene =  new GameCore.Scene( _mainContainer, config );
        _mainContainer.style.width = _scene.width + 'px';
        _mainContainer.style.height = _scene.height + 'px';

        begin();
    }

    /*
    * Start rendering the game
    */
    function begin() {
        _isPlaying = true;
        _requestAnimFrame(loop);
    }

    function update() {
        _scene.update();
    }

    function draw() {
        _scene.draw();
    }

    function loop() {
        if (_isPlaying) {
            update();
            draw();
            _requestAnimFrame(loop);
        }
    }

    function randomRange( min, max ) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }

window.GameCore = GameCore;
})(window, document);
