define('Home.SliderFix.View', [
    'Home.View',
    'Backbone',
    'jQuery',
    'underscore'
], function (
    Home,
    Backbone,
    jQuery,
    _
) {
    'use strict';

    function getCMSon(evt, callback) {
        if (typeof CMS !== 'undefined') {
            CMS.on(evt, callback);
        } else {
            Backbone.Events.on('cms:load', function CMSCallback() {
                CMS.on(evt, callback);
            });
        }
    }

    _.extend(Home.prototype, {

        initialize: function initialize() {
            var self = this;
            var windowResizeHandler;
            this.windowWidth = jQuery(window).width();
            getCMSon('cms:rendered', function cmdRendered() {
                _.initBxSlider(self.$('[data-slider]'), {
                    nextText: '<a class="home-gallery-next-icon"></a>',
                    prevText: '<a class="home-gallery-prev-icon"></a>',
                    auto: true,
                    autoStart: true
                });
            });

            windowResizeHandler = _.throttle(function () {
                if (_.getDeviceType(this.windowWidth) === _.getDeviceType(jQuery(window).width())) {
                    return;
                }
                this.showContent();

                _.resetViewportWidth();

                this.windowWidth = jQuery(window).width();
            }, 1000);

            this._windowResizeHandler = _.bind(windowResizeHandler, this);

            jQuery(window).on('resize', this._windowResizeHandler);
        }
    });
});
