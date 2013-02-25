grunt-node-qunit

[![Build Status](https://api.travis-ci.org/axemclion/grunt-node-qunit.png?branch=master)](https://travis-ci.org/axemclion/grunt-node-qunit)

-----------------

A Grunt task for running [node-qunit](https://github.com/kof/node-qunit)

[Grunt](http://gruntjs.com/) is a task-based command line build tool for JavaScript projects, based on nodejs. 
[Node-Qunit](https://github.com/kof/node-qunit) is a Qunit testing framework for nodejs
[QUnit](http://qunitjs.com/) is a powerful, easy-to-use JavaScript unit test suite used by the jQuery, jQuery UI and jQuery Mobile projects and is capable of testing any generic JavaScript code, including itself! 

# About the tool

The Grunt Node-Qunit task is a wrapper for the node-qunit task to be used in grunt. The parameters used are the exact parameters used with the [node-quit](https://github.com/kof/node-qunit#via-api) package.

## How is this different from [grunt-nodeunit](https://github.com/gruntjs/grunt-contrib-nodeunit)

Grunt NodeUnit task uses the [nodeunit](https://github.com/caolan/nodeunit/) testing framework. The syntax is slightly different and uses the [node-qunit](https://github.com/kof/node-qunit#via-api). The syntax for this task is exactly like the qunit syntax. 

#Usage

This task is available as a [node package](https://npmjs.org/package/grunt-node-qunit) and can be installed as `npm install grunt-node-qunit`. It can also be included as a devDependency in package.json in your node project. 
To use the task in `grunt.js`, load the npmTask. 


```javascript
grunt.loadNpmTasks('grunt-node-qunit');

``` 

__Note that this is *NOT* a multi task. Node-Qunit is used via the API, as described [here](https://github.com/axemclion/grunt-node-qunit.git). 


The parameters are 

* __setup__ : An object passed to qunit.setup
* __deps__ : define dependencies, which are required then before code, passed in qunit.run()
* __code__ : define the code that needs to be tested
* __tests__: define the test files
* __done__ : A callback that is called everytime a qunit test for a page is complete. Runs per page, per browser configuration. A true or false return value passes or fails the test, undefined return value does not alter the result of the test. For async results, call `this.async()` in the function. The return of `this.async()` is a function that should be called once the async action is completed.

#Example

Inside the grunt.initConfig, add a section

```

grunt.initConfig({
	//....
	'node-qunit': {
		deps: './src/pouch.js',
		code: './src/adapters/pouch.leveldb.js',
		tests: testFiles.map(function(n){
			return "./tests/" + n;
		}),
		done: function(err, res){
			!err && publishResults("node", res, this.async());
		}
	},
	// ....
}); // end of grunt.initConfig

```

// Elsewhere in the grunt file
grunt.loadNpmTasks('grunt-node-qunit');
