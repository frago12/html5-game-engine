(function(window, document, undefined) {

    var _mainContainer = null,
        _isPlaying = false,
        _player = null,
        _entitiesCanvas = null,
        _map = null,
        _assets = null,
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
        _assets = new GameCore.AssetsManager();
        _config = config;

        if (_config.map && _config.map.backgroundImage) {
            _assets.queueDownload( _config.map.backgroundImage );
        }

        if (_config.player && _config.player.sprite) {
            _assets.queueDownload( _config.player.sprite );
        }

        // Once resources are loaded, start game engine
        _assets.downloadAll(function() {
            if (_assets.isDone()) loadConfig();
        });
    }

    /*
    * Initialize game objects needded
    */
    function loadConfig() {
        if (!_config) return;

        _config.width = _config.width || 400;
        _config.height = _config.height || 400;

        // Get main container
        _mainContainer = document.getElementById( _config.mainContainer );
        if (!_mainContainer) return GameCore.Logger.error('Cannot find main container');

        _mainContainer.className = 'gcMainContainer';
        _mainContainer.style.width = _config.width + 'px';
        _mainContainer.style.height = _config.height + 'px';

        // Create Map
        if (_config.map) {
            _map = GameCore.Map.getInstance();
            var mapCanvas =_map.create( _assets.get(_config.map.backgroundImage), _config.width, _config.height );
            _mainContainer.appendChild( mapCanvas );
        }

        // Create entities canvas
        _entitiesCanvas = GameCore.EntitiesCanvas.getInstance().create( _config.width, _config.height );
        _mainContainer.appendChild( _entitiesCanvas );

        // Create Player
        if (_config.player) {
            _player = new GameCore.Player(_config.player.name, _config.player.width, _config.player.height, _config.player.srcX, _config.player.srcY);
            _player.setAsset( _assets.get(_config.player.sprite) );
        }

        begin();
    }

    /*
    * Start rendering the game
    */
    function begin() {
        _map.draw();
        _isPlaying = true;
        _requestAnimFrame(loop);
    }

    function update() {
        // Clear entities
        // Update all enemies
        _player.update();
    }

    function draw() {
        // Draw all enemies
        _player.draw();
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
