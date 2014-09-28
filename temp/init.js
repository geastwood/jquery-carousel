var data = [
    {               // 160x600
        iden: 'a23363276cb946490cd990200fd2401d',
        config: { elLocator: 'find' }
    }, {            // 728x90
        iden: '31abc6c6c2927fd4f4355ffbe692bde4',
        config: { rotate: true, count: 3, step: 1 }
    }, {            // 120x600
        iden: '8b99ee2e74b813ad2ce20956e485c105',
        config: { rotate: true, count: 2, step: 1, orientation: 'landscape' }
    }, {            // 300x250
        iden: '4d33ac7b11f6ac49c32703ccfd7e039c',
        config: { rotate: true, count: 2, step: 1, elLocator: 'parents', effect: 'fade' }
    }, {            // 300x600
        iden: '61b874a87f4f7fd232b6eda46b2f11e5',
        config: { rotate: true, count: 2, step: 1, orientation: 'landscape' }
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

var mock = function(iden) {
    var interpolate = function(template, data) {
        return template.replace(/{{(\S+)}}/g, function(a, b) {
            return data[b];
        });
    };

    var containerTemplate = '' +
        '<form class="form-horizontal" role="form">' +
            '<div class="form-group">' +
                '<label class="col-sm-4 control-label">Easing</label>' +
                '<div class="col-sm-8">' +
                    '<select data-name="easing" class="carousel-config form-control">{{easing}}</select>' +
                '</div>' +
            '</div>' +
            '<div class="form-group">' +
                '<label class="col-sm-4 control-label">Effect</label>' +
                '<div class="col-sm-8">' +
                    '<select data-name="effect" class="carousel-config form-control">{{effect}}</select>' +
                '</div>' +
            '</div>' +
            '<div class="form-group">' +
                '<label class="col-sm-4 control-label">Orientation</label>' +
                '<div class="col-sm-8">' +
                    '<select data-name="orientation" class="carousel-config form-control">{{orientation}}</select>' +
                '</div>' +
            '</div>' +
            '<div class="form-group">' +
                '<label class="col-sm-4 control-label">Duration (ms)</label>' +
                '<div class="col-sm-8">' +
                    '<select data-name="duration" class="carousel-config form-control">{{duration}}</select>' +
                '</div>' +
            '</div>' +
            '<div class="form-group">' +
                '<label class="col-sm-4 control-label">Auto rotation</label>' +
                '<div class="col-sm-8">' +
                    '<p class="form-control-static">{{rotate}}</p>' +
                '</div>' +
            '</div>' +
            '<div class="form-group">' +
                '<label class="col-sm-4 control-label">Rotation Interval</label>' +
                '<div class="col-sm-8">' +
                    '<p class="form-control-static">{{rotateInterval}}</p>' +
                '</div>' +
            '</div>' +
        '</form>';

    var generateOptions = function(coll, useIndex, activeValue) {
        var template = '';

        $.each(coll, function(index, item) {
            var key = useIndex ? index : item;
            template = template + ('<option value="' + key +'"' + (activeValue === key ? ' selected="true"' : '') +'>' +
                                   key +
                                   '</option>'
                                  );
        });

        return template;
    };
    var easing = function(v) {
        return generateOptions($.easing, true, v);
    };
    var effect = function(v) {
        return generateOptions(['fade', 'replace'], false, v);
    };
    var orientation = function(v) {
        return generateOptions(['landscape', 'vertical'], false, v);
    };
    var duration = function(v) {
        return generateOptions([200, 300, 500, 800, 1000], false, v);
    };

    return {
        setup: function() {
            var container, id = 'interaction';

            if ((container = $('#' + id).length)) {
                return container;
            }

            container = $('<div>', {
                id: id,
            }).appendTo(document.body);

            return container;
        },
        render: function(data) {
            var carousel = IABannerCarousel.get(iden), container = this.setup();
            container.html(interpolate(containerTemplate, {
                easing: easing(carousel.cfg.easing),
                effect: effect(carousel.cfg.effect),
                orientation: orientation(carousel.cfg.orientation),
                duration: duration(carousel.cfg.duration),
                rotate: carousel.cfg.rotate === true ? 'Yes' : 'No',
                rotateInterval: carousel.cfg.rotateInterval
            }));
            this.attach(container, carousel);
        },
        // attach `event` on `combo` change
        attach: function(container, carousel) {
            container.on('change', '.carousel-config', function() {
                var el, propName = (el = $(this)).data('name'), val = el.val();
                if (propName === 'duration') {
                    val = parseInt(val, 10);
                }
                carousel.cfg[propName] = val;
            });
        }
    };
};

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
    }, selector, dimension, noop = function() {}, iden;

    for (dimension in map) {
        iden = map[dimension];
        window['_ia_start_rotation_' + iden] = noop;
        window['_ia_stop_rotation_' + iden] = noop;
        window['_ia_rotate_both_products_' + iden] = noop;
        window['_ia_rotate_products_' + iden] = noop;

        // DONT DELETE, in order to layout the preview correctly
        selector = $('.ia-' + iden + '-main_div');
        if (selector.length) {
            selector.css('float', 'left');
            mock(iden).render();
        }

    }

})();
