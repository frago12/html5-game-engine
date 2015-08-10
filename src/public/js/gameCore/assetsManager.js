(function(GameCore, undefined) {

    function AssetsManager() {
    	this.successCount = 0;
    	this.errorCount = 0;
    	this.cache = {};
    	this.downloadQueue = [];
    }

    AssetsManager.prototype.queueDownload = function(path) {
    	this.downloadQueue.push(path);
    }

    AssetsManager.prototype.isDone = function() {
    	return (this.downloadQueue.length == this.successCount + this.errorCount);
    }

    AssetsManager.prototype.downloadAll = function(callback) {
    	for(var i = 0, len = this.downloadQueue.length; i < len; i++) {
    		var path = this.downloadQueue[i];
    		var img = new Image();
    		var self = this;

    		img.addEventListener('load', function() {
    			self.successCount += 1;
    			if (self.isDone) { callback(); }
    		});

    		img.addEventListener('error', function() {
    			self.errorCount += 1;
    			if (self.isDone) { callback(); }
    		});
    		img.src = path;
    		this.cache[path] = img;
    	}
    }

    AssetsManager.prototype.get = function(path) {
    	return this.cache[path];
    }

GameCore.AssetsManager = AssetsManager;
})(GameCore);
