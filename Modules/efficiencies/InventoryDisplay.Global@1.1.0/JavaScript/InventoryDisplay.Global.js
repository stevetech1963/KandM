define('InventoryDisplay.Global', [
    'InventoryDisplay.Global.ItemViews.Stock.View',
    'InventoryDisplay.Global.Model',
    'InventoryDisplay.Global.View',
    'InventoryDisplay.Global.ItemsKeyMapping',
    'ItemDetails.View',
    'PluginContainer',
    'SC.Configuration',
    'jQuery',
    'underscore'
], function InventoryDisplayGlobal(
    InventoryDisplayGlobalItemViewsStockView,
    InventoryDisplayGlobalModel,
    InventoryDisplayGlobalView,
    InventoryDisplayGlobalItemsKeyMapping,
    ItemDetailsView,
    PluginContainer,
    Configuration,
    jQuery,
    _
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            application.Configuration.InventoryDisplayGlobal = Configuration.InventoryDisplayGlobal =
                _.extend(Configuration.inventoryDisplayGlobal,
                SC.ENVIRONMENT.published.InventoryDisplayGlobal_DevConfig);

            ItemDetailsView.prototype.preRenderPlugins =
                ItemDetailsView.prototype.preRenderPlugins || new PluginContainer();

            ItemDetailsView.prototype.preRenderPlugins.install({
                name: 'stock',
                execute: function execute($el) {
                    /*
                    Append on every ItemStock view of ItemDetails.View the div.
                    As there are 2 instances, one for SC Pusher and other for non-mobile views
                    We need to add the class diferentiation
                    Else, we would get the information twice
                    class for the SC Pusher one will be .item-details-options-content-stock-details
                     */
                    $el.find('[data-view="Item.Stock"]').each(function eachPlaceholder() {
                        var myClass = this.className ? (this.className + '-details') : '';
                        jQuery(this).after('<div data-view="Item.InventoryDisplay" class="' + myClass + '"/>');
                    });
                }
            });

            /* Render child in Item.Stock */
            ItemDetailsView.addExtraChildrenViews({
                'Item.Stock': function wrapperStockFunction() {
                    return function childViewItemStoreStock() {
                        return new InventoryDisplayGlobalItemViewsStockView({model: this.model});
                    };
                },
                'Item.InventoryDisplay': function wrapperFunction() {
                    return function childViewItemStoreStockQuantity() {
                        var model;
                        var originalModel = this.model;
                        // ItemType is mostly required for parents
                        var childs = originalModel.getSelectedMatrixChilds();
                        if (childs && childs.length === 1) {
                            originalModel = childs[0];
                        }

                        /*
                        Only if it's an item that is handled by our case (Documented on keymapping)
                        ANd the qty available wasn't already fetched (non-performant. but it happens!)
                         */
                        if (
                            originalModel.get('_showInStockMessageForPDP') &&
                            originalModel.get('_isInStock') &&
                            typeof originalModel.get('quantityavailable') === 'undefined'
                        ) {
                            model = new InventoryDisplayGlobalModel();
                            model.fetch({
                                data: {
                                    id: originalModel.get('internalid')
                                }
                            });
                            model.waitForSync = true;
                        } else {
                            model = originalModel;
                        }

                        return new InventoryDisplayGlobalView({
                            model: model,
                            application: this.application,
                            itemDetailsView: this
                        });
                    };
                }
            });
        }
    };
});