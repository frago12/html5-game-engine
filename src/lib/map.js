(function(GameCore, document, undefined) {

    GameCore.Map = (function() {

        var instance = null,
            map = {
                canvas: null,
                ctx: null,
                background: null,
                width: 0,
                height: 0
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
        ConcreteMap.prototype.create = function( backgroundImage, width, height ) {
            map.canvas = document.createElement('canvas');
            map.canvas.id = "gcMap";
            map.canvas.width = width;
            map.canvas.height = height;

            map.ctx = map.canvas.getContext('2d');
            map.background = backgroundImage;
            map.width = map.canvas.width;
            map.height = map.canvas.height;

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
