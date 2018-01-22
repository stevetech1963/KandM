//module to replace the redirect link to ndw http://dawsontireandwheel.com
define('OrderWizard.Module.Confirmation.Site',[
    'OrderWizard.Module.Confirmation',
    'underscore'
], function (
    OrderWizardModuleConfirmation,
    _
) {
    'use strict';

    _.extend(OrderWizardModuleConfirmation.prototype, {
        render: function()
    		{
    			var confirmation = this.model.get('confirmation')
    				// store current order id in the hash so it is available even when the checkout process ends.
    			,	new_hash;

    			if (!_.parseUrlOptions(Backbone.history.fragment).last_order_id)
    			{
    				this.trackTransaction(confirmation);

    				new_hash = Utils.addParamsToUrl(Backbone.history.fragment, {
    					last_order_id: confirmation.get('internalid')
    				});

    				Backbone.history.navigate(new_hash, {
    					trigger: false
    				});
    			}

    			this.confirmation_number = confirmation.get('tranid') || confirmation.get('confirmationnumber');
    			this.order_id = confirmation.get('internalid');

    			this._render();

    			if (!(this.model.get('confirmation') && this.model.get('confirmation').get('internalid')))
    			{
    				this.$el.html('<h3>' + _('Your Order has been placed').translate()+ '</h3>');
    				this.$el.append('<p>'+  _('Continue Shopping on our <a href="http://dawsontireandwheel.com" data-touchpoint="">Home Page</a>. ').translate() +'</p>');
    			}

    		},

            getContext: _.wrap(HeaderLogoView.prototype.getContext, function (fn) {
                var res = fn.apply(this, _.toArray(arguments).slice(1));
                _.extend(res, {
                    continueURL: 'http://dawsontireandwheel.com'
                });

                return res;
            })

    })
})
