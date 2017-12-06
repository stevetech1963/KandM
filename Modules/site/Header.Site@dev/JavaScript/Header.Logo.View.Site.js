define('Header.Logo.View.Site',
'Header.Logo.View',
'underscore',
function (
    HeaderLogoView,
    _
) {
    'use strict';

    _.extend(HeaderLogoView.prototype, {
        getContext: _.wrap(HeaderLogoView.prototype.getContext, function (fn) {
            var res = fn.apply(this, _.toArray(arguments).slice(1));
            _.extend(res, {
                headerLinkHref: 'http://tempdawsontw.hlmtech.com'
            });

            return res;
        })
    })
})
