(function(window, undefined) {

    var player = Object.create(null);

    player.name = 'frago';
    player.sprite = 'images/hero.png';
    player.x = 80;
    player.y = 80;
    player.width = 35;
    player.height = 54;
    player.speed = 2;
    // player.animations = {
    //     top: [2],
    //     right: [4]
    //     bottom: [1],
    //     left: [3]
    // };

    player.update = function() {
        var direction = '',
            movePlayer = false;

        if (this.controls.up) {
            direction = 'up';
            movePlayer = true;
        } else if (this.controls.right) {
            direction = 'right';
            movePlayer = true;
        } else if (this.controls.down) {
            direction = 'down';
            movePlayer = true;
        } else if (this.controls.left) {
            direction = 'left';
            movePlayer = true;
        }

        // Check collision
        if (movePlayer) {
            var position = this.predictMove( direction ),
                collision = this.isColliding( position.x, position.y );

            if (!collision) {
                this.move( direction );
            }
        }
    }

    player.onCollision = function( collider ) {
        this.isColliding = true;
    }

window.mainPlayer = player;
})(window);
