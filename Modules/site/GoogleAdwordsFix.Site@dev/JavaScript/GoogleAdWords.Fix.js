define('GoogleAdWords.Fix',
    [
        'GoogleAdWords',
        'underscore'
    ],
    function (
        AdWords,
        _
    ) {
        'use strict';


        _.extend(AdWords, {
            doCallback: function () {
                return false;
            }
        });
    }
);
