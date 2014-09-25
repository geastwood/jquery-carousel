// TEMP
IABannerCarousel.init();
// hack
// jshint ignore: start
var noop = function() {};

var overwrite = (function() {
    var map = {
        '160x600'   : 'a23363276cb946490cd990200fd2401d',
        '728x90'    : '31abc6c6c2927fd4f4355ffbe692bde4',
        '120x600'   : '8b99ee2e74b813ad2ce20956e485c105',
        '300x250'   : '4d33ac7b11f6ac49c32703ccfd7e039c'
    };

    for (var dimension in map) {
        window['_ia_start_rotation_' + map[dimension]] = noop;
        window['_ia_stop_rotation_' + map[dimension]] = noop;
        window['_ia_rotate_both_products_' + map[dimension]] = noop;
        window['_ia_rotate_products_' + map[dimension]] = noop;
    }

})()
