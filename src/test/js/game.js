(function(window, undefined) {

    // Game config
    var config = {
        mainContainer: 'gameContainer',

        map: {
            backgroundImage: 'images/bg.png',
            width: 800,
            height: 600,
            limits: {
                top: 5,
                right: 750,
                bottom: 570,
                left: 65
            },

            // viewport: {
            //     width: 400,
            //     height: 200
            // }
        },

        obstacles: [
            tree1,
            tree2,
            tree3,
            tree4,
            rock1,
            rock2,
            bush1,
            bush2,
            bush3
        ],

        player: mainPlayer,

        events: {
            keypress:true
        }
    };

    GameCore.init(config);



})(window);
