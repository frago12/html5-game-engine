(function(GameCore, undefined) {

    var _canvas = GameCore.EntitiesCanvas.getInstance(),
        centerX = 0,
        centerY = 0,
        spriteX = 0,
        spriteY = 0;

    function Sprite( sprite, config ) {
        this.sprite = sprite || null;
        this.name = config.name || (new Date()).getTime();

        this.width = config.width || 0;
        this.height = config.height || 0;

        this.x = config.x || 0;
        this.y = config.y || 0;

        this.speed = config.speed || 1;

        centerX = this.x + (this.width / 2);
        centerY = this.y + (this.height / 2);
        spriteX = 0;
        spriteY = 0;

        // this.isUpKey = false;
        // this.isDownKey = false;
        // this.isLeftKey = false;
        // this.isRightKey = false;
        // this.isSpaceBar = false;
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
    Sprite.prototype.draw = function() {
        // this.drawAllBullets
        // sprite, startX, startY, width, height, x, y
        _canvas.draw( this.sprite, spriteX, spriteY, this.width, this.height, this.x, this.y  );
    }

    /*
    * Move player to the given direction
    */
    Sprite.prototype.move = function( direction ) {
        switch (direction) {
            case 'top':
                this.y -= this.speed;
                break;

            case 'right':
                this.x += this.speed;
                break;

            case 'bottom':
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

    Sprite.prototype.onKeyPress = function() {

    }

GameCore.Sprite = Sprite;
})(GameCore);
