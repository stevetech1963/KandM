define('InventoryDisplay.Global.ItemsKeyMapping', [
    'SC.Configuration',
    'underscore'
], function InventoryDisplayGlobalItemsKeyMapping(
    Configuration,
    _
) {
    'use strict';
    Configuration.itemKeyMapping = Configuration.itemKeyMapping || {};

    _.extend(Configuration.itemKeyMapping, {
        '_showInStockMessageForPDP': function _showInStockMessageForPDP(item) {
            var supportedItemTypes = Configuration.InventoryDisplayGlobal.supportedItemTypes;

            var model = item;
            // ItemType is mostly required for parents
            var childs = item.getSelectedMatrixChilds();
            if (childs && childs.length === 1) {
                model = childs[0];
            }

            return _.contains(supportedItemTypes, model.get('_itemType')) && !model.get('_showOutOfStockMessage');
        },
        '_inStockMessageForPDP': function _inStockMessageForPDP(item) {
           var model = item;
            // ItemType is mostly required for parents
            var childs = item.getSelectedMatrixChilds();
            if (childs && childs.length === 1) {
                model = childs[0];
            }

            if (model.get('isdropshipitem')) {
                return Configuration.InventoryDisplayGlobal.messageDropShip;
            } else if (model.get('isspecialorderitem')) {
                return Configuration.InventoryDisplayGlobal.messageSpecialOrder;
            } else if (model.get('_isBackorderable') && !model.get('_isInStock')) {
                return Configuration.InventoryDisplayGlobal.messageBackOrder;
            }

            return Configuration.InventoryDisplayGlobal.messageInStock;
        }
    });
});