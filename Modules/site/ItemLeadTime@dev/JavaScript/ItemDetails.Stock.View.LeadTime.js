// @module ItemViews
define('ItemDetails.Stock.View.LeadTime', [
    'ItemDetails.View',
    'ItemDetails.LeadTime.Model',
    'SC.Configuration',
    'Backbone',
    'underscore'
], function (
    ItemDetailsView,
    ItemDetailsLeadTimeModel,
    Configuration,
    Backbone,
    _
) {
    'use strict';

    // @class ItemViews.Stock.View @extends Backbone.View
    return _.extend(ItemDetailsView.prototype, {

            initialize: _.wrap(ItemDetailsView.prototype.initialize, function(fn){
                fn.apply(this, _.toArray(arguments).slice(1));
                var self = this;
                this.showleadTime = false;
                this.leadTime =  new ItemDetailsLeadTimeModel();
                this.on('afterViewRender',  function afterViewRender() {
                    if(!self.showleadTime){
                        self.leadTime.set("internalid" , self.model.get("internalid"))
                        self.leadTime.fetch().done(function(){
                            self.showleadTime = true;
                            self.render();
            			})
                    }
                });
            }),

	        getContext: _.wrap(ItemDetailsView.prototype.getContext, function(fn){
                var currentContext = fn.apply(this, _.toArray(arguments).slice(1));
                var leadTime = this.leadTime ? this.leadTime.get("leadtime") : null;
                var manufacturer = currentContext.model.get("custitem_tiremanufature");
                var manufacturerLeadTimes = Configuration.get('itemleadtimeMasterOptions');
                var extraLeadTime = _.find(manufacturerLeadTimes, function(manufacturerTime){
                    return manufacturerTime.manufacturer == manufacturer;
                });


                if(extraLeadTime && leadTime)
                    leadTime = parseInt(leadTime) + extraLeadTime.days;
                else if(extraLeadTime && !leadTime)
                    leadTime = extraLeadTime.days;

                var showleadTime = this.showleadTime && leadTime && currentContext.model.get("quantityavailable") == 0;

    			return _.extend(currentContext, {
                    leadTime :leadTime,
                    showleadTime : showleadTime
                });
        })
    });
});
