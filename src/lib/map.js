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
        leftLimit: 0,

        viewport: {}
    };

    /*
    * Concrete object constructor
    */
    function Map( config ) {
        if (!config.viewport) {
            config.viewport = {
                width: config.width,
                height: config.height
            };
        }

        // Create canvas
        map.canvas = document.createElement('canvas');
        map.canvas.id = "gcMap";
        map.canvas.width = config.viewport.width;
        map.canvas.height = config.viewport.height

        this.width = config.width;
        this.height = config.height;

        // Get canvas context
        map.ctx = map.canvas.getContext('2d');

        // Set backgroundImage
        map.background = GameCore.AssetsManager.getInstance().get( config.backgroundImage );

        // Set Map limits
        if (!config.limits) config.limits = {};
        map.topLimit = config.limits.top || 0;
        map.rightLimit = config.limits.right || this.width;
        map.bottomLimit = config.limits.bottom || this.height;
        map.leftLimit = config.limits.left || 0;

        // Set map viewport
        map.viewport.width = config.viewport.width || this.width;
        map.viewport.height = config.viewport.height || this.height;
    }

    /*
    * Draw map in the canvas
    */
    Map.prototype.draw = function( xView, yView ) {
        if (!map.ctx) return;

        var sx, sy, dx, dy;
        var sWidth, sHeight, dWidth, dHeight;

        sx = xView;
        sy = yView;

        // Dimensions of the cropped image
        sWidth = map.viewport.width;
        sHeight = map.viewport.height;

        if(this.width - sx <= sWidth) {
            sWidth = this.width - sx;
        }
        if(this.height - sy <= sHeight){
            sHeight = this.height - sy;
        }

        // Location on canvas to draw the cropped image
        dx = 0;
        dy = 0;

        // match destination with source to not scale the image
        dWidth = sWidth;
        dHeight = sHeight;

        // console.log( sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight );

        map.ctx.drawImage(map.background, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    };

    /*
    * Draw sprite on canvas
    */
    Map.prototype.drawSprite = function( scope, xView, yView, callback ) {
        callback.call(scope, map.ctx, xView, yView);
    };

    /*
    * Determine if the object passed has reached the one the bounds of the map
    */
    Map.prototype.outOfBounds = function(x, y, width, height) {
        var newBottomY = y + height,
            newTopY = y,
            newRightX = x + width,
            newLeftX = x;;

        return newBottomY > map.bottomLimit ||
            newTopY < map.topLimit ||
            newRightX > map.rightLimit ||
            newLeftX < map.leftLimit;
    }

    /*
    * Returns canvas element
    */
    Map.prototype.getElement = function() {
        return map.canvas;
    };

    /*
    * Returns viewport dimensions
    */
    Map.prototype.getViewport = function() {
        return { width:map.canvas.width, height:map.canvas.height };
    }

    /*
    * Returns the limits of the map
    */
    Map.prototype.getLimits = function() {
        return { top:map.topLimit, right:map.rightLimit, bottom:map.bottomLimit, left:map.leftLimit };
    }

    /*
    * Clear map from the canvas
    */
    Map.prototype.clear = function() {
        map.ctx.clearRect(0, 0, this.width, this.height);
    };

GameCore.Map = Map;
})(GameCore, document);
