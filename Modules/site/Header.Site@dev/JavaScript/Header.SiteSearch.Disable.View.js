define('Header.SiteSearch.Disable.View', [
    'Header.View',
    'SiteSearch.View',
    'Backbone',
    'underscore'
], function (
  HeaderView,
  SiteSearchView,
  Backbone,
  _
  ) {
    'use strict';

    _.extend(HeaderView.prototype, {
        hideSiteSearch: function () {
            if (_.getDeviceType() !== 'desktop' ) {
                var self = this;

                // This hide Sitesearch div
                self.$('[data-type="SiteSearch"]').slideUp();
            }
        }

    ,   childViews: _.extend(HeaderView.prototype.childViews, {
            // show site search on table and mobile. for desktop use site search in Header.Menu view
            'SiteSearch': function() {
                if (_.getDeviceType() !== 'desktop' ) {
                    return new SiteSearchView();
                }
            }
        })

    });
});
