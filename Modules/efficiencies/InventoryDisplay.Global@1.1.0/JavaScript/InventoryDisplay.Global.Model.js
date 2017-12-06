define('InventoryDisplay.Global.Model', [
    'ItemDetails.Model',
    'underscore'
], function defineInventoryDisplayModelGlobal(
    ItemDetailsModel,
    _
) {
    'use strict';

    var fields = [
        'internalid',
        'itemid',
        'itemtype',
        'quantityavailable',
        'isinstock',
        'isbackorderable',
        'ispurchasable',
        'isfulfillable',
        'showoutofstockmessage',
        'stockdescription',
        'isdropshipitem',
        'isspecialorderitem'
    ];

    var InventoryDisplayModelGlobal = ItemDetailsModel.extend({
        initialize: function initialize() {
            ItemDetailsModel.prototype.initialize.apply(this, arguments);

            InventoryDisplayModelGlobal.prototype.searchApiMasterOptions = _.omit(
                InventoryDisplayModelGlobal.prototype.searchApiMasterOptions,
                ['include', 'fieldset']
            );

            InventoryDisplayModelGlobal.prototype.searchApiMasterOptions.fields = fields.join(',');
        }
    });

    return InventoryDisplayModelGlobal;
});