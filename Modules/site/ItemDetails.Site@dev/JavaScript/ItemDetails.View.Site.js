define('ItemDetails.View.Site', [
    'ItemDetails.View',
    'Backbone',
    'jQuery',
    'underscore'
], function (
    ItemDetailsView,
    Backbone,
    jQuery,
    _
) {
    'use strict';

    _.extend(ItemDetailsView.prototype, {
        getContext: _.wrap(ItemDetailsView.prototype.getContext, function (fn) {
            var res = fn.apply(this, _.toArray(arguments).slice(1));

            _.extend(res, {
                salesdescription: this.model.get('salesdescription')
            });
            return res;
        })
    });
});
