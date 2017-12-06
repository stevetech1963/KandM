define('About.Router',
    [
        'About.View',
        'Backbone'
    ],
    function (
        AboutView,
        Backbone
    ) {
        'use strict';

        return Backbone.Router.extend({
            routes: {
                'about': 'about'
            },
            initialize: function (application) {
                this.application = application;
            },
            about: function () {
                var view = new AboutView({ application: this.application });
                view.showContent();
            }
        });
    });
