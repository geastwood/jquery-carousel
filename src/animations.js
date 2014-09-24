// animation factory, defines all supported animation
define(function() {
    return {
        fade: function(direction) {
            return {
                initial: function() {
                    return { 'float': 'left', opacity: 0 };
                },
                'in': function() {
                    return { opacity: 1 };
                },
                out: function() {
                    return { opacity: 0 };
                }
            };
        },
        replace: function(direction, opts) {
            var height = 0, width = 0, orientation = (opts && opts.orientation) || 'vertical';

            // TODO, possible refactor
            return {
                initial: function($el) {
                    var config = {
                        'float': 'left',
                        opacity: -5
                    },
                    margin = margin || $el[(orientation === 'vertical' ? 'height' : 'width')]();
                    config[(orientation === 'vertical' ? 'marginTop' : 'marginLeft')] =
                            (direction === 'backward') ? margin : (0 - margin);
                    return config;
                },
                'in': function($el) {
                    var config = { marginTop: 0, opacity: 1 };
                    config[(orientation === 'vertical' ? 'marginTop' : 'marginLeft')] = 0;
                    return config;
                },
                out: function($el) {
                    var config = {
                        'float': 'left',
                        opacity: 0
                    },
                    margin = margin || $el[(orientation === 'vertical' ? 'height' : 'width')]();

                    config[(orientation === 'vertical' ? 'marginTop' : 'marginLeft')] =
                            (direction === 'backward') ? (0 - margin) : (2 * margin);
                    return config;
                }
            };
        }
    };
});
