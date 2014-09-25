define(['./Carousel'], function(Carousel) {

    return {
        init: function() {
            window.foo = new Carousel('a23363276cb946490cd990200fd2401d');
            window.bar = new Carousel('31abc6c6c2927fd4f4355ffbe692bde4', {
                rotate: true, count: 3, step: 3, elLocator: 'parent'
            });
            console.log('init');
        }
    };

});
