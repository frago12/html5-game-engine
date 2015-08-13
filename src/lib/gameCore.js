(function(window, document, undefined) {

    var _mainContainer = null,
        _isPlaying = false,
        _player = null,
        _sprites = [],
        _gameEntities = null,
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

        // Load background map asset
        if (_config.map && _config.map.backgroundImage) {
            _assets.queueDownload( _config.map.backgroundImage );
        }

        // Load sprite assets
        if (_config.sprites) {
            for (var i=0,len=_config.sprites.length; i<len; i++) {
                if (_config.sprites[i].sprite) _assets.queueDownload( _config.sprites[i].sprite );
            }
        }

        // Load player asset
        if (_config.player) {
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
        if (!_config || !_config.map) return;

        _config.width = _config.map.width = _config.map.width || 400;
        _config.height = _config.map.height = _config.map.height || 400;

        // Get main container
        _mainContainer = document.getElementById( _config.mainContainer );
        if (!_mainContainer) return GameCore.Logger.error('Cannot find main container');

        _mainContainer.className = 'gcMainContainer';
        _mainContainer.style.width = _config.width + 'px';
        _mainContainer.style.height = _config.height + 'px';

        // Create Map
        if (_config.map) {
            _map = GameCore.Map.getInstance();
            var mapCanvas = _map.create( _assets.get(_config.map.backgroundImage), _config.map );
            _mainContainer.appendChild( mapCanvas );
        }

        // Create entities canvas
        _gameEntities = GameCore.EntitiesCanvas.getInstance();
        _mainContainer.appendChild( _gameEntities.create( _config.width, _config.height ) );

        // Create sprites
        if (_config.sprites) {
            for (var i=0,len=_config.sprites.length; i<len; i++) {
                _sprites.push( createPlayer( _config.sprites[i] ) );
            }
        }

        // Set main player
        if (!_config.player) throw new Error('You have to define a player');
        _player = createPlayer( _config.player );
        _sprites.push( _player );

        // Register events
        if (_config.events && _config.events.keypress) document.addEventListener('keydown', function(e) { checkKey(e); }, false);

        begin();
    }

    function createPlayer( config ) {
        var player = new GameCore.Sprite( _assets.get(config.sprite), config );
        if (config.onKeyPress) player.onKeyPress = config.onKeyPress;

        return player;
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
        _gameEntities.clear();

        // Update all enemies

        // Update sprites
        for (var i=0,len=_sprites.length; i<len; i++) {
            _sprites[i].update();
        }
    }

    function draw() {
        // Draw sprites
        for (var i=0,len=_sprites.length; i<len; i++) {
            _sprites[i].draw();
        }
    }

    function loop() {
        if (_isPlaying) {
            update();
            draw();
            _requestAnimFrame(loop);
        }
    }

    function checkKey(e) {
        e.preventDefault();

        var key = e.code || e.which,
            keyInfo = { code:key };

        // Up arrow
        if (key === 37) {
            keyInfo.direction = 'left';
            keyInfo.left = true;

        // Up arrow
        } else if (key === 38) {
            keyInfo.direction = 'top';
            keyInfo.top = true;

        // Down arrow
        } else if (key === 39) {
            keyInfo.direction = 'right';
            keyInfo.right = true;

        // Left key
    } else if (key === 40) {
            keyInfo.direction = 'bottom';
            keyInfo.bottom = true;

        // Spacebar
        } else if (key === 32) {
            keyInfo.direction = 'spacebar';
            keyInfo.spacebar = true;
        }

        _player.onKeyPress(keyInfo);
    }

    function randomRange( min, max ) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }

window.GameCore = GameCore;
})(window, document);
