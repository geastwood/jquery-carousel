;var IABannerCarousel = (function($) {
// handle how concat complicate `id` attribute
var src_idenFactory, src_rotation, src_animations, src_animator, src_render, src_queue, src_Carousel, src_carouselManager;
src_idenFactory = function () {
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
      // some methods from `collection` need addition parameters
      return collection[arguments[0]].apply(null, slice.call(arguments, 1));
    };
  };
  return factory;
}();
src_rotation = {
  register: function () {
    var intervalHandler, args = arguments;
    return {
      start: function () {
        // pls don't change this line to `setInterval.apply(null, args) for IE8 compatibility reason
        intervalHandler = setInterval(args[0], args[1]);
        return this;
      },
      resume: function () {
        this.pause();
        this.start();
      },
      pause: function () {
        clearInterval(intervalHandler);
      }
    };
  }
};
// animation factory, defines all supported animation
src_animations = {
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
    return {
      initial: function ($el) {
        var config = {
            'float': 'left',
            opacity: -5
          }, margin = margin || $el[opts.orientation === 'vertical' ? 'height' : 'width']();
        // add margin `10` pixels to avoid flashing
        config[opts.orientation === 'vertical' ? 'marginTop' : 'marginLeft'] = direction === 'backward' ? margin / 2 : 0 - margin / 2 + 10;
        return config;
      },
      'in': function ($el) {
        var config = { opacity: 1 };
        config[opts.orientation === 'vertical' ? 'marginTop' : 'marginLeft'] = 0;
        return config;
      },
      out: function ($el) {
        var config = {
            'float': 'left',
            opacity: 0
          }, margin = margin || $el[opts.orientation === 'vertical' ? 'height' : 'width']();
        config[opts.orientation === 'vertical' ? 'marginTop' : 'marginLeft'] = direction === 'backward' ? 0 - margin : margin;
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
src_animator = function (animations) {
  return function (type, direction) {
    var that = this, anim = animations[type](direction, this.cfg), elLocator = this.cfg.elLocator, exitItems = this.queue.exit(direction);
    $.each(exitItems, function (i, item) {
      var el = item[elLocator]('a');
      el.css({ float: 'left' }).stop().animate(anim.out(el), that.cfg.duration, function () {
        // make sure only to call `enter` once, only call enter when all `out` are finished
        if (exitItems.length === i + 1) {
          $.each(that.queue.enter(direction), function (j, item) {
            var el = item[elLocator]('a');
            el.css(anim.initial(el)).stop().animate(anim['in'](el), that.cfg.duration, anim.easing(that.cfg.easing));
          });
        }
      });
    });
  };
}(src_animations);
// updates the products
src_render = function (opts) {
  var that = this, products = this.getProducts();
  /* jshint ignore: start */
  // some properties from feed are used twice due to different template
  var template = function (selector, number, feed) {
    that.$container.find(that.select('productProp', number, '_image')).attr('src', feed.image_url);
    that.$container.find(that.select('productProp', number, '_image')).attr('alt', feed.label);
    that.$container.find(that.select('productProp', number, '_image_overlay')).html(feed.promotion);
    that.$container.find(that.select('productProp', number, '_headline')).html(feed.label);
    that.$container.find(that.select('productProp', number, '_description')).html(feed.description);
    that.$container.find(that.select('productProp', number, '_bubbles')).html(feed.more_infos);
    that.$container.find(that.select('productProp', number, '_price_right')).html(feed.price);
    that.$container.find(that.select('productProp', number, '_price')).html(feed.price);
    that.$container.find(that.select('productProp', number, '_price_right_sub')).html(feed.price_info);
    that.$container.find(that.select('productProp', number, '_image_overlay_price_info')).html(feed.price_info);
    that.$container.find(that.select('productProp', number, '_price_left')).html(feed.main_info);
    that.$container.find(that.select('productProp', number, '_oldprice')).html(feed.main_info);
    that.$container.find(that.select('productProp', number, '_deeplink')).attr('href', feed.deeplink);
    that.$container.find(that.select('productProp', number, '_more_btn')).html(feed.button_text);
    return selector;
  };
  /* jshint ignore: end */
  return $.map(opts.boxes, function (box, index) {
    return template(box, index + 1, products[index]);
  });
};
// controls products of carousel
src_queue = function (render) {
  return function (cfg) {
    var that = this, boxes = [], i = -1;
    // dynamic get boxes, `how many` is also dynamic, defined by the `cfg.count`
    while (++i < cfg.count) {
      boxes.push(this.getProduct(i + 1));
    }
    return {
      enter: function (direction) {
        var products = that.getProducts(), newProducts;
        if (direction === 'backward') {
          newProducts = products.slice(cfg.step).concat(products.slice(0, cfg.step));
        } else {
          newProducts = products.slice(0 - cfg.step).concat(products.slice(0, products.length - cfg.step));
        }
        that.setProducts(newProducts);
        return render.call(that, { boxes: boxes });
      },
      exit: function (direction) {
        return boxes;
      }
    };
  };
}(src_render);
src_Carousel = function (factory, rotation, animator, queue) {
  // constructor
  var Carousel = function (iden, opts) {
    var defaults = {
        // set defaults
        step: 1,
        count: 2,
        elLocator: 'parent',
        rotate: true,
        // flag to activate the auto rotate
        rotateInterval: 5000,
        // interval of the rotation
        duration: 500,
        // duration of the animation
        effect: 'replace',
        easing: 'easeOutBounce',
        orientation: 'vertical'
      }, that = this;
    this.iden = iden;
    this.cfg = $.extend({}, defaults, opts);
    // merge config with options
    this.select = factory(iden);
    // create a `select` factory function for this `carousel`
    this.$container = $(this.select('container'));
    // jQuery object -> the container
    this.isActive = this.$container.length > 0;
    if (this.isActive) {
      // only create `queue` and attach event if this `carousel` is active
      // TODO, extract to a method
      this.queue = queue.call(this, this.cfg);
      // create a `queue` object
      if (this.cfg.rotate === true) {
        this.rotation = rotation.register(function () {
          animator.call({
            queue: that.queue,
            cfg: that.cfg
          }, that.cfg.effect, 'forward');
        }, this.cfg.rotateInterval).start();
      }
      this.attach();
    }
  };
  Carousel.prototype.getProduct = function (boxNr) {
    return $(this.select('product', boxNr));
  };
  Carousel.prototype.getProducts = function () {
    // get `products`, as how, defined in factory
    this.products = this.select('products');
    return this.products;
  };
  Carousel.prototype.setProducts = function (v) {
    this.product = this.select('products', v);
    return this;
  };
  Carousel.prototype.getNavigations = function () {
    // get `navigation` buttons, and store them as `array`
    this.navigators = this.navigators || [
      this.$container.find(this.select('naviLeft')),
      this.$container.find(this.select('naviRight'))
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
        }, that.cfg.effect, this.className.indexOf('right') !== -1 ? 'forward' : 'backward');
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
}(src_idenFactory, src_rotation, src_animator, src_queue);
src_carouselManager = function (Carousel) {
  // keep all initiated carousel instance
  var collection = [];
  return {
    // init all carousel with passed data
    // push the instance to collection
    init: function (data) {
      $.each(data, function (i, datum) {
        var carousel = new Carousel(datum.iden, datum.config);
        collection.push(carousel);
      });
    },
    // search in carousel collection, find any carousel instance
    // whose `iden` matches the passed `iden`
    get: function (iden) {
      var rst = null;
      $.each(collection, function (i, item) {
        if (item.iden === iden) {
          rst = item;
        }
      });
      return rst;
    }
  };
}(src_Carousel);
return src_carouselManager;
}(jQuery));