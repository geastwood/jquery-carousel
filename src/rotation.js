// managing the timer, and hover event
define(['src/animator'], function(animator) {
    return {
        debug: function() {
            console.log(animator);
        },
        register: function(carousel, direction) {
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
