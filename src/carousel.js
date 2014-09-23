var C = (function($) {

    var slice = [].slice, join = [].join;
    var factory = function(iden) {
        var store = window;

        var collection = {
            product: function(boxNr) {
                return '#ia_' + iden + '-product-box' + boxNr;
            },
            products: function(v) {
                if (arguments.length === 1) {
                    store['ia_products_' + iden] = v;
                }
                return store['ia_products_' + iden];
            },
            container: function() {
                return '.ia-' + iden + '-main_div';
            },
            naviLeft: function() {
                return '.ia-' + iden + '-paging-arrow-left';
            },
            naviRight: function() {
                return '.ia-' + iden + '-paging-arrow-right';
            },
            productProp: function() {
                return '#ia_' + iden + '_prod' + join.call(arguments, '');
            }
        };

        return function() {
            return collection[arguments[0]].apply(null, slice.call(arguments, 1));
        };
    };

    // managing the timer, and hover event
    var rotation = {
        register: function(carousel, direction) {
            var interval = carousel.cfg.rotateDuration || 2000;
            var intervalHandler;

            return {
                start: function() {
                    intervalHandler = setInterval(function() {
                        animator.call({queue: carousel.queue}, carousel.cfg.animationEffect, {direction: direction});
                    }, interval);
                    return this;
                },
                resume: function() { // event handler `mouseout`
                    this.pause();
                    this.start();
                },
                pause: function() { // event handler `mouseover`
                    clearInterval(intervalHandler);
                }
            };
        }
    };

    // animation factory, defines all supported animation
    var animations = {
        fade: function(direction) {
            return {
                initial: function() {
                    return { 'float': 'left', opacity: 0 };
                },
                'in': function() {
                    return { opacity: 1 };
                },
                out: function() {
                    return { opacity: 0 };
                }

            };
        },
        replace: function(direction) {
            // TODO
            var height = 250;

            return {
                initial: function() {
                    return { 'float': 'left', opacity: -5, marginTop: (direction === 'forward') ? height : (0 - height) };
                },
                'in': function() {
                    return { marginTop: 0, opacity: 1 };
                },
                out: function() {
                    return { opacity: 0, marginTop: (direction === 'forward') ? (0 - height) : (2 * height) };
                }
            };
        }
    };

    // controls the logic of animation
    var animator = function(type, opts) {
        var that = this, duration = opts.duration || 400, anim = animations[type](opts.direction);

        this.queue.exit(opts.direction).forEach(function(item, index, arr) {
            item.find('a').css({float: 'left'}).stop().animate(anim.out(), duration, function() {
                 // make sure only to call `enter` once, only call enter when all `out` are finished
                if (arr.length === index + 1) {
                    that.queue.enter(opts.direction).forEach(function(item) {
                        item.find('a').css(anim.initial()).stop().animate(anim['in'](), duration);
                    });
                }
            });
        });
    };

    // updates the products
    var render = function(opts) {
        var that = this, products = this.getProducts();

        /* jshint ignore: start */
        var template = function(selector, index, feed) {

            // 160x600
            that.$container.find(that.factory('productProp', index, '_image')).attr('src', feed.image_url);
            that.$container.find(that.factory('productProp', index, '_image')).attr('alt', feed.label);
            that.$container.find(that.factory('productProp', index, '_image_overlay')).html(feed.promotion);
            that.$container.find(that.factory('productProp', index, '_headline')).html(feed.label);
            that.$container.find(that.factory('productProp', index, '_description')).html(feed.description);
            that.$container.find(that.factory('productProp', index, '_bubbles')).html(feed.more_infos);
            that.$container.find(that.factory('productProp', index, '_price_right')).html(feed.price);
            that.$container.find(that.factory('productProp', index, '_price_right_sub')).html(feed.price_info);
            that.$container.find(that.factory('productProp', index, '_price_left')).html(feed.main_info);
            that.$container.find(that.factory('productProp', index, '_deeplink')).attr('href', feed.deeplink);
            that.$container.find(that.factory('productProp', index, '_more_btn')).html(feed.button_text);

            return selector;
        };
        /* jshint ignore: end */

        return opts.boxes.map(function(box, index) {
            return template(box, index + 1, products[index]);
        });
    };

    // controls products of carousel
    var queue = function(cfg) {
        var that = this, boxes = [], i = -1;
        // dynamic get boxes, `how many` is also dynamic, defined by the `cfg.count`
        while (++i < cfg.count) {
            boxes.push(this.getProduct(i + 1));
        }

        return {
            enter: function(direction) {
                // TODO, here looks hacky
                var products = that.getProducts();
                if (direction === 'forward') {
                    that.setProducts(products.slice(cfg.step).concat(products.slice(0, cfg.step)));
                } else {
                    that.setProducts(products.slice((0 - cfg.step)).concat(products.slice(0, products.length - cfg.step)));
                }
                return render.call(that, {boxes: boxes});
            },
            exit: function(direction) {
                return boxes;
            }
        };
    };

    // constructor
    var Carousel = function(iden, opts) {
        var defaults = { // set defaults
            step: 1,
            count: 2,
            rotate: true, // flag to activate the auto rotate
            rotateDuration: 5000, // interval of the rotation
            duration: 500, // duration of the animation
            animationEffect: 'replace'
        };
        this.iden = iden;
        this.cfg = $.extend({}, defaults, opts); // merge config with options
        this.factory = factory(iden);
        this.$container = $(this.factory('container')); // jQuery object -> the container
        this.queue = queue.call(this, this.cfg); // create a `queue` object

        if (this.cfg.rotate === true) {
            this.rotation = rotation.register(this, 'forward').start();
        }

        this.attach(); // attach event
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
                    { queue: that.queue },
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
            this.$container.hover(this.rotation.pause.bind(this.rotation), this.rotation.resume.bind(this.rotation));
        }
    };

    return {
        init: function() {
            window.foo = new Carousel('a23363276cb946490cd990200fd2401d');
        }
    };

}(jQuery));

// TEMP
C.init();
// hack
// jshint ignore: start
var noop = function() {};
_ia_start_rotation_a23363276cb946490cd990200fd2401d = noop;
_ia_stop_rotation_a23363276cb946490cd990200fd2401d = noop;
_ia_rotate_both_products_a23363276cb946490cd990200fd2401d = noop;
// jshint ignore: end
