function TestsRunner() {

	if (!window.__runner__) {
		throw 'Not found tests files';
	}

	this.specs = window.__runner__.tests;
	this.config = window.__runner__.config;
}

TestsRunner.engines = {

	jsLoader: function () {
		var names,
			match,
			base,
			key;

		for(key in window.__karma__.files) {
			match = key.match(/(\/absolute.*e.mail.ru)/);

			if (match !== null) {
				base = match[0];
				break;
			}

		}

		names = this.specs.map(function (path) {
			return path.replace(/^[\.]+/, base);
		});

		for (key in jsCoreAlias) {

			if (!jsCoreAlias[key]) {
				continue;
			}

			names = names.map(function (name) {

				if (name.indexOf(jsCoreAlias[key]) !== -1) {
					name = name.replace(jsCoreAlias[key], '{' + key + '}')
				}

				return name.replace(/\.js$/, '');
			});

		}

		return names;
	}

};

TestsRunner.prototype.start = function () {

	require(TestsRunner.engines[this.config.engine].apply(this), function () {
		window.__karma__.start.apply(window.__karma__, arguments);
	});

};

