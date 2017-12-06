define('ItemSizeChartLink.View', [
    'Backbone',
    'item_size_chart_link.tpl'
], function ItemSizeChartLink(
    Backbone,
    itemSizeChartLinkTpl
) {
    'use strict';

    return Backbone.View.extend({
        template: itemSizeChartLinkTpl,
        getContext: function getContext() {
            return {
                internalid: this.model.get('custitem_ef_sc_size_chart_id'),
                name: this.model.get('custitem_ef_sc_size_chart')
            };
        }
    });
});