define(
    'Header.Menu.SiteSearch.View',
    [
        'SC.Configuration',
        'Header.Menu.View',
        'SiteSearch.View',
        'Backbone',
        'Backbone.CompositeView',
        'jQuery',
        'underscore'
    ], function (
        Configuration,
        HeaderMenuView,
        SiteSearchView,
        Backbone,
        CompositeView,
        jQuery,
        _
    ) {
        'use strict';

        _.extend(HeaderMenuView.prototype, {

            verifyShowSiteSearch: function () {
                var hash = Backbone.history.getFragment() || '';
                var isHome = hash === '' || hash === '/';
                hash = hash.indexOf('?') === -1 ? hash : hash.substring(0, hash.indexOf('?'));


                if (_.getDeviceType() !== 'desktop' && isHome) {
                    this.showSiteSearch(null, true);
                }
            },
            showSiteSearch: function (ev) {
                if (ev) {
                    ev.preventDefault();
                }

                this.$('[data-action="show-sitesearch"]').toggleClass('active');
            },
            hideSiteSearch: function () {
            },
            childViews: _.extend(HeaderMenuView.prototype.childViews, {
                'SiteSearch': function () {
                    return new SiteSearchView();
                }
            })
        });
    }
);
