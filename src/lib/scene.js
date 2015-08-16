(function(GameCore, undefined) {

    var _container = null
        _map = null,
        _player = null;

    /*
    * Constructor
    */
    function Scene( container, config ) {
        _container = container;

        createMap( config.map );
        createPlayer( config.player );

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

        _map.draw();
        _map.drawSprite( _player, _player.draw );
        // _player.draw( _map.getContext() );
    }

    /*
    * Update elements of the scene
    */
    s.update = function() {
        _player.update();
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
