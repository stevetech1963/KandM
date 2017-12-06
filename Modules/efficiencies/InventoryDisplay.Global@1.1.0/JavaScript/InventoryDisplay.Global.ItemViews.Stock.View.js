define('InventoryDisplay.Global.ItemViews.Stock.View', [
    'ItemViews.Stock.View',
    'SC.Configuration',
    'underscore'
], function defineInventoryDisplayGlobalItemViewsStockView(
    ItemViewsStockView,
    Configuration,
    _
) {
    'use strict';
    return ItemViewsStockView.extend({
        getContext: function getContext() {
            var originalContext = ItemViewsStockView.prototype.getContext.apply(this, arguments);
            originalContext.showInStockMessage = this.model.get('_showInStockMessageForPDP', true);
            originalContext.stockInfo.inStockMessage = this.model.get('_inStockMessageForPDP', true);
            return originalContext;
        }
    });
});