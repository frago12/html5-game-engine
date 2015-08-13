(function(GameCore, document, undefined) {

    GameCore.Map = (function() {

        var instance = null,
            map = {
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
        function ConcreteMap() {
            map.canvas = null;
            map.ctx = null;
        }

        /*
        * Store the reference to the canvas element the properties needed
        */
        ConcreteMap.prototype.create = function( backgroundImage, userMap ) {
            map.canvas = document.createElement('canvas');
            map.canvas.id = "gcMap";
            map.width = map.canvas.width = userMap.width;
            map.height = map.canvas.height = userMap.height;

            map.ctx = map.canvas.getContext('2d');
            map.background = backgroundImage;

            if (userMap.limits) {
                map.topLimit = userMap.limits.top || 0;
                map.rightLimit = userMap.limits.right || 0;
                map.bottomLimit = userMap.limits.bottom || 0;
                map.LeftLimit = userMap.limits.left || 0;
            }

            return map.canvas;
        };

        /*
        * Draw map in the canvas
        */
        ConcreteMap.prototype.draw = function() {
            if (!map.ctx) return;
            map.ctx.drawImage(map.background, 0, 0, map.width, map.height, 0, 0, map.width, map.height);
        };

        /*
        * Determine if the object passed has reached the one the bounds of the map
        */
        ConcreteMap.prototype.outOfBounds = function(obj, x, y) {
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
        * Clear map from the canvas
        */
        ConcreteMap.prototype.clear = function() {
            map.ctx.clearRect(0, 0, map.width, map.height);
        };

        return {
            getInstance: function() {
                if (!instance) {
                    instance = new ConcreteMap();
                }

                return instance
            }
        };

    })();

})(GameCore, document);
