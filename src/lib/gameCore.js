(function(window, document, undefined) {

    var _mainContainer = null,
        _isPlaying = false,
        // _player = null,
        // _sprites = [],
        // _gameEntities = null,
        // _map = null,
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

        // config.map.width = config.map.width || 400;
        // config.map.height = config.map.height || 400;

        // Get main container
        _mainContainer = document.getElementById( config.mainContainer );
        if (!_mainContainer) return GameCore.Logger.error('Cannot find main container');

        _mainContainer.className = 'gcMainContainer';
        _mainContainer.style.width = config.map.viewport.width + 'px';
        _mainContainer.style.height = config.map.viewport.height + 'px';

        // Create current scenet
        _scene =  new GameCore.Scene( _mainContainer, config );

        // Create Map
        // if (config.map) {
        //     _map = GameCore.Map.getInstance();
        //     var mapCanvas = _map.create( _assets.get(config.map.backgroundImage), config.map );
        //     _mainContainer.appendChild( mapCanvas );
        // }

        // // Create entities canvas
        // _gameEntities = GameCore.EntitiesCanvas.getInstance();
        // _mainContainer.appendChild( _gameEntities.create( config.width, config.height ) );
        //
        // // Create sprites
        // if (config.sprites) {
        //     for (var i=0,len=config.sprites.length; i<len; i++) {
        //         _sprites.push( createPlayer( config.sprites[i] ) );
        //     }
        // }
        //
        // // Set main player
        // if (!config.player) throw new Error('You have to define a player');
        // _player = createPlayer( config.player );
        // _sprites.push( _player );

        begin();
    }

    /*
    * Start rendering the game
    */
    function begin() {
        // _map.draw();
        _isPlaying = true;
        _requestAnimFrame(loop);
    }

    function update() {
        // Clear entities
        // _gameEntities.clear();

        // Update all enemies

        // Update sprites
        // for (var i=0,len=_sprites.length; i<len; i++) {
        //     _sprites[i].update();
        // }

        _scene.update();
    }

    function draw() {
        _scene.draw();

        // Draw sprites
        // for (var i=0,len=_sprites.length; i<len; i++) {
        //     _sprites[i].draw();
        // }
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
