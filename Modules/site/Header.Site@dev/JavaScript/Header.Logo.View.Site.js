define('Header.Logo.View.Site',
    [
    'Header.Logo.View',
    'underscore'
    ],
function (
    HeaderLogoView,
    _
) {
    'use strict';

    _.extend(HeaderLogoView.prototype, {
        getContext: _.wrap(HeaderLogoView.prototype.getContext, function (fn) {
            var res = fn.apply(this, _.toArray(arguments).slice(1));
            _.extend(res, {
                headerLinkHref: 'http://tempdawsontw.hlmtech.com',//hard coded in template override as well
                headerLinkHashtag: ''
            });
            if(this.options.application.name!="Shopping") {
                _.extend(res, {
                    headerLinkTouchPoint: ''
                });
            }
            return res;
        })
    })
})
