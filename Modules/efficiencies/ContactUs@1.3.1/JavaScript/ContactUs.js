define('ContactUs', [
    'ContactUs.Router',
    'SC.Configuration'
], function ContactUs(
    Router,
    Configuration
) {
    'use strict';

    return {
        mountToApp: function mountToApp(application) {
            var config = Configuration.get('commerceSuiteSolution.contactUs', {});
            if (config.enabled) {
                return new Router(application);
            }
        }
    };
});
