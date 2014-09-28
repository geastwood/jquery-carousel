define(function() {
    // timer
    // by calling `register` return a new timer which has three functions
    // 1) start     -> start the timer, create a `interval` job
    // 2) resume    -> resume the job (by creating the same job but with different `interval id`
    // 3) pause     -> pause the `job`  (clear the interval handler)
    return {
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
