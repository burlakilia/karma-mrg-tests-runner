var path = require('path');

function pattern (file) {
	return {
		pattern: file,
		included: true,
		served: true,
		watched: false
	};
}

function testRunner(files) {
	files.unshift(pattern(path.join(__dirname, 'src/frameworks/runner.js')));
}

testRunner.$inject = ['config.files', 'config.runner'];

module.exports = {
	'preprocessor:runner': ['factory', require('./src/processors/finder')],
	'framework:testRunner': ['factory', testRunner]
};
