define([
    'intern!object',
    'intern/chai!expect',
    'src/animations'
], function(registerSuit, expect, animations) {
    registerSuit({
        name: 'type of animations -> `fade`, `replace`',
        works: function() {
            expect(animations.fade).to.be.a('function');
            expect(animations.replace).to.be.a('function');
        }
    });
    registerSuit({
        name: 'anmiation object has correct api',
        fade: function() {
            var fade = animations.fade();
            expect(fade['in']).to.be.a('function');
            expect(fade.out).to.be.a('function');
            expect(fade.initial).to.be.a('function');
        },
        replace: function() {
            var replace = animations.replace();
            expect(replace['in']).to.be.a('function');
            expect(replace.out).to.be.a('function');
            expect(replace.initial).to.be.a('function');
        }
    });
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
