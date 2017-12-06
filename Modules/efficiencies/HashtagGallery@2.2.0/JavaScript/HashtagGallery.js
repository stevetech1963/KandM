define('HashtagGallery', [
    'underscore',
    'ItemDetails.View',
    'HashtagGallery.ItemDetails.View',
    'SC.Configuration'
], function HashtagGallery(
    _,
    ItemDetailsView,
    HashtagGalleryItemDetails,
    Configuration
) {
    'use strict';

    _.extend(ItemDetailsView.prototype.childViews, {
        'Item.HashtagGallery': function ItemHashtagGallery() {
            return new HashtagGalleryItemDetails({
                application: this.application,
                hashtags: this.model.get('custitem_ef_smh_social_media_hashtag')
            });
        }
    });

    return {
        mountToApp: function mountToApp() {
            ItemDetailsView.prototype.initialize = _.wrap(
                ItemDetailsView.prototype.initialize, function initialize(fn) {
                    var moduleConfig = Configuration.get('hashtagGallery');

                    fn.apply(this, _.toArray(arguments).slice(1));
                    this.application.Configuration.hashtagGallery = moduleConfig;
                    this.on('afterViewRender', function afterViewRender() {
                        this.$el.find('.item-details-product-review-content').after(
                            '<div data-view="Item.HashtagGallery"></div>'
                        );
                    });
                }
            );
        }
    };
});