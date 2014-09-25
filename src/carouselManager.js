define(['./Carousel'], function(Carousel) {

    return {
        init: function() {
            window.foo = new Carousel('a23363276cb946490cd990200fd2401d');
            window.$728x90 = new Carousel('31abc6c6c2927fd4f4355ffbe692bde4', {
                rotate: true, count: 3, step: 3, elLocator: 'parent'
            });
            window.$120x600 = new Carousel('8b99ee2e74b813ad2ce20956e485c105', {
                rotate: true, count: 2, step: 1, elLocator: 'parent', animationOrientation: 'landscape'
            });
            window.$300x250 = new Carousel('4d33ac7b11f6ac49c32703ccfd7e039c', {
                // two hacks,
                // 1) count should be 1.
                // 2) `a` is not `div` direct parent, so use `parents`
                rotate: true, count: 2, step: 1, elLocator: 'parents', animationOrientation: 'landscape'
            });
            window.$300x600 = new Carousel('61b874a87f4f7fd232b6eda46b2f11e5', {
                rotate: true, count: 2, step: 1, elLocator: 'parent', animationOrientation: 'landscape'
            });
            window.$336x280 = new Carousel('4b5c1f38286af531a8914e3ea34392df', {
                // hacks same with 300x260
                rotate: true, count: 2, step: 1, elLocator: 'parents', animationOrientation: 'vertical'
            });
            window.$970x90 = new Carousel('7a9fcf304bf530b772d769618243d261', {
                rotate: true, count: 4, step: 1, elLocator: 'parent', animationOrientation: 'landscape', animationEffect: 'fade'
            });
            window.$468x60 = new Carousel('b47d76b4266371aea2dceca286f40866', {
                rotate: true, count: 2, step: 1, elLocator: 'parent', animationOrientation: 'landscape'
            });

            console.log('init');
        }
    };

});
