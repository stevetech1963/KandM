/*
 © 2016 NetSuite Inc.
 User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
 provided, however, if you are an authorized user with a NetSuite account or log-in, you
 may use this code subject to the terms that govern your access and use.
 */

define('Facets.Browse.View.InfiniteScroll', [
    'Facets.Browse.View',
    'GlobalViews.Pagination.View',

    'SC.Configuration',
    'Facets.Model',
    'Facets.ItemCell.View',

    'facets_items_collection.tpl',
    'facets_items_collection_view_cell.tpl',
    'facets_items_collection_view_row.tpl',
    'infinite_scroll_next_view.tpl',

    'Backbone',
    'Backbone.CollectionView',
    'underscore',
    'jQuery',

    'Bootstrap.Slider',
    'Utils'

], function FacetsBrowseViewInfiniteScroll(
    FacetsBrowseView,
    GlobalViewsPaginationView,

    Configuration,
    Model,
    FacetsItemCellView,

    facetsItemsCollectionTpl,
    facetsItemsCollectionViewCellTpl,
    facetsItemsCollectionViewRowTpl,

    infiniteScrollNextViewTpl,

    Backbone,
    BackboneCollectionView,

    _,
    jQuery
) {
    'use strict';


    var infiniteScrollConfig = Configuration.get('infiniteScroll');

    if ( infiniteScrollConfig.enabled ) {
        _.extend(FacetsBrowseView.prototype, {
            events: _.extend(FacetsBrowseView.prototype.events, {
                'click [data-action="load-previous"]': 'loadPrevious',
                'click [data-action="load-next"]': 'loadNext',
                'click [data-action="scroll-to-top"]': 'scrollToTop'
            }),
            childViews: _.extend(FacetsBrowseView.prototype.childViews, {
                'GlobalViews.Pagination': function GlobalViewsPagination() {
                    var translator = this.translator;
                    var view = new GlobalViewsPaginationView({
                        currentPage: translator.getOptionValue('page'),
                        totalPages: this.totalPages,
                        template: infiniteScrollNextViewTpl,
                        pager: function pager(page) {
                            return translator.cloneForOption('page', page).getUrl();
                        }
                    });

                    view.template = infiniteScrollNextViewTpl;
                    return view;
                }
            }),
            initialize: _.wrap(FacetsBrowseView.prototype.initialize, function wrappedInitialize(fn) {
                fn.apply(this, _.toArray(arguments).slice(1));
                this.readyLoad = true;
                this.nextPageCount = 0;
            }),
            getModuleConfig: function getModuleConfig() {
                return infiniteScrollConfig;
            },
            scrollSetup: function scrollSetup() {
                // Add Scroll To Top Icon
                this.$el
                    .find('.facets-facet-browse-results')
                    .before('<a class="infinite-scroll-top" data-action="scroll-to-top">' +
                        '<i class="infinite-scroll-top-icon"></i>' +
                        '</a>'
                    )
                ;

                // Add previous button
                this.loadPreviousButton();
            },

            // Auto load next page
            loadNextScroll: function loadNextScroll() {
                var currentTarget = this.$(window);
                if (this.nextPageCount < this.getModuleConfig().pageLoadLimit &&
                    this.readyLoad && currentTarget.scrollTop() +
                    currentTarget.innerHeight() > this.$(document).height() - 300) {

                    this.readyLoad = false;
                    this.loadNext();

                    return false;
                }
            },

            // Scroll to Top button
            scrollToTop: function scrollToTop() {
                jQuery('html, body').animate({
                    scrollTop: 0
                }, 700);
                return false;
            },

            // Update Page URL on scroll
            updatePageUrl: function updatePageUrl() {
                var self = this;
                var currentHash;
                this.$('[data-resultspage]').each(function findResultPage() {
                    var top = window.pageYOffset;
                    var distance = top - self.$(this).offset().top;
                    var hash = self.$(this).data('resultspage');
                    if (distance < 300 && distance > -300 && currentHash !== hash) {
                        currentHash = hash;
                        Backbone.history.navigate(self.translator.cloneForOption(
                            'page', hash).getUrl(),
                            {
                                trigger: false, replace: true
                            }
                        );
                    }
                });
            },

            // Add previous button
            loadPreviousButton: function loadPreviousButton() {
                var initialPage = this.translator.getOptionValue('page');
                var currentPage;
                var translatorPrevPage;
                var prevPage;
                var prevPageUrl;

                // Last loaded page (next)
                currentPage = initialPage;
                // next page value
                prevPage = currentPage - 1;
                // Set the next page in translator clone
                translatorPrevPage = this.translator.cloneForOption('page', prevPage);
                // Create URL
                prevPageUrl = translatorPrevPage.getUrl();

                // Add resultspage attribute to Facet.Items div
                this.$('[data-view="Facets.Items"]').attr('data-resultspage', initialPage);
                // Insert prev button
                if (this.translator.options.page > 1) {
                    this.$el
                        .find('[data-view="Facets.FacetsDisplay"]')
                        .before('<div class="infinite-scroll-button-wrapper-prev"><a href="' + prevPageUrl +
                            '" class="infinite-scroll-previous-button" data-action="load-previous">' +
                            _.translate('Load Previous') + '</a></div>');
                }
            },

            // Add Next button
            loadNextButton: function loadNextButton() {
                var currentPage;
                var translatorNextPage;
                var nextPage;
                var nextPageUrl;

                // Remove next button
                this.$('.infinite-scroll-next-button').remove();
                // Last loaded page (next)
                currentPage = this.$('[data-resultspage]:last').data('resultspage');
                // next page value
                nextPage = currentPage + 1;
                // Set the next page in translator clone
                translatorNextPage = this.translator.cloneForOption('page', nextPage);
                // Create URL
                nextPageUrl = translatorNextPage.getUrl();

                this.nextPageCount++;

                this.$el
                    .find('.infinite-scroll-button-wrapper')
                    .append('<a href="' + nextPageUrl + '" class="infinite-scroll-next-button" data-action="load-next">'
                        + _.translate('Load Next') + '</a>');
            },

            loadNext: function loadNext() {
                var modelNextPage = new Model();
                var currentPage;
                var nextPage;
                var translatorNextPage;
                var elSelector;

                // Remove next button
                this.$('.infinite-scroll-next-button').remove();

                // Last loaded page (next)
                currentPage = this.$('[data-resultspage]:last').data('resultspage');

                if ( currentPage <= this.totalPages ) {
                    // next page value
                    nextPage = currentPage + 1;

                    // Selector for placeholder div
                    elSelector = '[data-resultspage="' + nextPage + '"]';

                    // If reached last page - end
                    if (nextPage > this.totalPages) {
                        this.$el
                            .find('[data-resultspage="' + currentPage + '"]')
                            .append('<div class="infinite-scroll-results">' + _.translate('No more results') + '</div>');
                    }

                    // Set the next page in translator clone
                    translatorNextPage = this.translator.cloneForOption('page', nextPage);

                    // Insert placeholder div after latest results page
                    this.$el
                        .find('[data-resultspage="' + currentPage + '"]')
                        .append('<span data-resultspage="' + nextPage + '"><div class="next infinite-scroll-results"></div></span>');


                    // Render the page
                    this.loadPage(modelNextPage, translatorNextPage, elSelector);

                    // Update Url
                    Backbone.history.navigate(translatorNextPage.getUrl(), {trigger: false, replace: true});

                    if ((nextPage + 1) <= this.totalPages) {
                        this.loadNextButton();
                    }
                }

                return false;
            },

            loadPrevious: function loadPrevious() {
                var modelPreviousPage = new Model();
                var currentPage;
                var previousPage;
                var translatorPreviousPage;
                var elSelector;

                // Hide Previous Results button
                this.$('.infinite-scroll-previous-button').hide();

                // Last loaded page (prev)
                currentPage = this.$('[data-resultspage]:first').data('resultspage');

                // Previous page value
                previousPage = currentPage - 1;

                // Set the previous page in translator clone
                translatorPreviousPage = this.translator.cloneForOption('page', previousPage);

                // Selector for placeholder div
                elSelector = '[data-resultspage="' + previousPage + '"]';

                // Insert placeholder div after previous results page
                this.$el
                    .find('[data-resultspage="' + currentPage + '"]')
                    .before('<div data-resultspage="' + previousPage + '" class="prev infinite-scroll-results"></div>');

                // Render the page
                this.loadPage(modelPreviousPage, translatorPreviousPage, elSelector);

                // Update Url
                Backbone.history.navigate(translatorPreviousPage.getUrl(), {trigger: false, replace: true});

                // Show previous button if more pages
                if (previousPage > 1) {
                    this.$('.infinite-scroll-previous-button').show();
                }
                return false;
            },

            // Load page method used for both next and prev page loading
            loadPage: function loadPage(model, translator, el) {
                var self = this;

                model.fetch({
                    data: translator.getApiParams()
                }).done(function done() {
                    var displayOption = _.find(Configuration.itemsDisplayOptions, function find(option) {
                        return option.id === translator.getOptionValue('display');
                    });

                    var newView = new BackboneCollectionView({
                        el: jQuery(el),
                        childTemplate: displayOption.template,
                        childView: FacetsItemCellView,
                        viewsPerRow: parseInt(displayOption.columns, 10),
                        collection: model.get('items'),
                        cellTemplate: facetsItemsCollectionViewCellTpl,
                        rowTemplate: facetsItemsCollectionViewRowTpl,
                        template: facetsItemsCollectionTpl,
                        context: {
                            keywords: translator.getOptionValue('keywords')
                        }
                    });
                    // Allow further pages to be loaded
                    self.readyLoad = true;
                    newView.render();

                    self.model.get('items').models = _.uniq(_.union(self.model.get('items').models, model.get('items').models), false, _.property('id'));
                });
            },

            delegateEvents: function delegateEvents() {
                var res = Backbone.View.prototype.delegateEvents.apply(this, arguments);
                var self = this;
                var amountScrolled = this.getModuleConfig().scrollTrigger;
                var bindNexScroll;

                // scroll setup - buttons, placeholders etc
                jQuery(window).on('ready', this.scrollSetup());

                jQuery(window).scroll(function windowScroll() {
                    // Update page URL method
                    self.updatePageUrl();

                    // Scroll to Top button display
                    if (this.$(window).scrollTop() > amountScrolled) {
                        this.$('.infinite-scroll-top').fadeIn('slow');
                    } else {
                        this.$('.infinite-scroll-top').fadeOut('slow');
                    }

                    // Load next page on scroll
                    bindNexScroll = _.bind(self.loadNextScroll, self);
                    bindNexScroll();
                });

                return res;
            }
        });
    }
});
