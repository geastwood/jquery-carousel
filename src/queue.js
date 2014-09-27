// controls products of carousel
define(['src/render'], function(render) {
    return function(cfg) {
        var that = this, boxes = [], i = -1;
        // dynamic get boxes, `how many` is also dynamic, defined by the `cfg.count`
        while (++i < cfg.count) {
            boxes.push(this.getProduct(i + 1));
        }

        return {
            enter: function(direction) {
                // TODO, here looks hacky
                var products = that.getProducts();
                if (direction === 'backward') {
                    that.setProducts(products.slice(cfg.step).concat(products.slice(0, cfg.step)));
                } else {
                    that.setProducts(products.slice((0 - cfg.step)).concat(products.slice(0, products.length - cfg.step)));
                }
                return render.call(that, {boxes: boxes});
            },
            exit: function(direction) {
                return boxes;
            }
        };
    };
});
