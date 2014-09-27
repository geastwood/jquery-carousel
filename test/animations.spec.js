describe('animations', function() {
    var animations;
    beforeEach(function(done) {
        requirejs(['src/animations'], function(a) {
            animations = a;
            done();
        });
    });
    it('should work', function() {
        expect(typeof animations.fade()).toBe('object');
    });
});
