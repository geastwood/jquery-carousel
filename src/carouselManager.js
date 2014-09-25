define(['./Carousel'], function(Carousel) {

    return {
        init: function(data) {
            $.each(data, function(i, datum) {
                new Carousel(datum.iden, datum.config);
            });
        }
    };

});
