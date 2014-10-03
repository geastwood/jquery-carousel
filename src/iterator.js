define(function() {
    var iterator = function(length, startFromZero) {

        startFromZero = (typeof startFromZero === 'undefined') ? true : false;

        var collection = [], i = -1;
        while (++i < length) {
            collection.push(i);
        }
        var navigate = function(type, step, size) {
            step = step || 1; size = size || 1;
            if (startFromZero === true) {
                step = 0;
                startFromZero = false;
            }
            if (type === 'next') {
                collection = collection.slice((0 - step)).concat(collection.slice(0, collection.length - step));
            } else {
                collection = collection.slice(step).concat(collection.slice(0, step));
            }
            return collection.slice(0, size);
        };

        return {
            next: function(step, size) {
                return navigate('next', step, size);
            },
            prev: function(step, size) {
                return navigate('prev', step, size);
            }
        };
    };

    return iterator;
});
