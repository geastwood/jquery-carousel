// updates the products
define(function() {
    return function(boxIndex, productIndex) {
        var that = this, products = this.getProducts();

        /* jshint ignore: start */
        // some properties from feed are used twice due to different template
        var template = function(number, feed) {

            that.$container.find(that.select('productProp', number, '_image')).attr('src', feed.image_url);
            that.$container.find(that.select('productProp', number, '_image')).attr('alt', feed.label);
            that.$container.find(that.select('productProp', number, '_image_overlay')).html(feed.promotion);
            that.$container.find(that.select('productProp', number, '_headline')).html(feed.label);
            that.$container.find(that.select('productProp', number, '_description')).html(feed.description);
            that.$container.find(that.select('productProp', number, '_bubbles')).html(feed.more_infos);
            that.$container.find(that.select('productProp', number, '_price_right')).html(feed.price);
            that.$container.find(that.select('productProp', number, '_price')).html(feed.price);
            that.$container.find(that.select('productProp', number, '_price_right_sub')).html(feed.price_info);
            that.$container.find(that.select('productProp', number, '_image_overlay_price_info')).html(feed.price_info);
            that.$container.find(that.select('productProp', number, '_price_left')).html(feed.main_info);
            that.$container.find(that.select('productProp', number, '_oldprice')).html(feed.main_info);
            that.$container.find(that.select('productProp', number, '_deeplink')).attr('href', feed.deeplink);
            that.$container.find(that.select('productProp', number, '_more_btn')).html(feed.button_text);

        };
        /* jshint ignore: end */

        return template(boxIndex + 1, products[productIndex]);
    };
});
