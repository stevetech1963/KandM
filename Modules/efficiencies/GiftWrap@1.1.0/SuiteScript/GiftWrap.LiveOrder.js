
define('GiftWrap.LiveOrder', [
    'Application',
    'Models.Init',
    'Utils',
    'LiveOrder.Model',
    'underscore'
], function LiveOrderGiftWrap(
    Application,
    CommerceAPI,
    Utils,
    LiveOrder,
    _
) {
    'use strict';

    var idGenerator = function idGenerator(qty) {
        return (Math.random().toString(36) + '00000000000000000').slice(2, qty + 2);
    };
    _.extend(LiveOrder, {
        tweakLinesGetGiftWrap: function tweakLinesGetGiftWrap(currentLine) {
            var generatedId;
            var generatedIdNL;
            var generatedIdOld;
            var giftItemId;
            var newLine;

            if (currentLine && currentLine.options && currentLine.options.custcol_ef_gw_giftwrap) {
                generatedId = idGenerator(8);
                generatedIdNL = new String('G:' + generatedId).toString(); // HACKS for weird platform bugs with strings
                generatedIdOld = new String('P:' + generatedId).toString(); // HACKS for weird platform bugs
                giftItemId = currentLine.options.custcol_ef_gw_giftwrap;
                newLine = {
                    item: {
                        internalid: parseInt(giftItemId, 10)
                    },
                    quantity: currentLine.quantity,
                    options: {
                        custcol_ef_gw_id: generatedIdNL
                    }
                };

                currentLine.options.custcol_ef_gw_id = generatedIdOld;
                return newLine;
            }
            return null;
        },
        addGiftWraps: function addGiftWraps(lines) {
            var currentLine;
            var giftWrapLine;

            if (_.isArray(lines) && lines.length === 1) { // Only 1 line add to cart support right now
                         currentLine = lines[0];
                giftWrapLine = this.tweakLinesGetGiftWrap(currentLine);

                if (giftWrapLine) {
                    lines[1] = giftWrapLine;
                    Application.once('after:LiveOrder.addLines', function(Model, responseData) {
                        if (responseData) {
                            CommerceAPI.context.setSessionObject('latest_addition', currentLine.orderitemid);
                        }
                    });
                }
            }
        },
        addGiftWrap: function addGiftWrap(currentLine) {
            var giftWrapLine = this.tweakLinesGetGiftWrap(currentLine);

            if (giftWrapLine) {
                Application.once('after:LiveOrder.addLine', function(Model, responseData) {
                    if (responseData) {
                        Model.addLine(giftWrapLine);
                        CommerceAPI.context.setSessionObject('latest_addition', currentLine.orderitemid);
                    }
                });
            }
        },
        removeGiftWrap: function removeGiftWrap(currentLine) {
            var orderFieldKeys = [
                'orderitemid',
                'quantity',
                'internalid',
                'options'
            ];

            // Removing current line, we have to find the giftwrap
            var line = CommerceAPI.order.getItem(currentLine, orderFieldKeys);
            var optionGwId = _.findWhere(line.options, {id: 'CUSTCOL_EF_GW_ID'});
            var optionGw = _.findWhere(line.options, {id: 'CUSTCOL_EF_GW_GIFTWRAP'});

            var key;
            var lines;

            // If it has a giftwrap
            if (optionGwId && optionGw && optionGwId.value && optionGw.value) {
                // we have to search for the other line :(
                key = optionGwId.value.replace('P:', 'G:');
                lines = CommerceAPI.order.getItems(orderFieldKeys);

                // Why EVERY instead of each? Every will break on the first FALSE returned;
                // We need to iterate only until we get the gift wrap item
                _.every(lines, function every(l) {
                    var gwId = _.findWhere(l.options, { id: 'CUSTCOL_EF_GW_ID'} );
                    // Found it? so after the removeLine, let's hang to it
                    if (gwId && gwId.value === key) {
                        Application.once(
                            'after:LiveOrder.removeLine',
                            function afterLiveOrderRemoveLine(Model) {
                                Model.removeLine(l.orderitemid);
                            }
                        );
                        return false;
                    }
                    return true;
                });
            }
        }
    });
});