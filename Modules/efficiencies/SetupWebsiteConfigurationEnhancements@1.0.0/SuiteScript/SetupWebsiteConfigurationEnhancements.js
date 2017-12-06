define('SetupWebsiteConfigurationEnhancements', [
    'Configuration',
    'underscore'
], function SetupWebsiteConfigurationEnhancements(
    Configuration,
    _
) {
    'use strict';
    var extraSiteSettings = session.getSiteSettings(['requireloginforpricing', 'siteloginrequired']);
    _.extend(Configuration, {
        passwordProtectedSite: extraSiteSettings.siteloginrequired === 'T',
        loginToSeePrices: extraSiteSettings.requireloginforpricing === 'T'
    });
});