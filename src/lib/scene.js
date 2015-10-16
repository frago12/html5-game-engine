(function(GameCore, undefined) {

    var _container = null
        _map = null,
        _player = null,
        _obstacles = [],
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

        // Create obstacles
        createObstacles( config.obstacles );

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
        _player.isColliding = collisionDetection;
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
    * Create obstacles in the map
    */
    function createObstacles( obstacles ) {
        var i = 0,
            len = obstacles.length;

        for (; i<len; i++) {
            var obs = obstacles[i];
            _obstacles.push( new GameCore.Obstacle( obs.x, obs.y, obs.width, obs.height, obs.detectCollision ) );
        }
    }

    /*
    * Determine if coordinates passed collide with an element of scene
    */
    function collisionDetection(x, y) {
        var collision = {
            type: '',
            object: null
        };

        // Check out of bounds
        if (_map.outOfBounds( x, y, _player.width, _player.height )) {
            collision.type = 'outOfBounds';
            return collision;
        }

        // Check obstacles
        var centerX = x + (_player.width / 2),
            centerY = y + (_player.height / 2);

        for (var i=0,len=_obstacles.length; i<len; i++) {
            var obs = _obstacles[i];
            if (obs.detectCollision( centerX, centerY )) {
                collision.type = 'obstacle';
                collision.object = obs;
                return collision;
            }
        }

        // Check enemies

        // Chekc objects

        return false;
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
