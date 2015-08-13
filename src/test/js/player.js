(function(window, undefined) {

    var player = Object.create(null);

    player.name = 'frago';
    player.sprite = 'images/hero.png';
    player.width = 35;
    player.height = 54;
    player.speed = 5;
    // player.animations = {
    //     top: [2],
    //     right: [4]
    //     bottom: [1],
    //     left: [3]
    // };

    player.onKeyPress = function(key) {
        // this.animate( direction );
        this.move( key.direction );
    }

window.mainPlayer = player;
})(window);
