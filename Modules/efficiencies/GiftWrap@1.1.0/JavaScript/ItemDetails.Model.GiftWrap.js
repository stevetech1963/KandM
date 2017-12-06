define('ItemDetails.Model.GiftWrap', [
    'ItemDetails.Model',
    'GiftWrap.ItemCollection',
    'underscore',
    'jQuery'
], function ItemDetailsModelGiftWrap(
    ItemModel,
    GiftWrapCollection,
    _,
    jQuery
) {
    'use strict';
    _.extend(ItemModel.prototype, {
        initialize: _.wrap(ItemModel.prototype.initialize, function initialize(fn) {
            fn.apply(this, _.toArray(arguments).slice(1));
            this.giftWrapItems = new GiftWrapCollection();
        }),
        shouldEnableGiftMessage: function shouldEnableGiftMessage() {
            // This is a shorthand to find out if we should ask for a Gift Message
            // (it's only if there is a giftwrap set)
            return this.getOption('custcol_ef_gw_giftwrap');
        },
        fetch: _.wrap(ItemModel.prototype.fetch, function fetch(fn, options) {
            var originalResponse = fn.apply(this, [options]);
            var giftWrapItemsResponse = this.giftWrapItems.fetch();
            var promise = jQuery.Deferred();
            var self = this;

            // Return a promise that is a combination of fetching the original item and the gift wrap collection
            jQuery.when(originalResponse, giftWrapItemsResponse).then(function then(data) {
                promise.resolveWith(self, [data[0]]);
            });

            return promise;
        })
    });
});