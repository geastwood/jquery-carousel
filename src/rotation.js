// managing the timer, and hover event
define(['./animator'], function(animator) {
    return {
        register: function(carousel, direction, duration) {
            var intervalHandler;

            return {
                start: function() {
                    intervalHandler = setInterval(function() {
                        animator.call({queue: carousel.queue, cfg: carousel.cfg},
                                      carousel.cfg.effect, direction);
                    }, carousel.cfg.rotateInterval);
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
