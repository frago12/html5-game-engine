(function(GameCore, undefined) {

    var _assets = GameCore.AssetsManager.getInstance(),
        centerX = 0,
        centerY = 0,
        spriteX = 0,
        spriteY = 0;

    /*
    * Constructor
    */
    function Sprite( config ) {
        this.backgroundImage = _assets.get(config.sprite) || null;
        this.name = config.name || (new Date()).getTime();

        this.width = config.width || 0;
        this.height = config.height || 0;

        this.x = config.x || 0;
        this.y = config.y || 0;

        this.speed = config.speed || 1;

        this.controls = {
            up: false,
            right: false,
            down: false,
            left: false,
            spacebar: false,
            keyCode: false
        };

        this.mapLimits = {};

        centerX = this.x + (this.width / 2);
        centerY = this.y + (this.height / 2);
        spriteX = 0;
        spriteY = 0;

        // this.isShooting = false;
        // this.bullets = [];
        // this.currentBullet = 0;

        // var numBullets = 10;

        // for (var i=0; i<numBullets; i++) {
        //     this.bullets.push( new Bullet() );
        // }
    }

    /*
    * Update player position
    */
    Sprite.prototype.update = function() {
        // Update center of the player
        centerX = this.x + (this.width / 2);
        centerY = this.y + (this.height / 2);

        // this.checkDirection();
        // this.checkShooting();
        // this.updateAllBullets();
    };

    /*
    * Draw player
    */
    Sprite.prototype.draw = function( context, xView, yView ) {
        // this.drawAllBullets
        // sprite, startX, startY, width, height, x, y
        context.drawImage( this.backgroundImage, spriteX, spriteY, this.width, this.height, this.x - xView, this.y - yView, this.width, this.height );
        // context.fillRect((this.x-this.width/2) - xView, (this.y-this.height/2) - yView, this.width, this.height);
    }

    /*
    * @override
    */
    Sprite.prototype.update = function() {

    }

    /*
    * Retuns the next coordinate (position) of the player
    */
    Sprite.prototype.predictMove = function( direction ) {
        var sx = this.x;
        var sy = this.y;

        switch (direction) {
            case 'up':
                sy -= this.speed;
                break;

            case 'right':
                sx += this.speed;
                break;

            case 'down':
                sy += this.speed;
                break;

            case 'left':
                sx -= this.speed;

            default:
                break;
        }

        return { x:sx, y:sy };
    }

    /*
    * Move player to the given direction
    */
    Sprite.prototype.move = function( direction ) {
        var sx = this.x;
        var sy = this.y;

        switch (direction) {
            case 'up':
                this.y -= this.speed;
                break;

            case 'right':
                this.x += this.speed;
                break;

            case 'down':
                this.y += this.speed;
                break;

            case 'left':
                this.x -= this.speed;

            default:
                break;
        }
    }

    /*
    * Animate character depending on the direction given
    */
    Sprite.prototype.animate = function( direction ) {

    }

    /*
    * @override
    *
    * overrided by the scene, not by the player itself
    */
    Sprite.prototype.isColliding = function() {

    }

    /*
    * Determine if the object passed has reached the one the bounds of the map
    */
    Sprite.prototype.isOutOfBounds = function( x, y ) {
        var x = x || this.x,
            y = y || this.y;

        var newBottomY = y + this.height,
            newTopY = y,
            newRightX = x + this.width,
            newLeftX = x;

        return newBottomY > this.mapLimits.bottom ||
            newTopY < this.mapLimits.top ||
            newRightX > this.mapLimits.right ||
            newLeftX < this.mapLimits.left;
    }

    /*
    * Set map limits
    */
    Sprite.prototype.setMapLimits = function( limits ) {
        if (!limits) return;
        this.mapLimits = limits;
    }

GameCore.Sprite = Sprite;
})(GameCore);
