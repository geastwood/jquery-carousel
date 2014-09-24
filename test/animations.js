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
});
