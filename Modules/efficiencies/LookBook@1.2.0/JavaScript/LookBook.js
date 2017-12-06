define('LookBook', [
    'LookBook.Router',
    'SC.Configuration'
], function LookBook(
    Router,
    Configuration
) {
    'use strict';
    return {
        mountToApp: function(application) {
            application.Configuration.LookBook = Configuration.get('lookBook');
            return new Router(application);
        }
    };
});