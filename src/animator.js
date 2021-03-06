// controls the logic of animation
// easing: easeOutBack, easeOutBounce, easeOutElastic, easeInExpo
define(['src/animations', 'src/render'], function(animations, render) {

    return function(type, direction) {
        var that = this,
            anim = animations[type](direction, this.cfg),
            elLocator = this.cfg.elLocator,
            exitItems = this.queue.exit(direction);

        $.each(exitItems, function(i, item) {
            var el = item[elLocator]('a');
            el.css({float: 'left'}).stop().animate(anim.out(el), that.cfg.duration, function() {

                var enterObj;
                 // make sure only to call `enter` once, only call enter when all `out` are finished
                if (exitItems.length === i + 1) {
                    enterObj = that.queue.enter(direction);
                    $.each(enterObj.boxes, function(j, item) {
                        var el = item[elLocator]('a');
                        render.call(that, j, enterObj.productIndexes.shift()); // update the markup
                        el.css(anim.initial(el))
                            .stop()
                            .animate(anim['in'](el), that.cfg.duration, anim.easing(that.cfg.easing));
                    });
                }
            });
        });
    };
});
