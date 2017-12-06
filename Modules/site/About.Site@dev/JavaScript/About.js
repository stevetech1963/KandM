define(
    'About', [
        'About.Router'
    ],
    function (
        AboutRouter
    ) {
        'use strict';

        return {
            mountToApp: function (application) {
                return new AboutRouter(application);
            }
        };
    }
);
