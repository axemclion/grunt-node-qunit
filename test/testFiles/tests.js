test("a basic test example", function(assert) {
    ok(true, "this test is fine");
    var value = "hello";
    equal("hello", value, "We expect value to be hello");
});

QUnit.module("Module A");

test("first test within module", 1, function(assert) {
    ok(true, "a dummy");
});

test("second test within module", 2, function(assert) {
    ok(true, "dummy 1 of 2");
    ok(true, "dummy 2 of 2");
});

QUnit.module("Module B", {
    setup: function() {
        // do some initial stuff before every test for this module
    },
    teardown: function() {
        // do some stuff after every test for this module
    }
});

test("some other test", function(assert) {
    expect(1);
    equal(true, true, "passing test");
});
