module.exports = function(grunt) {
	grunt.initConfig({
		lint: {
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
	grunt.loadTasks('tasks');
	grunt.registerTask('default', 'lint test');
	grunt.registerTask('test', 'node-qunit:case1 node-qunit:case2 node-qunit:case3 node-qunit:case4 node-qunit:case5 node-qunit:case6 node-qunit:case7 node-qunit:case8 node-qunit:case9');
};