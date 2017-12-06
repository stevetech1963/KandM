define('GiftWrap.OrderLineItemModel', [
    'OrderLine.Model',
    'underscore'
], function OrderLineModelGiftWrap(
    OrderLineModel,
    _
) {
    'use strict';

    _.extend(OrderLineModel.prototype, {
        initialize: _.wrap(OrderLineModel.prototype.initialize, function wrapInitialize(fn, attributes) {
            fn.apply(this, _.toArray(arguments).slice(1));

            // when the line has a gift wrap, we'll re-format the line in order to improve how to show it.
            // Because of some macro issues (Show item options) we're also hacking the lineOption Value
            this.on('change:giftwrap', function changeGiftWrap(model, gw) {
                var lineOption;
                var line = new (OrderLineModel)(gw, { silent: true } );

                model.get('item').set('giftwrap', line);

                lineOption = _.findWhere(this.get('options'), {id: 'CUSTCOL_EF_GW_GIFTWRAP'});

                _.extend(lineOption, {
                    displayvalue: line.get('item').get('_name') + ' ' + line.get('item').getPrice().price_formatted
                });
            });

            if (attributes.giftwrap) {
                this.trigger('change:giftwrap', this, attributes.giftwrap);
            }
        })
    });
});
