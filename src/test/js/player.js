(function(window, undefined) {

    var player = Object.create(null);

    player.name = 'frago';
    player.sprite = 'images/hero.png';
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
        var direction = '';

        if (this.controls.up) {
            direction = 'up';
        } else if (this.controls.right) {
            direction = 'right';
        } else if (this.controls.down) {
            direction = 'down';
        } else if (this.controls.left) {
            direction = 'left';
        }

        // this.move( key.direction );
        this.move(direction);
    }

window.mainPlayer = player;
})(window);
