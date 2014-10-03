// controls products of carousel
define(function() {
    return function(cfg) {
        var that = this, boxes = [], i = -1;

        // dynamic get boxes, `how many` is also dynamic, defined by the `cfg.count`
        while (++i < cfg.count) {
            boxes.push(this.getProduct(i + 1));
        }

        return {
            enter: function(direction) {
                var products = that.getProducts(), newProducts;

                if (direction === 'backward') {
                    newProducts = products.slice(cfg.step).concat(products.slice(0, cfg.step));
                } else {
                    newProducts = products.slice((0 - cfg.step)).concat(products.slice(0, products.length - cfg.step));
                }

                that.setProducts(newProducts);

                return boxes;
            },
            exit: function(direction) {
                return boxes;
            }
        };
    };
});
