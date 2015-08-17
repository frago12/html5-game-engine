(function(GameCore, undefined) {

    var _container = null
        _map = null,
        _player = null,
        _camera = null;

    /*
    * Constructor
    */
    function Scene( container, config ) {
        _container = container;

        // Create map
        createMap( config.map );
        this.width = _map.getViewport().width;
        this.height = _map.getViewport().height;

        // Create player
        createPlayer( config.player );

        // Create camera
        if (config.map.viewport) {
            _camera = new GameCore.Camera( 0, 0, config.map.viewport.width, config.map.viewport.height, _map.width, _map.height );
            _camera.follow( _player, config.map.viewport.width/2, config.map.viewport.height/2 );
        }

        // Register events
        if (config.events && config.events.keypress) {
            document.addEventListener('keydown', onKeyDown, false);
            document.addEventListener('keyup', onKeyUp, false);
        }
    }

    var s = Scene.prototype;

    /*
    * Draw elements of the scene
    */
    s.draw = function() {
        _map.clear();

        _map.draw( _camera.xView, _camera.yView );
        _map.drawSprite( _player, _camera.xView, _camera.yView, _player.draw );
    }

    /*
    * Update elements of the scene
    */
    s.update = function() {
        _player.update();
        _camera.update();
    }

    /*
    * @private
    *
    * Create a player on the scene
    */
    function createPlayer( config ) {
        if (!config) return;

        _player = new GameCore.Sprite( config );
        if (config.update) _player.update = config.update;

        _player.setMapLimits( _map.getLimits() );
    }

    /*
    * @private
    *
    * Create map of the scene
    */
    function createMap( config ) {
        if (!config) return;

        _map = new GameCore.Map( config );
        _container.appendChild( _map.getElement() );
    }

    /*
    * @private
    *
    * On key down event
    */
    function onKeyDown(e) {
        e.preventDefault();
        var key = e.code || e.which;

        if (key === 37) {
            _player.controls.left = true;
        } else if (key === 38) {
            _player.controls.up = true;
        } else if (key === 39) {
            _player.controls.right = true;
        } else if (key === 40) {
            _player.controls.down = true;
        } else if (key === 32) {
            _player.controls.spacebar = true;
        }

        _player.controls.key = key;
    }

    /*
    * @private
    *
    * On key up
    */
    function onKeyUp(e) {
        e.preventDefault();
        var key = e.code || e.which;

        if (key === 37) {
            _player.controls.left = false;
        } else if (key === 38) {
            _player.controls.up = false;
        } else if (key === 39) {
            _player.controls.right = false;
        } else if (key === 40) {
            _player.controls.down = false;
        } else if (key === 32) {
            _player.controls.spacebar = false;
        }

        _player.controls.key = false;
    }

GameCore.Scene = Scene;
})(GameCore)
