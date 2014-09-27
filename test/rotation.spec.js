describe('rotation', function() {
    var rotation;
    beforeEach(function(done) {
        require(['test/injector'], function(injector) {
            injector().mock('src/animator', {name: 'fei'}).require(['src/rotation'], function(r) {
                rotation = r;
                done();
            });
        });
    });
    it('api', function() {
        var instance = rotation.register();
        expect(instance.start).toBeDefined();
        expect(instance.resume).toBeDefined();
        expect(instance.pause).toBeDefined();
    });
});
