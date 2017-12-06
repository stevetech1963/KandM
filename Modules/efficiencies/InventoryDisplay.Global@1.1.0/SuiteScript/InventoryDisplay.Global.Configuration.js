define('InventoryDisplay.Global.Configuration', [
    'Configuration',
    'underscore'
], function InventoryDisplayGlobalConfiguration(
    Configuration,
    _
) {
    'use strict';

    var InventoryDisplayConfiguration = {
        /*
         Only InventoryPart have Correct information about quantity available
         Kits have a weird calculation that seems buggy
         */
        supportedItemTypes: ['InvtPart']
    };

    _.extend(InventoryDisplayConfiguration, {
        get: function get() {
            return this;
        }
    });

    if (!Configuration.publish) {
        Configuration.publish = [];
    }

    Configuration.publish.push({
        key: 'InventoryDisplayGlobal_DevConfig',
        model: 'InventoryDisplay.Global.Configuration',
        call: 'get'
    });

    return InventoryDisplayConfiguration;
});