module.exports = function(grunt) {
	var log = require('../node_modules/qunit/lib/log.js');
	var qunit = require("qunit");

	grunt.registerMultiTask("node-qunit", "Runs node-qunit ", function() {
		var done = this.async(),
			started = new Date(),
			callback = this.data.callback;
		// Setup Qunit
		qunit.setup(this.data.setup || {
			log: {
				summary: true,
				errors: true
			}
		});

		// Run tests
		var files = {};
		if(this.data.code) files.code = this.data.code;
		if(this.data.deps) files.deps = this.data.deps;
		if(this.data.tests) files.tests = this.data.tests;
		qunit.run(files, function(err, result) {
			if(!result) {
				throw "Could not get results for Qunit test. Check previous exceptions";
			}
			result.started = started;
			result.completed = new Date();
			var waitForAsync = false;
			this.async = function() {
				waitForAsync = true;
				return function(status) {
					done(typeof status === "undefined" ? (result.failed === 0) : status);
					log.reset();
				};
			};
			var res;
			if(typeof callback === "function") {
				res = callback(err, result);
			}
			if(!waitForAsync) {
				done(typeof res === "undefined" ? (result.failed === 0) : res);
				log.reset();
			}
		});
	});
};