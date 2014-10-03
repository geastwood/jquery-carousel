// controls products of carousel
define(['src/iterator'], function(iterator) {
    return function(cfg) {
        var that = this, boxes = [], i = -1;

        // dynamic get boxes, `how many` is also dynamic, defined by the `cfg.count`
        while (++i < cfg.count) {
            boxes.push(this.getBox(i + 1));
        }

        var productIterator = iterator(that.getProducts().length, false);
        var boxIterator = iterator(boxes.length);

        return {
            enter: function(direction) {
                if (direction === 'backward') {
                    return {boxes: boxes, productIndexes: productIterator.prev(cfg.step, cfg.count)};
                }
                return {boxes: boxes, productIndexes: productIterator.next(cfg.step, cfg.count)};

            },
            exit: function(direction) {
                return boxes;
                /*
                return boxIterator.prev(1, 1).map(function(i) {
                    console.log(i);
                    return boxes[i];
                });
                */
            }
        };
    };
});
