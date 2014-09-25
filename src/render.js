// updates the products
define(function() {
    return function(opts) {
        var that = this, products = this.getProducts();

        /* jshint ignore: start */
        var template = function(selector, index, feed) {

            // 160x600
            that.$container.find(that.factory('productProp', index, '_image')).attr('src', feed.image_url);
            that.$container.find(that.factory('productProp', index, '_image')).attr('alt', feed.label);
            that.$container.find(that.factory('productProp', index, '_image_overlay')).html(feed.promotion);
            that.$container.find(that.factory('productProp', index, '_headline')).html(feed.label);
            that.$container.find(that.factory('productProp', index, '_description')).html(feed.description);
            that.$container.find(that.factory('productProp', index, '_bubbles')).html(feed.more_infos);
            that.$container.find(that.factory('productProp', index, '_price_right')).html(feed.price); // 160x60
            that.$container.find(that.factory('productProp', index, '_price')).html(feed.price); // 728x90
            that.$container.find(that.factory('productProp', index, '_price_right_sub')).html(feed.price_info); // 160x60
            that.$container.find(that.factory('productProp', index, '_image_overlay_price_info')).html(feed.price_info); // 728x90
            that.$container.find(that.factory('productProp', index, '_price_left')).html(feed.main_info); // 160x60
            that.$container.find(that.factory('productProp', index, '_oldprice')).html(feed.main_info); // 728x90
            that.$container.find(that.factory('productProp', index, '_deeplink')).attr('href', feed.deeplink);
            that.$container.find(that.factory('productProp', index, '_more_btn')).html(feed.button_text);

            return selector;
        };
        /* jshint ignore: end */

        return $.map(opts.boxes, function(box, index) {
            return template(box, index + 1, products[index]);
        });
    };
});
