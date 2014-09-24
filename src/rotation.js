// managing the timer, and hover event
define(['animator'], function(animator) {
    return {
        register: function(carousel, direction, duration) {
            var interval = carousel.cfg.rotateDuration, intervalHandler;

            return {
                start: function() {
                    intervalHandler = setInterval(function() {
                        animator.call({queue: carousel.queue, cfg: carousel.cfg},
                                      carousel.cfg.animationEffect,
                                      {direction: direction, duration: duration}
                                     );
                    }, interval);
                    return this;
                },
                resume: function(ev) { // event handler `mouseout`
                    this.pause(ev);
                    this.start();
                },
                pause: function(ev) { // event handler `mouseover`
                    clearInterval(intervalHandler);
                }
            };
        }
    };
});
