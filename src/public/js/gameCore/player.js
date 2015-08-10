(function(GameCore, undefined) {

    var _canvas = GameCore.EntitiesCanvas.getInstance();

    function Player( name, width, height, srcX, srcY ) {
        if (!width || !height) return;

        this.name = name;

        this.width = width;
        this.height = height;

        this.x = 200;
        this.y = 200;

        this.centerX = this.x + (this.width / 2);
        this.centerY = this.y + (this.height / 2);

        this.srcX = srcX || 0;
        this.srcY = srcY || 0;

        this.speed = 2;

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

    Player.prototype.update = function() {
        // Update center of the player
        this.centerX = this.x + (this.width / 2);
        this.centerY = this.y + (this.height / 2);

        // this.checkDirection();
        // this.checkShooting();
        // this.updateAllBullets();
    };

    Player.prototype.draw = function() {
        // this.drawAllBullets
        // sprite, startX, startY, width, height, x, y
        _canvas.draw( this.sprite, this.srcX, this.srcY, this.width, this.height, this.x, this.y  );
    }

    Player.prototype.setAsset = function( asset ) {
        this.sprite = asset;
    }

GameCore.Player = Player;
})(GameCore);
