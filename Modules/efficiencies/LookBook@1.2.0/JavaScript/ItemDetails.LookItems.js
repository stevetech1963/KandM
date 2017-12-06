define('ItemDetails.LookItems', [
    'ItemDetails.View.LookItems',
    'ItemDetails.View',
    'Backbone',
    'PluginContainer',
    'Utils',
    'underscore'
], function ItemDetailsLookItems(
    ItemDetailsLookItems,
    ItemView,
    Backbone,
    PluginContainer,
    Utils,
    _
) {
    'use strict';

    _.extend(ItemView.prototype.childViews, {
        'Item.LookItems': function ItemLookItems() {
            return new ItemDetailsLookItems({
                model: this.model,
                application: this.application
            });
        }
    });

    return {
        mountToApp: function mountToApp() {
            ItemView.prototype.initialize = _.wrap(ItemView.prototype.initialize, function initialize(fn) {
                var renderWhere = '.item-details-more-info-content';
                fn.apply(this, _.toArray(arguments).slice(1));
                this.on('afterViewRender', function afterViewRender() {
                    this.$(renderWhere).after('<div data-view="Item.LookItems"/>');
                });
            });
        }
    };
});