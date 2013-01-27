test("a test that requires dependencies", function(assert) {
	equal(1, DEP(), "Dependency loaded");
});