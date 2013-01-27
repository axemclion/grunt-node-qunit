test("a test that requires CODE file", function(assert) {
	equal(1, CODE(), "Dependency loaded");
});