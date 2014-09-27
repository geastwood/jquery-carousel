// managing the timer, and hover event
define(['src/animator'], function(animator) {
    return {
        debug: function() {
            console.log(animator);
        },
        register: function() {
            var intervalHandler, args = arguments;

            return {
                start: function() {
                    intervalHandler = setInterval.apply(null, args);
                    return this;
                },
                resume: function() {
                    this.pause();
                    this.start();
                },
                pause: function() {
                    clearInterval(intervalHandler);
                }
            };
        }
    };
});
