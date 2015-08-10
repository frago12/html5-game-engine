(function(window, undefined) {

    var config = {
        mainContainer: 'gameContainer',
        width: 800,
        height: 600,

        map: {
            canvas: 'canvasBG',
            backgroundImage: 'images/bg.png'
        },

        player: {
            name: 'frago',
            sprite: 'images/hero.png',
            width: 35,
            height: 54
        }
    };

    GameCore.init(config);



})(window);
