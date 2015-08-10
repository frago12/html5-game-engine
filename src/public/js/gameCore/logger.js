(function(GameCore, undefined) {

    GameCore.Logger = Object.create(null);

    GameCore.Logger.error = function( errorMsg ) {
        throw new Error( errorMsg );
    }

})(GameCore);
