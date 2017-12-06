define('SizeChart', [
    'SizeChart.Router',
    'ItemSizeChartLink.View',
    'ItemDetails.View',
    'underscore'
], function SizeChart(
    Router,
    ItemSizeChartLink,
    ItemView,
    _
) {
    'use strict';

    ItemView.prototype.childViews['Item.SizeChart'] = function ItemSizeChart() {
        return new ItemSizeChartLink({ model: this.model });
    };

    return {
        mountToApp: function mountToApp(application) {
            ItemView.prototype.initialize = _.wrap(ItemView.prototype.initialize, function initialize(fn) {
                fn.apply(this, _.toArray(arguments).slice(1));

                this.on('afterViewRender', function afterViewRender() {
                    this.$('[data-id="item-details-options"]')
                        .parent('section')
                        .append('<div data-view="Item.SizeChart"/>');
                });
            });

            return new Router(application);
        }
    };
});