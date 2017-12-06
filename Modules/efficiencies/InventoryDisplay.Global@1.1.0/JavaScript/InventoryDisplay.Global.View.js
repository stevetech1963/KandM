define('InventoryDisplay.Global.View', [
    'Backbone',
    'jQuery',
    'inventory_display_global.tpl'
], function InventoryDisplayGlobalView(
    Backbone,
    jQuery,
    inventoryDisplayGlobalTpl
) {
    'use strict';

    return Backbone.View.extend({
        template: inventoryDisplayGlobalTpl,
        shouldRender: false,
        initialize: function initialize() {
            if (this.model.waitForSync && this.model.isNew()) {
                this.listenTo(this.model, 'sync', jQuery.proxy(function onSync() {
                    this.shouldRender = true;
                    this.render();
                }, this));
            } else {
                this.shouldRender = true;
            }
        },
        render: function render() {
            if (this.shouldRender) {
                this._render();
            }
        },
        getContext: function getContext() {
            return {
                stockAvailable: this.model.get('quantityavailable'),
                fieldAvailable: (typeof this.model.get('quantityavailable') !== 'undefined') &&
                    this.model.get('quantityavailable') !== 0
            };
        }
    });
});