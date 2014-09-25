define(['./Carousel'], function(Carousel) {

    return {
        init: function() {
            window.foo = new Carousel('a23363276cb946490cd990200fd2401d');
            window.$728x600 = new Carousel('31abc6c6c2927fd4f4355ffbe692bde4', {
                rotate: true, count: 3, step: 3, elLocator: 'parent'
            });
            window.$120x600 = new Carousel('8b99ee2e74b813ad2ce20956e485c105', {
                rotate: true, count: 2, step: 1, elLocator: 'parent', animationOrientation: 'landscape'
            });
            window.$300x250 = new Carousel('4d33ac7b11f6ac49c32703ccfd7e039c', {
                // two hacks
                rotate: true, count: 2, step: 1, elLocator: 'parents', animationOrientation: 'landscape'
            });

            console.log('init');
        }
    };

});
