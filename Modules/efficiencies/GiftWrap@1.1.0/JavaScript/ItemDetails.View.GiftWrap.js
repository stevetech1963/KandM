define('ItemDetails.View.GiftWrap', [
    'ItemDetails.View',
    'underscore',
    'jQuery',
    'Backbone.CollectionView',
    'ItemViews.Option.View',
    'GiftWrap.Configuration',
    'Backbone',
    'Utils'
], function ItemDetailsViewGiftWrap(
    View,
    _,
    jQuery,
    BackboneCollectionView,
    ItemViewsOptionView,
    GiftWrapConfig,
    Backbone
) {
    'use strict';

    View.prototype.childViews['ItemDetails.Options'] = function ItemDetailsOptions() {
        var optionsToRender = this.model.getPosibleOptions();
        var available;
        var messageOption;
        var messageIndex;
        var giftWrapOption;
        var giftWrapIndex;

        _.each(optionsToRender, function each(option) {
            // If it's a matrix it checks for valid combinations
            if (option.isMatrixDimension) {
                available = this.model.getValidOptionsFor(option.itemOptionId);
                _.each(option.values, function eachOption(value) {
                    value.isAvailable = _.contains(available, value.label);
                });
            }
        }, this);

        // Check gift wrap options order
        messageOption = _.findWhere(optionsToRender, {
            cartOptionId: GiftWrapConfig.GiftWrapConfig.cartOptions.giftWrapMessage
        });

        messageIndex = optionsToRender.indexOf(messageOption);

        giftWrapOption = _.findWhere(optionsToRender, {
            cartOptionId: GiftWrapConfig.GiftWrapConfig.cartOptions.giftWrap
        });

        giftWrapIndex = optionsToRender.indexOf(giftWrapOption);
        if (messageIndex < giftWrapIndex) {
            // gift wrap option should appear before the gift wrap message. We exchange them if this is not the case
            optionsToRender[messageIndex] = giftWrapOption;
            optionsToRender[giftWrapIndex] = messageOption;
        }

        return new BackboneCollectionView({
            collection: new Backbone.Collection(optionsToRender),
            childView: ItemViewsOptionView,
            viewsPerRow: 1,
            childViewOptions: {
                item: this.model
            }
        });
    };

    _.extend(View.prototype, {
        initialize: _.wrap(View.prototype.initialize, function wrapInitialize(fn) {
            var self;
            var isGiftWrapModel = _.parseUrlOptions(Backbone.history.fragment).gwm;
            var hideDiv = [
                '.quick-view-confirmation-modal-full-details',
                '.item-views-option-tile-picker',
                '.item-views-price-lead',
                '.quick-view-confirmation-modal-sku',
                '.quick-view-options-quantity',
                '.item-views-option-text',
                '.item-views-option-dropdown-gift-wrap h4',
                '.quick-view-confirmation-modal-add-to-product-list div',
                '[data-view="ItemDetails.AddToQuote"]'
            ];
            fn.apply(this, _.toArray(arguments).slice(1));

            this.on('afterViewRender', function afterViewRender() {
                if (this.application.getLayout().currentView &&
                    this.application.getLayout().currentView.model.id === 'cart' && this.inModal) {
                    self = this;

                    _.defer(function() {
                        if (isGiftWrapModel) {
                            jQuery(hideDiv).each(function(index, value) {
                                jQuery(value).addClass('giftWrap-inactive');
                            });

                            jQuery('.quick-view-confirmation-modal-item-name')
                                .html('Gifting Options:' + self.model.get('_pageTitle'));
                        } else {
                            jQuery('.item-views-option-dropdown-gift-wrap').addClass('giftWrap-inactive');
                            jQuery('.item-views-option-gift-wrap-message').addClass('giftWrap-inactive');
                        }
                    });
                }
            });
        })
    });
});