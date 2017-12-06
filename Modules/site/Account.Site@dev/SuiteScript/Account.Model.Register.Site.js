define('Account.Model.Register.Site', [
    'Account.Model',
    'Profile.Model',
    'Models.Init',
    'Address.Model',
    'CreditCard.Model',
    'LiveOrder.Model',
    'underscore'
], function AccountModelSite(
    AccountModel,
    Profile,
    ModelsInit,
    Address,
    CreditCard,
    LiveOrder,
    _
) {
    'use strict';

    _.extend(AccountModel.prototype, {
        register: function registerTaxable(userData) {
            // var customer = ModelsInit.getCustomer();
            var user;
            var guestData;
            var customerId;
            if (ModelsInit.customer.isGuest()) {
                guestData = ModelsInit.customer.getFieldValues();

                ModelsInit.customer.setLoginCredentials({
                    internalid: guestData.internalid,
                    email: userData.email,
                    password: userData.password
                });

                ModelsInit.session.login({
                    email: userData.email,
                    password: userData.password
                });

                ModelsInit.customer.updateProfile({
                    internalid: guestData.internalid,
                    firstname: userData.firstname,
                    lastname: userData.lastname,
                    companyname: userData.company,
                    emailsubscribe: (userData.emailsubscribe && userData.emailsubscribe !== 'F') ? 'T' : 'F'
                });
            } else {
                userData.emailsubscribe = (userData.emailsubscribe && userData.emailsubscribe !== 'F') ? 'T' : 'F';

                customerId = ModelsInit.session.registerCustomer({
                    firstname: userData.firstname,
                    lastname: userData.lastname,
                    companyname: userData.company,
                    email: userData.email,
                    password: userData.password,
                    password2: userData.password2,
                    emailsubscribe: (userData.emailsubscribe && userData.emailsubscribe !== 'F') ? 'T' : 'F'
                });
                ModelsInit.customer.updateProfile({
                    internalid: customerId,
                    customfields: {
                        'custentity_nsps_resalenumber': userData.resaleDealerNumber
                    }
                });
            }


            user = Profile.get();
            user.isLoggedIn = ModelsInit.session.isLoggedIn2() ? 'T' : 'F';
            user.isRecognized = ModelsInit.session.isRecognized() ? 'T' : 'F';

            return {
                touchpoints: ModelsInit.session.getSiteSettings(['touchpoints']).touchpoints,
                user: user,
                cart: LiveOrder.get(),
                address: Address.list(),
                creditcard: CreditCard.list()
            };
        }
    });
});
