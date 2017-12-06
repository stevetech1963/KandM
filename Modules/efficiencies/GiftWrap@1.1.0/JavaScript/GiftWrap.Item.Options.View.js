define('GiftWrap.Item.Options.View', [
    'ItemViews.Option.View',
    'GiftWrap.Configuration',
    'underscore'
], function GiftWrapOptionView(
    ItemViewsOptionView,
    Configuration,
    _
) {
    'use strict';

    var isGiftWrapReady = function isGiftWrapReady(item) {
        if (!item || !item.attributes) {
            return false;
        }
        if (typeof item.attributes.onlinecustomerprice_detail === 'undefined') {
            return false;
        }
        if (typeof item.attributes.onlinecustomerprice_detail.onlinecustomerprice === 'undefined') {
            return false;
        }
        if (item.attributes.onlinecustomerprice_detail.onlinecustomerprice === '') {
            return false;
        }
        if (!item.get('ispurchasable')) {
            return false;
        }
        if (!item.isSelectionComplete()) {
            return false;
        }
        return true;
    };


    ItemViewsOptionView.prototype.installPlugin('postContext', {
        name: 'giftWrapContext',
        priority: 10,
        execute: function execute(context, view) {
            var modelOption = view.model;
            var item = view.options.item;
            var giftWrapItems;
            var isCheckboxMode;
            var firstOption;
            var selectedGiftWrap;
            var itemForCheckboxMode;
            var wrongOptions = [];

            if (item.get('_isGiftWrappable') && item.giftWrapItems.length > 0) {
                giftWrapItems = item.giftWrapItems;

                isCheckboxMode = modelOption &&
                    modelOption.get('values') &&
                    modelOption.get('values').length === 2 &&
                    modelOption.get('values')[0].label === '';

                firstOption = modelOption.get('values') && modelOption.get('values').length > 1 ?
                    modelOption.get('values')[1] :
                    {};

                selectedGiftWrap = context.selectedOption && context.selectedOption.internalId ?
                    giftWrapItems.get(context.selectedOption.internalId) :
                    null;

                _.extend(context, {
                    isGiftWrappable: item.get('_isGiftWrappable'),
                    isCheckboxMode: isCheckboxMode,
                    isActive: selectedGiftWrap !== null,
                    giftWrapItems: giftWrapItems,
                    firstOption: firstOption
                });

                switch (modelOption.get('cartOptionId')) {
                case Configuration.GiftWrapConfig.cartOptions.giftWrap:
                    if (giftWrapItems.length) {
                        if (isCheckboxMode) {
                            itemForCheckboxMode = giftWrapItems.get(firstOption.internalid);
                            _.extend(context, {
                                gwModel: {
                                    internalid: itemForCheckboxMode.get('internalid'),
                                    price: itemForCheckboxMode.getPrice().price,
                                    isValid: (itemForCheckboxMode.getPrice().price !== 0) ? true : false,
                                    price_formatted: itemForCheckboxMode.getPrice().price_formatted
                                }
                            });
                        } else {
                            _.each(context.options, function eachOptions(option) {
                                var giftWrapItem = giftWrapItems.get(option.internalId);

                                if (giftWrapItem && isGiftWrapReady(giftWrapItem)) {
                                    _.extend(option, {
                                        gwModel: {
                                            internalid: giftWrapItem.get('internalid'),
                                            price: giftWrapItem.getPrice(),
                                            price_formatted: giftWrapItem.getPrice().price_formatted
                                        }
                                    });
                                } else if (typeof option.internalId !== 'undefined') {
                                    option.isAvailable = false;
                                    option.isActive = false;
                                    wrongOptions.push(option.internalId);
                                }

                                context.options = _.reject(context.options, function reject(contextOption) {
                                    return _.contains(wrongOptions, contextOption.internalId);
                                });
                            });
                        }
                    }
                    break;
                case Configuration.GiftWrapConfig.cartOptions.giftWrapMessage:
                    _.extend(context, {
                        shouldEnableGiftMessage: item.shouldEnableGiftMessage()
                    });
                    break;
                default:
                    break;
                }
            }
        }
    });
});