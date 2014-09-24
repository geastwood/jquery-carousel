define([
    'intern!object',
    'intern/chai!expect',
    'src/animator'
], function(registerSuit, expect, animations) {
    registerSuit({
        name: 'type of animations -> `fade`, `replace`',
        works: function() {
            expect(true).to.be.ok;
            expect(true).to.be.ok;
        }
    });
});
