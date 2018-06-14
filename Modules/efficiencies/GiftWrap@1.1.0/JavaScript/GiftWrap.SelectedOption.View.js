define('GiftWrap.SelectedOption.View', [
    'ItemViews.SelectedOption.View',
    'GiftWrap.Configuration',
    'bignumber',
    'underscore',
    'Backbone.PluginInstaller'
], function GiftWrapOptionView(
    ItemViewsSelectedOptionView,
    Configuration,
    BigNumber,
    _
) {
    'use strict';

    ItemViewsSelectedOptionView.prototype.installPlugin('postContext', {
        name: 'giftWrapSelectedContext',
        priority: 10,
        execute: function execute(context, view) {
            var option = view.model;
            var line = view.options.cartLine;
            var giftWrapItem;
            var amount;

            if (option.get('cartOptionId') === Configuration.GiftWrapConfig.cartOptions.giftWrap) {
                giftWrapItem = line.get('giftwrap');

                if (giftWrapItem) {
                    amount = BigNumber(parseInt(line.get('amount'))).plus(parseInt(giftWrapItem.amount)).toNumber();
                    line.set('amount_formatted', '$' + amount);
                    line.set('total_formatted', '$' + amount);

                    _.extend(context, {
                        giftWrapLine: {
                            total_formatted: giftWrapItem.total_formatted,
                            isValid: (giftWrapItem.amount !== 0) ? true : false
                        }
                    });
                }
            }
        }
    });
});
