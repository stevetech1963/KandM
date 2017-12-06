define('Home.MiddleContent.View', [
    'SC.Configuration',
    'Home.View',
    'underscore'
], function (
    Configuration,
    HomeView,
    _
) {
    'use strict';

    _.extend(HomeView.prototype, {
        getContext: _.wrap(HomeView.prototype.getContext, function (fn) {
            var res = fn.apply(this, _.toArray(arguments).slice(1));

            var middleTitle = Configuration.get('home.middleTextTitle');
            var middleContentText = Configuration.get('home.middleTextContent');
            var middleBannerImg = Configuration.get('home.middleTextBannerImageURL');
            var middleButtonText = Configuration.get('home.middleTextButtonText');
            var middleButtonLink = Configuration.get('home.middleTextButtonURL');

            _.extend(res, {
                'middleTitle': middleTitle,
                'middleContentText': middleContentText,
                'middleBannerImg': middleBannerImg,
                'buttonText': middleButtonText,
                'buttonLink': middleButtonLink
            });

            return res;
        })
    });
});
