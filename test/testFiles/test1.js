QUnit.module("Module C", {
    setup: function() {
        // setup a shared environment for each test
        this.options = {
            test: 123
        };
    }
});

test("this test is using shared environment", 1, function(assert) {
    deepEqual({
        test: 123
    }, this.options, "passing test");
});

test("this is an async test example", function(assert) {
    expect(2);
    stop();
    setTimeout(function() {
        ok(true, "finished async test");
        strictEqual(true, true, "Strict equal assertion uses ===");
        start();
    }, 100);
});