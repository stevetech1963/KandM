/*
    © 2016 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

// @module Home
define('QS.Home.View', [
    'Home.View',
    'PluginContainer',
    'underscore',
    'SC.Configuration'
], function QSHomeView(
    HomeView,
    PluginContainer,
    _,
    Configuration
) {
    'use strict';

    return {
        mountToApp: function mountToApp() {
            // for Carousel
            var carousel = Configuration.get('home.carouselImages', []);
            // for Infoblocks
            var infoblock = Configuration.get('home.infoblock', []);
            var infoblockTile = (infoblock.length === '3' || infoblock.length > '5');
            var infoblockFive = (infoblock.length === '5');

            // for Free text and images
            var freeTextImages = Configuration.get('home.freeTextImages', []);

            HomeView.prototype.preRenderPlugins =
                HomeView.prototype.preRenderPlugins || new PluginContainer();

            HomeView.prototype.preRenderPlugins.install({
                name: 'themeBridgeHome',
                execute: function execute($el /* , view */) {
                    $el.find('[data-view="FreeText"]')
                        .html(_(Configuration.get('home.freeText', '')).translate());
                }
            });

            HomeView.prototype.installPlugin('postContext', {
                name: 'themeBridgeContext',
                priority: 10,
                execute: function execute(context) {
                    _.extend(context, {
                        // @property {String} url
                        url: _.getAbsoluteUrl(),
                        // @property {Boolean} showCarousel
                        showCarousel: !!carousel.length,
                        // @property {Array<Object>} carousel
                        carousel: carousel,
                        // @property {String} carouselBgrImg
                        carouselBgrImg: _.getAbsoluteUrl(Configuration.get('home.carouselBgrImg')),
                        // @property {Number} infoblockCount
                        infoblockCount: infoblock.length,
                        // @property {Boolean} infoblockTile
                        infoblockTile: infoblockTile,
                        // @property {Boolean} infoblockFive
                        infoblockFive: infoblockFive,
                        // @property {Array<Object>} freeTextImages
                        infoblock: infoblock,
                        // @property {String} freeTextTitle
                        freeTextTitle: _(Configuration.get('home.freeTextTitle')).translate(),
                        // @property {Boolean} showFreeTextImages
                        showFreeTextImages: !!freeTextImages.length,
                        // @property {Array<Object>} freeTextImages - the object contains the properties text:String, href:String
                        freeTextImages: freeTextImages
                    });
                }
            });
        }
    };
});
