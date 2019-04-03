/*
    © 2016 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/

// @module Footer
define('QS.Footer.View', [
    'Footer.View',
    'PluginContainer',
    'underscore',
    'SC.Configuration'
],
function QSFooterView(
    FooterView,
    PluginContainer,
    _,
    Configuration
) {
    'use strict';

    return {
        mountToApp: function mountToApp() {
            FooterView.prototype.preRenderPlugins =
                FooterView.prototype.preRenderPlugins || new PluginContainer();

            FooterView.prototype.preRenderPlugins.install({
                name: 'themeBridgeFooter',
                execute: function execute($el /* , view */) {
                    $el.find('[data-view="PrimaryText"]')
                        .html(_(Configuration.get('footer.primaryText', '')).translate());
                    $el.find('[data-view="SecondaryText"]')
                        .html(_(Configuration.get('footer.secondaryText', '')).translate());
                }
            });

            FooterView.prototype.installPlugin('postContext', {
                name: 'themeBridgeContext',
                priority: 10,
                execute: function execute(context) {
                    _.extend(context, {
                        // @property {String} backgroundUrl
                        backgroundUrl: _.getAbsoluteUrl(Configuration.get('footer.backgroundImg')),
                        // @property {String} iconClass
                        iconClass: Configuration.get('footer.icon'),
                        // @property {String} title
                        title: Configuration.get('footer.title')
                    });
                }
            });
        }
    };
});
