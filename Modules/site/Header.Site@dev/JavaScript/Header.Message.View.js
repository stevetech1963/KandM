define(
    'Header.Message.View',
    [
        'SC.Configuration',
        'Header.View',
        'underscore',
        'jQuery'
    ],
    function (
        Configuration,
        HeaderView,
        _,
        $
    ) {
        'use strict';

        _.extend(HeaderView.prototype, {
            getContext: _.wrap(HeaderView.prototype.getContext, function (fn) {
                var res = fn.apply(this, _.toArray(arguments).slice(1));

                var bannerMsg = Configuration.get('header.bannerMsg');

                _.extend(res, {
                    'bannerMsg': bannerMsg
                });

                return res;
            }),

            initialize: _.wrap(HeaderView.prototype.initialize, function (fn) {
                var res = fn.apply(this, _.toArray(arguments).slice(1));
                _.bindAll(this, 'checkMessagePosition');
                $(window).scroll(this.checkMessagePosition);
                return res;
            }),
            checkMessagePosition: function () {
                // if headermessage is at top of page, fix to top
                // if scrolltop returns 0, at top of page
                if ($(window).scrollTop()) {
                    if (!$('.header-banner-message').hasClass('header-banner-message-float')) {
                        $('.header-banner-message').addClass('header-banner-message-float');
                    }
                } else {
                    $('.header-banner-message').removeClass('header-banner-message-float');
                }
            }
        });
    }
);
