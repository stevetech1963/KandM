/*
    © 2016 NetSuite Inc.
    User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
    provided, however, if you are an authorized user with a NetSuite account or log-in, you
    may use this code subject to the terms that govern your access and use.
*/
// Standard footer with additional details to be passed to template
// @module Footer
define(
    'Footer.Details.View',
    [
        'SC.Configuration',
        'GlobalViews.BackToTop.View',

        'Backbone',
        'Backbone.CompositeView',
        'jQuery',
        'Footer.View',
        'underscore'
    ],
    function (
        Configuration,
        GlobalViewsBackToTopView,

        Backbone,
        BackboneCompositeView,
        jQuery,
        FooterView,
        _
    ) {
        'use strict';

        _.extend(FooterView.prototype, {
            getContext: _.wrap(FooterView.prototype.getContext, function (fn) {
                var res = fn.apply(this, _.toArray(arguments).slice(1));

                var footerTitle = Configuration.get('footer.title');
                var footerPrimaryText = Configuration.get('footer.primaryText');
                var footerSecondaryText = Configuration.get('footer.secondaryText');

                _.extend(res, {
                    'footerTitle': footerTitle,
                    'footerPrimaryText': footerPrimaryText,
                    'footerSecondaryText': footerSecondaryText
                });
                return res;
            })
        });
    });
