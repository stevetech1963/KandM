define('GiftWrap.Configuration', [
    'underscore',
    'item_views_option_void.tpl',
    'item_views_option_gift_wrap_message.tpl',
    'item_views_selected_option.tpl',
    'item_views_selected_option_gift_wrap.tpl',
    'item_views_option_gift_wrap.tpl',
    'ItemsKeyMapping'
], function GiftWrapConfiguration(
    _,
    itemViewsOptionVoidTpl,
    itemViewsOptionGiftWrapMessageTpl,
    itemViewsSelectedOptionTpl,
    itemViewsSelectedOptionGiftWrapTpl,
    itemViewsOptionGiftWrapTpl,
    ItemsKeyMapping
) {
    'use strict';

    var GiftWrapConfig = {
        cartOptions: {
            giftWrap: 'custcol_ef_gw_giftwrap',
            giftWrapId: 'custcol_ef_gw_id',
            giftWrapMessage: 'custcol_ef_gw_message'
        }, itemFields: {
            isGiftWrap: 'custitem_ef_gw_is_giftwrap'
        }
    };

    ItemsKeyMapping.getKeyMapping = _.wrap(ItemsKeyMapping.getKeyMapping, function getKeyMapping(fn) {
        var keyMapping = fn.apply(this, _.toArray(arguments).slice(1));

        _.extend(keyMapping, {
            // For an item to be gift wrappable, it needs to have at least
            // one "gift wrap item" possible on the itemoption custcol_ef_gw_giftwrap
            _isGiftWrappable: function _isGiftWrappable(item) {
                var option = item.getPosibleOptionByCartOptionId(GiftWrapConfig.cartOptions.giftWrap);
                return option && option.values && option.values.length > 1;
            },
            // Is it a gift wrap item? (Default:false)
            _isGiftWrap: GiftWrapConfig.itemFields.isGiftWrap
        });

        return keyMapping;
    });

    return {
        GiftWrapConfig: GiftWrapConfig,
        addToSearchApiMasterOptions: function addToSearchApiMasterOptions(apiOptions) {
            // For this you need to create the facet on the backend
            // First exclude giftwrap items
            // Then also exclude the facet from the response, it's not something that the user will filter by
            _.each(apiOptions, function eachApiOptions(value) {
                _.extend(value, {
                    'custitem_ef_gw_is_giftwrap': false,
                    'facet.exclude': value['facet.exclude'] ?
                        value['facet.exclude'] + ',' + GiftWrapConfig.itemFields.isGiftWrap :
                        GiftWrapConfig.itemFields.isGiftWrap
                });
            });

            return apiOptions;
        },

        addGiftWrapOptions: function addGiftWrapOptions(pItemOptions) {
            var itemOptions = pItemOptions || [];

            itemOptions.push({
                cartOptionId: GiftWrapConfig.cartOptions.giftWrapId,
                label: 'void',
                url: 'gwid',
                templates: {
                    selector: itemViewsOptionVoidTpl,
                    selected: itemViewsOptionVoidTpl
                }
            });

            itemOptions.push({
                cartOptionId: GiftWrapConfig.cartOptions.giftWrap,
                label: _('Gift Wrap').translate(),
                url: 'gw',
                templates: {
                    selector: itemViewsOptionGiftWrapTpl,
                    selected: itemViewsSelectedOptionGiftWrapTpl
                }
            });

            itemOptions.push({
                cartOptionId: GiftWrapConfig.cartOptions.giftWrapMessage,
                label: _('Gift Message').translate(),
                url: 'gwmsg',
                templates: {
                    selector: itemViewsOptionGiftWrapMessageTpl,
                    selected: itemViewsSelectedOptionTpl
                }
            });

            return itemOptions;
        }
    };
});