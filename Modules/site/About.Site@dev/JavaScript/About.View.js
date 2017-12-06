define('About.View',
    [
        'SC.Configuration',
        'Backbone',
        'underscore',
        'jQuery',
        'about.tpl'
    ],
    function (
        Configuration,
        Backbone,
        _,
        jQuery,
        aboutTpl
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

        return Backbone.View.extend({

            initialize: function () {
                // slider fix here
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
            },

            getBreadcrumbPages: function () {
                return [{ text: 'About Us', href: '/about' }];
            },
            getContext: function () {
                var navigationLinks = Configuration.get('about.navigationLinks', []);
                var carousel = Configuration.get('about.carouselImages', []);
                return {
                    showNavigationLinks: !!navigationLinks.length,
                    navigationLinks: navigationLinks,
                    showCarousel: !!carousel.length,
                    carousel: carousel
                };
            },

            template: aboutTpl,

            title: _('About Us').translate(),

            page_header: _('About Us').translate()
        });
    });
