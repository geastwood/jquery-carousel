define(['src/idenFactory', 'src/rotation', 'src/animator', 'src/queue'], function(factory, rotation, animator, queue) {

    // constructor
    var Carousel = function(iden, opts) {

        var defaults = { // set defaults
            step: 1,
            count: 2,
            elLocator: 'parent',
            rotate: true, // flag to activate the auto rotate
            rotateInterval: 5000, // interval of the rotation
            duration: 500, // duration of the animation
            effect: 'replace',
            easing: 'easeOutBounce',
            orientation: 'vertical'
        }, that = this;

        this.iden = iden;
        this.cfg = $.extend({}, defaults, opts); // merge config with options
        this.select = factory(iden); // create a `select` factory function for this `carousel`
        this.$container = $(this.select('container')); // jQuery object -> the container
        this.isActive = this.$container.length > 0;

        if (this.isActive) { // only create `queue` and attach event if this `carousel` is active
            // TODO, extract to a method
            this.queue = queue.call(this, this.cfg); // create a `queue` object

            if (this.cfg.rotate === true) {
                this.rotation = rotation.register(
                    function() {
                        animator.call(that, that.cfg.effect, 'forward');
                    }, this.cfg.rotateInterval)
                    .start();
            }

            this.attach(); // attach event
        }
    };
    Carousel.prototype.getProduct = function(boxNr) {
        return $(this.select('product', boxNr));
    };
    Carousel.prototype.getProducts = function() { // get `products`, as how, defined in factory
        this.products = this.select('products');
        return this.products;
    };
    Carousel.prototype.setProducts = function(v) {
        this.product = this.select('products', v);
        return this;
    };
    Carousel.prototype.getNavigations = function() { // get `navigation` buttons, and store them as `array`
        this.navigators = this.navigators || [
            this.$container.find(this.select('naviLeft')),
            this.$container.find(this.select('naviRight'))
        ];

        return this.navigators;
    };
    Carousel.prototype.attach = function() {
        var navigators = this.getNavigations(), that = this;
        // attach on `navigator` click
        $.each(navigators, function(i, item) {
            item.on('click', function() {
                // event handler
                animator.call(
                    that,
                    that.cfg.effect,
                    this.className.indexOf('right') !== -1 ? 'forward' : 'backward'
                );
                that.rotation && that.rotation.pause();
            });
        });

        // attach on hover
        if (this.rotation) {
            this.$container.hover(
                (function(that) {
                    return function(ev) {
                        return that.rotation.pause(ev);
                    };
                })(this),
                (function() {
                    return function(ev) {
                        return that.rotation.resume(ev);
                    };
                })(this)
            );
        }
    };

    return Carousel;
});
