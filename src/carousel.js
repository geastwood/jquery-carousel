define(['./idenFactory', './rotation', './animator', './queue'], function(factory, rotation, animator, queue) {

    // constructor
    var Carousel = function(iden, opts) {
        var defaults = { // set defaults
            step: 1,
            count: 2,
            elLocator: 'find',
            rotate: true, // flag to activate the auto rotate
            rotateDuration: 5000, // interval of the rotation
            duration: 500, // duration of the animation
            animationEffect: 'replace'
        };
        this.iden = iden;
        this.cfg = $.extend({}, defaults, opts); // merge config with options
        this.factory = factory(iden);
        this.$container = $(this.factory('container')); // jQuery object -> the container
        if (this.$container.length) {
            this.queue = queue.call(this, this.cfg); // create a `queue` object

            if (this.cfg.rotate === true) {
                this.rotation = rotation.register(this, 'forward', this.cfg.duration).start();
            }

            this.attach(); // attach event
        }
    };
    Carousel.prototype.getProduct = function(boxNr) {
        return $(this.factory('product', boxNr));
    };
    Carousel.prototype.getProducts = function() { // get `products`, as how, defined in factory
        this.products = this.factory('products');
        return this.products;
    };
    Carousel.prototype.setProducts = function(v) {
        this.product = this.factory('products', v);
        return this;
    };
    Carousel.prototype.getNavigations = function() { // get `navigation` buttons, and store them as `array`
        this.navigators = this.navigators || [
            this.$container.find(this.factory('naviLeft')),
            this.$container.find(this.factory('naviRight'))
        ];

        return this.navigators;
    };
    Carousel.prototype.attach = function() {
        var navigators = this.getNavigations(), that = this;
        // attach on `navigator` click
        navigators.forEach(function(item) {
            item.on('click', function() {
                // event handler
                animator.call(
                    { queue: that.queue, cfg: that.cfg },
                    that.cfg.animationEffect,
                    {
                        direction: this.className.indexOf('right') !== -1 ? 'forward' : 'backward',
                        duration: that.cfg.duration
                    }
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
