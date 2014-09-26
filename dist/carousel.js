;var IABannerCarousel = (function($) {
// handle how concat complicate `id` attribute
var idenFactory, animations, animator, rotation, render, queue, carouselManager, _Carousel_;
idenFactory = function () {
  var slice = [].slice, join = [].join;
  var factory = function (iden) {
    var store = window;
    var collection = {
      product: function (boxNr) {
        return '#ia_' + iden + '-product-box' + boxNr;
      },
      products: function (v) {
        if (arguments.length === 1) {
          store['ia_products_' + iden] = v;
        }
        return store['ia_products_' + iden];
      },
      container: function () {
        return '.ia-' + iden + '-main_div';
      },
      naviLeft: function () {
        return '.ia-' + iden + '-paging-arrow-left';
      },
      naviRight: function () {
        return '.ia-' + iden + '-paging-arrow-right';
      },
      productProp: function () {
        return '#ia_' + iden + '_prod' + join.call(arguments, '');
      }
    };
    return function () {
      // slice `arguments` and pass along the rest
      // first argument is the collection name e.g. `product`, `container`
      // some methods from `collection` needs addition parameters
      return collection[arguments[0]].apply(null, slice.call(arguments, 1));
    };
  };
  return factory;
}();
// animation factory, defines all supported animation
animations = {
  fade: function (direction) {
    return {
      initial: function () {
        return {
          'float': 'left',
          opacity: 0
        };
      },
      'in': function () {
        return { opacity: 1 };
      },
      out: function () {
        return { opacity: 0 };
      },
      easing: function () {
        return 'swing';
      }
    };
  },
  replace: function (direction, opts) {
    var height = 0, width = 0, orientation = opts && opts.orientation || 'vertical';
    return {
      initial: function ($el) {
        var config = {
            'float': 'left',
            opacity: -5
          }, margin = margin || $el[orientation === 'vertical' ? 'height' : 'width']();
        // add margin `10` pixels to avoid flashing
        config[orientation === 'vertical' ? 'marginTop' : 'marginLeft'] = direction === 'backward' ? margin / 2 : 0 - margin / 2 + 10;
        return config;
      },
      'in': function ($el) {
        var config = { opacity: 1 };
        config[orientation === 'vertical' ? 'marginTop' : 'marginLeft'] = 0;
        return config;
      },
      out: function ($el) {
        var config = {
            'float': 'left',
            opacity: 0
          }, margin = margin || $el[orientation === 'vertical' ? 'height' : 'width']();
        config[orientation === 'vertical' ? 'marginTop' : 'marginLeft'] = direction === 'backward' ? 0 - margin : margin;
        return config;
      },
      easing: function (easing) {
        return easing || 'swing';
      }
    };
  }
};
// controls the logic of animation
// easing: easeOutBack, easeOutBounce, easeOutElastic, easeInExpo
animator = function (animations) {
  var experimentEasing = 'easeOutBounce';
  return function (type, opts) {
    var that = this, duration = opts.duration || 400, anim = animations[type](opts.direction, { orientation: this.cfg.animationOrientation }), elLocator = this.cfg.elLocator, exitItems = this.queue.exit(opts.direction);
    $.each(exitItems, function (i, item) {
      var el = item[elLocator]('a');
      el.css({ float: 'left' }).stop().animate(anim.out(el), duration, function () {
        // make sure only to call `enter` once, only call enter when all `out` are finished
        if (exitItems.length === i + 1) {
          $.each(that.queue.enter(opts.direction), function (j, item) {
            var el = item[elLocator]('a');
            el.css(anim.initial(el)).stop().animate(anim['in'](el), duration, anim.easing(experimentEasing));
          });
        }
      });
    });
  };
}(animations);
// managing the timer, and hover event
rotation = {
  register: function (carousel, direction, duration) {
    var interval = carousel.cfg.rotateDuration, intervalHandler;
    return {
      start: function () {
        intervalHandler = setInterval(function () {
          animator.call({
            queue: carousel.queue,
            cfg: carousel.cfg
          }, carousel.cfg.animationEffect, {
            direction: direction,
            duration: duration
          });
        }, interval);
        return this;
      },
      resume: function (ev) {
        // event handler `mouseout`
        this.pause(ev);
        this.start();
      },
      pause: function (ev) {
        // event handler `mouseover`
        clearInterval(intervalHandler);
      }
    };
  }
};
// updates the products
render = function (opts) {
  var that = this, products = this.getProducts();
  /* jshint ignore: start */
  var template = function (selector, index, feed) {
    that.$container.find(that.factory('productProp', index, '_image')).attr('src', feed.image_url);
    that.$container.find(that.factory('productProp', index, '_image')).attr('alt', feed.label);
    that.$container.find(that.factory('productProp', index, '_image_overlay')).html(feed.promotion);
    that.$container.find(that.factory('productProp', index, '_headline')).html(feed.label);
    that.$container.find(that.factory('productProp', index, '_description')).html(feed.description);
    that.$container.find(that.factory('productProp', index, '_bubbles')).html(feed.more_infos);
    that.$container.find(that.factory('productProp', index, '_price_right')).html(feed.price);
    // 160x60
    that.$container.find(that.factory('productProp', index, '_price')).html(feed.price);
    // 728x90
    that.$container.find(that.factory('productProp', index, '_price_right_sub')).html(feed.price_info);
    // 160x60
    that.$container.find(that.factory('productProp', index, '_image_overlay_price_info')).html(feed.price_info);
    // 728x90
    that.$container.find(that.factory('productProp', index, '_price_left')).html(feed.main_info);
    // 160x60
    that.$container.find(that.factory('productProp', index, '_oldprice')).html(feed.main_info);
    // 728x90
    that.$container.find(that.factory('productProp', index, '_deeplink')).attr('href', feed.deeplink);
    that.$container.find(that.factory('productProp', index, '_more_btn')).html(feed.button_text);
    return selector;
  };
  /* jshint ignore: end */
  return $.map(opts.boxes, function (box, index) {
    return template(box, index + 1, products[index]);
  });
};
// controls products of carousel
queue = function (cfg) {
  var that = this, boxes = [], i = -1;
  // dynamic get boxes, `how many` is also dynamic, defined by the `cfg.count`
  while (++i < cfg.count) {
    boxes.push(this.getProduct(i + 1));
  }
  return {
    enter: function (direction) {
      // TODO, here looks hacky
      var products = that.getProducts();
      if (direction === 'backward') {
        that.setProducts(products.slice(cfg.step).concat(products.slice(0, cfg.step)));
      } else {
        that.setProducts(products.slice(0 - cfg.step).concat(products.slice(0, products.length - cfg.step)));
      }
      return render.call(that, { boxes: boxes });
    },
    exit: function (direction) {
      return boxes;
    }
  };
};
_Carousel_ = function (factory, rotation, animator, queue) {
  // constructor
  var Carousel = function (iden, opts) {
    var defaults = {
      // set defaults
      step: 1,
      count: 2,
      elLocator: 'parent',
      rotate: true,
      // flag to activate the auto rotate
      rotateDuration: 4000,
      // interval of the rotation
      duration: 500,
      // duration of the animation
      animationEffect: 'replace',
      animationOrientation: 'vertical'
    };
    this.iden = iden;
    this.cfg = $.extend({}, defaults, opts);
    // merge config with options
    this.factory = factory(iden);
    this.$container = $(this.factory('container'));
    // jQuery object -> the container
    this.isActive = this.$container.length > 0;
    if (this.isActive) {
      this.queue = queue.call(this, this.cfg);
      // create a `queue` object
      if (this.cfg.rotate === true) {
        this.rotation = rotation.register(this, 'forward', this.cfg.duration).start();
      }
      this.attach();
    }
  };
  Carousel.prototype.getProduct = function (boxNr) {
    return $(this.factory('product', boxNr));
  };
  Carousel.prototype.getProducts = function () {
    // get `products`, as how, defined in factory
    this.products = this.factory('products');
    return this.products;
  };
  Carousel.prototype.setProducts = function (v) {
    this.product = this.factory('products', v);
    return this;
  };
  Carousel.prototype.getNavigations = function () {
    // get `navigation` buttons, and store them as `array`
    this.navigators = this.navigators || [
      this.$container.find(this.factory('naviLeft')),
      this.$container.find(this.factory('naviRight'))
    ];
    return this.navigators;
  };
  Carousel.prototype.attach = function () {
    var navigators = this.getNavigations(), that = this;
    // attach on `navigator` click
    $.each(navigators, function (i, item) {
      item.on('click', function () {
        // event handler
        animator.call({
          queue: that.queue,
          cfg: that.cfg
        }, that.cfg.animationEffect, {
          direction: this.className.indexOf('right') !== -1 ? 'forward' : 'backward',
          duration: that.cfg.duration
        });
        that.rotation && that.rotation.pause();
      });
    });
    // attach on hover
    if (this.rotation) {
      this.$container.hover(function (that) {
        return function (ev) {
          return that.rotation.pause(ev);
        };
      }(this), function () {
        return function (ev) {
          return that.rotation.resume(ev);
        };
      }(this));
    }
  };
  return Carousel;
}(idenFactory, rotation, animator, queue);
carouselManager = function (Carousel) {
  var collection = [];
  return {
    init: function (data) {
      $.each(data, function (i, datum) {
        var carousel = new Carousel(datum.iden, datum.config);
        collection.push(carousel);
      });
    },
    get: function () {
      return collection;
    }
  };
}(_Carousel_);
return carouselManager;
}(jQuery));