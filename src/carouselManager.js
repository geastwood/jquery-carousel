define(['./Carousel'], function(Carousel) {
    var collection = [];

    return {
        init: function(data) {
            $.each(data, function(i, datum) {
                var carousel = new Carousel(datum.iden, datum.config);
                collection.push(carousel);
            });
        },
        get: function(iden) {
            var rst;
            $.each(collection, function(i, item) {
                if (item.iden === iden) {
                    rst = item;
                }
            });
            return rst;
        }
    };
});
