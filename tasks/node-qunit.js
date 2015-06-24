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
		var ignoreFailures = this.data && this.data.ignoreFailures;
		if(this.data.code) files.code = this.data.code;
		if(this.data.deps) files.deps = this.data.deps;
		if(this.data.moduleDeps) files.moduleDeps = this.data.moduleDeps;
		if(this.data.tests) files.tests = this.data.tests;
		qunit.run(files, function(err, result) {
			if(!result) {
				throw new Error("Could not get results for Qunit test. Check previous exceptions");
			}

			function check(res) {
				var hasErr = (result.failed > 0) && !ignoreFailures;
				done(typeof res === "undefined" ? (!hasErr && !err) : res);
				log.reset();
			}

			result.started = started;
			result.completed = new Date();
			var waitForAsync = false;
			this.async = function() {
				waitForAsync = true;
				return check;
			};
			var res;
			if(typeof callback === "function") {
				res = callback(err, result);
			}
			if(!waitForAsync) {
				check(res);
			}
		});
	});
};