define('GiftWrap.Cart.Actionable.View', [
    'Backbone',
    'item_view_cart_actionable.tpl',
    'underscore'
], function GiftWrapCartActionableView(
    Backbone,
    Template,
    _
) {
    'use strict';

    return Backbone.View.extend({
        template: Template,

        initialize: function initialize(options) {
            this.model = options.model;
            this.item = this.model.get('item');
            this.model.set({hasGiftwrap: _.has(this.item.itemOptions, 'custcol_ef_gw_id')});
        },

        getContext: function getContext() {
            return {
                hasGiftwrap: this.model.get('hasGiftwrap'),
                item: this.item,
                hideOption: this.model.get('type') || false
            };
        }
    });
});