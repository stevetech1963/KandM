define('GuestOrderStatus.Router', [
    'GuestOrderStatus.View',
    'Backbone'
], function GuestOrderStatusRouter(
    View,
    Backbone
) {
    'use strict';

    return Backbone.Router.extend({
        routes: {
            'guestorderstatus': 'orderStatus'
        },

        initialize: function initialize(application) {
            this.application = application;
        },

        orderStatus: function orderStatus() {
            new View({application: this.application}).showContent();
        }
    });
});