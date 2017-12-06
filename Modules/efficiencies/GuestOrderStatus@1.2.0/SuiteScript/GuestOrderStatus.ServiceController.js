define('GuestOrderStatus.ServiceController', [
    'ServiceController',
    'Application',
    'GuestOrderStatus.Model'
], function(
    ServiceController,
    Application,
    GuestOrderStatusModel
) {
    'use strict';

    return ServiceController.extend({
        name:'GuestOrderStatus.ServiceController',

        post: function() {
            this.sendContent(GuestOrderStatusModel.proxy(this.data, this.request));
        }
    });
});