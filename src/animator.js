// controls the logic of animation
define(['./animations'], function(animations) {

    return function(type, opts) {
        var that = this,
            duration = opts.duration || 400,
            anim = animations[type](opts.direction, {orientation: this.cfg.animationOrientation}),
            elLocator = this.cfg.elLocator;

        this.queue.exit(opts.direction).forEach(function(item, index, arr) {
            var el = item[elLocator]('a');
            el.css({float: 'left'}).stop().animate(anim.out(el), duration, function() {
                 // make sure only to call `enter` once, only call enter when all `out` are finished
                if (arr.length === index + 1) {
                    that.queue.enter(opts.direction).forEach(function(item) {
                        var el = item[elLocator]('a');
                        el.css(anim.initial(el)).stop().animate(anim['in'](el), duration);
                    });
                }
            });
        });
    };
});
