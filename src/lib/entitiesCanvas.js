(function(GameCore, document, undefined) {

    GameCore.EntitiesCanvas = (function() {

        var instance = null,
            prop = {
                canvas: null,
                ctx: null,
                background: null,
                width: 0,
                height: 0
            };

        /*
        * Concrete object constructor
        */
        function ConcreteEntitiesCanvas() {
            prop.canvas = null;
            prop.ctx = null;
        }

        /*
        * Store the reference to the canvas element the properties needed
        */
        ConcreteEntitiesCanvas.prototype.create = function( width, height ) {
            prop.canvas = document.createElement('canvas');
            prop.canvas.id = "gcEntities";
            prop.canvas.width = width;
            prop.canvas.height = height;

            prop.ctx = prop.canvas.getContext('2d');
            prop.width = prop.canvas.width;
            prop.height = prop.canvas.height;

            return prop.canvas;
        };

        /*
        * Draw map in the canvas
        */
        ConcreteEntitiesCanvas.prototype.draw = function( sprite, startX, startY, width, height, x, y ) {
            if (!prop.ctx) return;
            prop.ctx.drawImage(sprite, startX, startY, width, height, x, y, width, height);
        };

        /*
        * Clear map from the canvas
        */
        ConcreteEntitiesCanvas.prototype.clear = function() {
            prop.ctx.clearRect(0, 0, prop.width, prop.height);
        };

        return {
            getInstance: function() {
                if (!instance) {
                    instance = new ConcreteEntitiesCanvas();
                }

                return instance
            }
        };

    })();

})(GameCore, document);
