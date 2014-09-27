describe('animations', function() {
    var animations, injector, animators;
    beforeEach(function(done) {
        requirejs(['src/animations', 'test/injector'], function(module, injector) {
            animations = module;
            injector = injector();
            done();
        });
    });
    it('type of animations -> `fade`, `replace`', function() {
        expect(typeof animations.fade).toBe('function');
        expect(typeof animations.replace).toBe('function');
    });
    describe('anmiation object has correct api', function() {
        it('fade', function() {
            var fade = animations.fade();
            expect(typeof fade['in']).toBe('function');
            expect(typeof fade.out).toBe('function');
            expect(typeof fade.initial).toBe('function');
            expect(typeof fade.easing).toBe('function');
        });
        it('replace', function() {
            var replace = animations.replace();
            expect(typeof replace['in']).toBe('function');
            expect(typeof replace.out).toBe('function');
            expect(typeof replace.initial).toBe('function');
            expect(typeof replace.easing).toBe('function');
        });
    });

});
/*
define([
    'intern!object',
    'intern/chai!expect',
    'src/animations'
], function(registerSuit, expect, animations) {
    registerSuit({
        name: 'fade',
        correct: function() {
            var fade = animations.fade();
            expect(fade.initial().opacity).to.equal(0);
            expect(fade['in']().opacity).to.equal(1);
            expect(fade.out().opacity).to.equal(0);
        }
    });
    registerSuit({
        name: 'replace forward && backward',
        correct: function() {
            var replace = animations.replace();
            var replaceBackward = animations.replace('backward');
            var replaceLandscape = animations.replace('backward', { orientation: 'landscape' });
            var width = 100, height = 200;
            var elMock = {
                width: function() {
                    return width;
                },
                height: function() {
                    return height;
                }
            };

            // `forward` tests
            expect(replace.initial(elMock).opacity).to.equal(-5);
            expect(replace.initial(elMock).marginTop).to.equal((0 - height));
            expect(replace['in'](elMock).opacity).to.equal(1);
            expect(replace['in'](elMock).marginTop).to.equal(0);
            expect(replace.out(elMock).opacity).to.equal(0);
            expect(replace.out(elMock).marginTop).to.equal((2 * height));

            // `backward` tests
            expect(replaceBackward.initial(elMock).opacity).to.equal(-5);
            expect(replaceBackward.initial(elMock).marginTop).to.equal(height);
            expect(replaceBackward['in'](elMock).opacity).to.equal(1);
            expect(replaceBackward['in'](elMock).marginTop).to.equal(0);
            expect(replaceBackward.out(elMock).opacity).to.equal(0);
            expect(replaceBackward.out(elMock).marginTop).to.equal((0 - height));

            // `backward` tests
            expect(replaceLandscape.initial(elMock).opacity).to.equal(-5);
            expect(replaceLandscape.initial(elMock).marginLeft).to.equal(width);
            expect(replaceLandscape['in'](elMock).opacity).to.equal(1);
            expect(replaceLandscape['in'](elMock).marginLeft).to.equal(0);
            expect(replaceLandscape.out(elMock).opacity).to.equal(0);
            expect(replaceLandscape.out(elMock).marginLeft).to.equal((0 - width));
        }
    });
});
*/
