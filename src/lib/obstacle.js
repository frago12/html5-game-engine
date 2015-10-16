(function(GameCore, undefined) {

    /*
    * Constructor
    */
    function Obstacle( x, y, width, height, detectCollisionCallback ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.left = this.x;
        this.right = this.x + this.width;
        this.top = this.y;
        this.bottom = this.y + this.height;

        if (detectCollisionCallback) {
            this.detectCollision = detectCollisionCallback;
        }
    }

    /*
    * Verify if the coordinates provided collide with the obstacle itself
    */
    Obstacle.prototype.detectCollision = function( x, y ) {
        return (this.left < x && x < this.right && this.top - 20 < y && y < this.bottom - 20);
    }

GameCore.Obstacle = Obstacle;
})(GameCore);
