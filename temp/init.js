var data = [
    {               // 160x600
        iden: 'a23363276cb946490cd990200fd2401d',
        config: { elLocator: 'find' }
    }, {            // 728x90
        iden: '31abc6c6c2927fd4f4355ffbe692bde4',
        config: { rotate: true, count: 3, step: 1 }
    }, {            // 120x600
        iden: '8b99ee2e74b813ad2ce20956e485c105',
        config: { rotate: true, count: 2, step: 1, animationOrientation: 'landscape' }
    }, {            // 300x250
        iden: '4d33ac7b11f6ac49c32703ccfd7e039c',
        config: { rotate: true, count: 2, step: 1, elLocator: 'parents', animationEffect: 'fade' }
    }, {            // 300x600
        iden: '61b874a87f4f7fd232b6eda46b2f11e5',
        config: { rotate: true, count: 2, step: 1, animationOrientation: 'landscape' }
    }, {            // 336x280
        iden: '4b5c1f38286af531a8914e3ea34392df',
        config: { rotate: true, count: 2, step: 1, elLocator: 'parents' }
    }, {            // 970x90
        iden: '7a9fcf304bf530b772d769618243d261',
        config: { rotate: true, count: 4, step: 1 }
    }, {            // 468x60
        iden: 'b47d76b4266371aea2dceca286f40866',
        config: { rotate: true, count: 2, step: 1 }
    }
];

IABannerCarousel.init(data);
// hack
// jshint ignore: start
var noop = function() {};

var overwrite = (function() {
    var map = {
        '160x600'   : 'a23363276cb946490cd990200fd2401d',
        '728x90'    : '31abc6c6c2927fd4f4355ffbe692bde4',
        '120x600'   : '8b99ee2e74b813ad2ce20956e485c105',
        '300x250'   : '4d33ac7b11f6ac49c32703ccfd7e039c',
        '300x600'   : '61b874a87f4f7fd232b6eda46b2f11e5',
        '336x280'   : '4b5c1f38286af531a8914e3ea34392df',
        '970x70'    : '7a9fcf304bf530b772d769618243d261',
        '468x60'    : 'b47d76b4266371aea2dceca286f40866'
    };

    for (var dimension in map) {
        window['_ia_start_rotation_' + map[dimension]] = noop;
        window['_ia_stop_rotation_' + map[dimension]] = noop;
        window['_ia_rotate_both_products_' + map[dimension]] = noop;
        window['_ia_rotate_products_' + map[dimension]] = noop;
    }

})()
