define('GiftWrap.LiveOrder.Hooks', [
    'Application',
    'underscore'
], function InStorePickupHooks(
    Application,
    _
) {
    'use strict';

    Application.on('before:LiveOrder.addLine',
        function beforeLiveOrderAddLineGiftWrap(Model, currentLine) {
            Model.addGiftWrap(currentLine);
        });

    Application.on('before:LiveOrder.addLines',
        function beforeLiveOrderAddLinesGiftWrap(Model, lines) {
            Model.addGiftWraps(lines);
        });

    Application.on('before:LiveOrder.removeLine',
        function beforeLiveOrderRemoveLine(Model, currentLine) {
            Model.removeGiftWrap(currentLine);
        });

    Application.on('before:LiveOrder.updateLine',
        function beforeLiveOrderUpdateLine(Model, lineid, line) {
            if (line.options && !line.options.custcol_ef_gw_giftwrap) {
                delete line.options.custcol_ef_gw_id;
                delete line.options.custcol_ef_gw_message;
            }
        });
});
