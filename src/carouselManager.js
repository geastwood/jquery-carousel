define(['src/Carousel'], function(Carousel) {
    // keep all initiated carousel instance
    var collection = [];

    return {
        // init all carousel with passed data
        // push the instance to collection
        init: function(data) {
            $.each(data, function(i, datum) {
                var carousel = new Carousel(datum.iden, datum.config);
                collection.push(carousel);
            });
        },
        // search in carousel collection, find any carousel instance
        // whose `iden` matches the passed `iden`
        get: function(iden) {
            var rst = null;
            $.each(collection, function(i, item) {
                if (item.iden === iden) {
                    rst = item;
                }
            });
            return rst;
        }
    };
});
