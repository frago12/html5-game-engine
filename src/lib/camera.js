(function(GameCore, undefined) {

    var AXIS = {
        NONE: 'none',
        HORIZONTAL: 'horizontal',
        VERTICAL: 'vertical',
        BOTH: 'both'
    };

    function Camera( xView, yView, camWidth, camHeight, worldWidth, worldHeight ) {

        // Camera position (top left coordinate)
        this.xView = xView || 0;
        this.yView = yView || 0;

        // Distance from followed object to border before camera starts move
        this.xDeadZone = 0;
        this.yDeadZone = 0;

        // Viewport dimensions
        this.viewportWidth = camWidth;
        this.viewportHeight = camHeight;

        // Allow camera to move in vertical and horizontal axis
        this.axis = AXIS.BOTH;

        // Object that should be followed
        this.followed = null;

        // Rectangle that represents the viewport
        this.viewportRect = new GameCore.Rectangle( this.xView, this.yView, this.viewportWidth, this.viewportHeight );

        // Rectangle that represents the world
        this.worldRect = new GameCore.Rectangle( 0, 0, worldWidth, worldHeight );
    }

    /*
    * Set the object that camera will follow
    */
    Camera.prototype.follow = function( sprite, xDeadZone, yDeadZone ) {
        this.followed = sprite;
        this.xDeadZone = xDeadZone;
        this.yDeadZone = yDeadZone;
    }

    /*
    * Move camera
    */
    Camera.prototype.update = function() {
        if (this.followed != null) {

            // Move camera on horizontal axis based on the object position
            if (this.axis === AXIS.HORIZONTAL || this.axis === AXIS.BOTH) {
                if ( (this.followed.x - this.xView + this.xDeadZone) > this.viewportWidth )
                    this.xView = this.followed.x - ( this.viewportWidth -this.xDeadZone );
                else if ( (this.followed.x - this.xDeadZone) < this.xView )
                    this.xView = this.followed.x - this.xDeadZone;
            }

            // Move camera on vertical axis based on the object position
            if (this.axis === AXIS.VERTICAL || this.axis === AXIS.BOTH) {
                if( (this.followed.y - this.yView + this.yDeadZone) > this.viewportHeight )
					this.yView = this.followed.y - (this.viewportHeight - this.yDeadZone);
				else if(this.followed.y - this.yDeadZone < this.yView)
					this.yView = this.followed.y - this.yDeadZone;
            }
        }

        // Update viewport
        this.viewportRect.set( this.xView, this.yView );

        // Don't let camera levae world boundaries
        if (!this.viewportRect.within( this.worldRect )) {
            if(this.viewportRect.left < this.worldRect.left)
				this.xView = this.worldRect.left;
			if(this.viewportRect.top < this.worldRect.top)
				this.yView = this.worldRect.top;
			if(this.viewportRect.right > this.worldRect.right)
				this.xView = this.worldRect.right - this.viewportWidth;
			if(this.viewportRect.bottom > this.worldRect.bottom)
				this.yView = this.worldRect.bottom - this.viewportHeight;
        }
    }

GameCore.Camera = Camera;
})(GameCore);
