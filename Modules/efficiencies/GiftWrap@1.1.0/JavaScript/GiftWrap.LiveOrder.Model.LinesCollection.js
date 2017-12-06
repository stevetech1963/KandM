define('GiftWrap.LiveOrder.Model.LinesCollection', [
    'Backbone',
    'LiveOrder.Model',
    'underscore'
], function GiftWrapLiveOrderModelLineCollection(
    Backbone,
    LiveOrderModel,
    _
) {
    'use strict';

    _.extend(LiveOrderModel.prototype.linesCollection.prototype, {
        initialize: function initialize(attributes) {
            var isLinesCollection = attributes instanceof Backbone.Collection;
            if (! isLinesCollection ) {
                this.wrapGiftWrapLines(attributes, {silent: true});
            }
        },
        wrapGiftWrapLines: function wrapGiftWrapLines(lines) {
            var giftWrapsHashMap = {};
            var offsets = 0;
            var i;
            var line;
            var option;
            var type;
            var key;

            for (i = 0; i < lines.length; i++) {
                line = lines[i];
                if ( (! line.giftwrap) && line.options )  {
                    option = _.findWhere(line.options, {id: 'CUSTCOL_EF_GW_ID'});
                    type = option && option.value && option.value.substr(0, 2);
                    if (type) {
                        key = option.value.replace(type, '');
                        if (type === 'G:') {
                            giftWrapsHashMap[key] = giftWrapsHashMap[key] || {};
                            giftWrapsHashMap[key].giftwrap = i;
                        }
                        if (type === 'P:') {
                            giftWrapsHashMap[key] = giftWrapsHashMap[key] || {};
                            giftWrapsHashMap[key].parent = i;
                        }
                    }
                }
            }

            _.each(giftWrapsHashMap, function _giftWrapsHashMap(value, k) {
                if (value && !_.isUndefined(value.giftwrap) && !_.isUndefined(value.parent)) {
                    lines[value.parent - offsets].giftwrap = lines[value.giftwrap - offsets];
                    lines.splice(value.giftwrap - offsets, 1);

                    offsets++;
                } else {
                    console.error(
                        'Error with giftwrap sync',
                        'Key:' + JSON.stringify(k) + ',Value:' + JSON.stringify(value)
                    );
                }
            });

            return lines;
        }
    });
});