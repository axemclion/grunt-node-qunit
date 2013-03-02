module.exports = function(grunt) {
	grunt.initConfig({
		jshint: {
			files: ['grunt.js', 'tasks/**/*.js']
		},
		'node-qunit': {

			// Just a simple test
			case1: {
				code: "./test/code/code.js",
				tests: "./test/testFiles/tests.js"
			},

			// Using Code with array
			case2: {
				code: "./test/code/code.js",
				tests: ["./test/testFiles/codetest.js", "./test/testFiles/tests.js"]
			},

			// Requires dependency
			case3: {
				code: "./test/code/code.js",
				deps: "./test/dependency/dependency.js",
				tests: ["./test/testFiles/codetest.js", "./test/testFiles/deptest.js"]
			},

			// Wildcard in test path
			// TODO Fix wildcards in file paths
			case4: {
				code: "./test/code/code.js",
				deps: "./test/dependency/dependency.js",
				tests: ["./test/testFiles/tests.js"]
			},

			// require code into a namespace object, rather than globally
			case5: {
				code: {
					path: "./test/code/code.js",
					namespace: "code"
				},
				tests: "./test/testFiles/tests.js"
			},


			// using callback
			case6: {
				code: "./test/code/code.js",
				tests: "./test/testFiles/tests.js",
				callback: function() {
					grunt.log.write("Case5 Callback invoked");
				}
			},

			// Ignoring a failing test
			case7: {
				deps: "./test/dependency/dependency.js",
				code: "./test/code/code.js",
				tests: ["./test/testFiles/tests.js", "./test/testFiles/tests.js", "./test/testFiles/failtest.js"],
				callback: function(status) {
					grunt.log.write("Status of this test was " + status);
					return true;
				}
			},

			// Aync in callback
			case8: {
				deps: "./test/dependency/dependency.js",
				code: "./test/code/code.js",
				tests: ["./test/testFiles/tests.js"],
				callback: function() {
					var done = this.async();
					setTimeout(function() {
						done();
					}, 100);
				}
			},

			// Async in callback, ignoring test result
			case9: {
				deps: "./test/dependency/dependency.js",
				code: "./test/code/code.js",
				tests: ["./test/testFiles/tests.js", "./test/testFiles/failtest.js"],
				callback: function(status) {
					grunt.log.write("Status of the tests is " + status);
					var done = this.async();
					setTimeout(function() {
						done(true);
					}, 100);
				}
			}
		}
	});

	grunt.registerTask('publish', 'Publish the latest version of this plugin', function() {
		var done = this.async();
		var publish = require('publish');
		publish.start(function(err) {
			if (err) {
				console.log(err);
				done(false);
			} else {
				publish.publish({}, function(err) {
					if (err) {
						console.log(err);
					} else {
						console.log("Package Published");
						done(true);
					}
				});
			}
		});
	});
	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-jshint')

	grunt.registerTask('default', ['jshint', 'test']);
	grunt.registerTask('test', ['node-qunit', 'publish']);
};