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

        }
    });
});
