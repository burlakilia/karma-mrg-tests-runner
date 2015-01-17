var util = require('util'),
	glob = require('glob'),
	async = require('async');

var TEMPLATE = 'window.__runner__ = window.__runner__ || {}; window.__runner__.tests = %s; window.__runner__.config = %s;';

var Finder = function (logger, config) {
	var log = logger.create('karma.mrg.tests.runner');

	return function(content, file, done) {

		async.map(config.patterns, glob, function (err, files) {

			if (err) {
				log.error(err);
				done(err);
			}

			files = Array.prototype.concat.apply([], files).filter(function (path) {
				return path.indexOf('node_modules') === -1;
			});

			log.debug('found ' + files.length + ' tests');
			done(util.format(TEMPLATE, JSON.stringify(files), JSON.stringify(config), content));
		});

	};

};

Finder.$inject = ['logger', 'config.runner'];
module.exports = Finder;