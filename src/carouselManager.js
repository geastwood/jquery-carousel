define(['./Carousel'], function(Carousel) {
    var collection = [];

    return {
        init: function(data) {
            $.each(data, function(i, datum) {
                var carousel = new Carousel(datum.iden, datum.config);
                collection.push(carousel);
            });
        },
        get: function() {
            return collection;
        }
    };
});
