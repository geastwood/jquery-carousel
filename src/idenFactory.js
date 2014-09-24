define(function() {
    var slice = [].slice, join = [].join;
    var factory = function(iden) {
        var store = window;

        var collection = {
            product: function(boxNr) {
                return '#ia_' + iden + '-product-box' + boxNr;
            },
            products: function(v) {
                if (arguments.length === 1) {
                    store['ia_products_' + iden] = v;
                }
                return store['ia_products_' + iden];
            },
            container: function() {
                return '.ia-' + iden + '-main_div';
            },
            naviLeft: function() {
                return '.ia-' + iden + '-paging-arrow-left';
            },
            naviRight: function() {
                return '.ia-' + iden + '-paging-arrow-right';
            },
            productProp: function() {
                return '#ia_' + iden + '_prod' + join.call(arguments, '');
            }
        };

        return function() {
            return collection[arguments[0]].apply(null, slice.call(arguments, 1));
        };
    };
    return factory;
});
