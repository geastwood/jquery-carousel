// controls the logic of animation
// easing: easeOutBack, easeOutBounce, easeOutElastic, easeInExpo
define(['./animations'], function(animations) {

    return function(type, opts) {
        var that = this, duration = opts.duration || 400,
            anim = animations[type](opts.direction, {orientation: this.cfg.animationOrientation}),
            elLocator = this.cfg.elLocator,
            exitItems = this.queue.exit(opts.direction);

        $.each(exitItems, function(i, item) {
            var el = item[elLocator]('a');
            el.css({float: 'left'}).stop().animate(anim.out(el), duration, function() {
                 // make sure only to call `enter` once, only call enter when all `out` are finished
                if (exitItems.length === i + 1) {
                    $.each(that.queue.enter(opts.direction), function(j, item) {
                        var el = item[elLocator]('a');
                        el.css(anim.initial(el)).stop().animate(anim['in'](el), duration, anim.easing('easeOutBounce'));
                    });
                }
            });
        });
    };
});
