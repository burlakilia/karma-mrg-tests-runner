var Reporter = function (logger, config) {};

Reporter.prototype.onRunComplete = function (browsers, results) {
};

Reporter.prototype.onExit = function (done) {
	this.complete = done;
};

Reporter.$inject = ['logger', 'config.badger'];
module.exports = Reporter;