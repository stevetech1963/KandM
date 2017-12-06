define('Account.Register.Model.Site', [
    'Account.Register.Model',
    'underscore',
    'Utils'
], function AccountRegisterModelSite(
    AccountModel,
    _
) {
    'use strict';

    var validateCustom = {
        'resaleDealerNumber': {
            fn: function validateCheckbox(value, valName, form) {
                /*eslint-disable*/
                if (form['nontaxable']) {
                /*eslint-enable*/
                    if (value === '') {
                        return _('Resale Dealer Number Required').translate();
                    }
                }
                return null;
            }
        }
    };

    _.extend(AccountModel.prototype.validation, validateCustom);
});
