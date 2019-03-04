define('Facets.FacetedNavigationItemCategory.View.Extension', [
    'SC.Configuration',
    'Facets.FacetedNavigationItemCategory.View',
    'underscore'
], function FacetsFacetedNavigationItemCategoryViewExtension(
    Configuration,
    FacetsNavigationCategoryView,
    _
) {
    'use strict';

    FacetsNavigationCategoryView.prototype.getContext = _.wrap(FacetsNavigationCategoryView.prototype.getContext, function(fn) {
        var self = this;
        var context = fn.apply(this, _.toArray(arguments).slice(1)) || {};
        var sortedCategories = [];
        var showMax = Configuration.get('categories.sideMenu.showMax');

        _.each(this.categories, function (category) {
            sortedCategories[category.sequencenumber] = {
                displayName: category.name,
                label: category.name,
                link: category.fullurl,
                isActive: category.fullurl === self.categoryUrl
            };
        });

        context.values = sortedCategories;
        var max = showMax || context.values.length;
        context.displayValues = _.first(context.values, max)
        context.extraValues = _.rest(context.values, max);

        return context;
    });
});
