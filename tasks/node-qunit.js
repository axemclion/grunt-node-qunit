module.exports = function(grunt){
	grunt.registerTask("node-qunit", "Runs node-qunit ", function(){
		var started = new Date();
		var done = this.async();
		var started = new Date();
		var qunit = require("qunit");
		qunit.options.timeout = grunt.config('node-qunit.deps') || 2000;
		qunit.setup(grunt.config('node-qunit.setup') || {
			log : {
			   summary : true,
			   errors : true
			}
		});
		qunit.run({
		   deps : grunt.config('node-qunit.deps'),
		   code : grunt.config('node-qunit.code'),
		   tests : grunt.config('node-qunit.tests')
		}, function(err, result){
			result.started = started;
			result.completed = new Date();
			var waitForAsync = false;
			this.async = function(){
				waitForAsync = true;
				return function(status){
					done(typeof status === "undefined" ? (result.failed === 0) : status);
				}
			}
			var func = grunt.config('node-qunit.done');
			if (typeof func === "function") {
				var res = func(err, result);
			}
			!waitForAsync && done(typeof res === "undefined" ? (result.failed === 0) : res);
		});
	});
};
