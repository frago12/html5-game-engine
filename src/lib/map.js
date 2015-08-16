(function(GameCore, document, undefined) {

    var map = {
        canvas: null,
        ctx: null,
        background: null,
        width: 0,
        height: 0,
        topLimit: 0,
        rightLimit: 0,
        bottomLimit: 0,
        LeftLimit: 0
    };

    /*
    * Concrete object constructor
    */
    function Map( config ) {
        // Create canvas
        map.canvas = document.createElement('canvas');
        map.canvas.id = "gcMap";
        map.width = map.canvas.width = config.width;
        map.height = map.canvas.height = config.height;

        // Get canvas context
        map.ctx = map.canvas.getContext('2d');

        // Set backgroundImage
        map.background = GameCore.AssetsManager.getInstance().get( config.backgroundImage );

        // Set Map limits
        if (config.limits) {
            map.topLimit = config.limits.top || 0;
            map.rightLimit = config.limits.right || 0;
            map.bottomLimit = config.limits.bottom || 0;
            map.LeftLimit = config.limits.left || 0;
        }
    }

    /*
    * Draw map in the canvas
    */
    Map.prototype.draw = function() {
        if (!map.ctx) return;
        map.ctx.drawImage(map.background, 0, 0, map.width, map.height, 0, 0, map.width, map.height);
    };

    /*
    * Draw sprite on canvas
    */
    Map.prototype.drawSprite = function( context, callback ) {
        callback.call(context, map.ctx);
    };

    /*
    * Determine if the object passed has reached the one the bounds of the map
    */
    Map.prototype.outOfBounds = function(obj, x, y) {
        var newBottomY = y + obj.height,
            newTopY = y,
            newRightX = x + obj.width,
            newLeftX = x;

        return newBottomY > map.bottomLimit ||
            newTopY < map.topLimit ||
            newRightX > map.rightLimit ||
            newLeftX < map.LeftLimit;
    }

    /*
    * Returns canvas element
    */
    Map.prototype.getElement = function() {
        return map.canvas;
    };

    /*
    * Clear map from the canvas
    */
    Map.prototype.clear = function() {
        map.ctx.clearRect(0, 0, map.width, map.height);
    };

GameCore.Map = Map;
})(GameCore, document);
