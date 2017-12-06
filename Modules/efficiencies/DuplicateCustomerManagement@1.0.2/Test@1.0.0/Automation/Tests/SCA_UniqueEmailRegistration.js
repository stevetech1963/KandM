describe('SCA Unique Email Registration Test Automation', function()
{
    it ('Should Vaildate Unique Email', function(done)
    {
        var client = this.client;

        // .url('http://montblanc.automation2.crovetto.me')
        // http://muldrow.demo.efficiencies.cdn.netsuitestaging.com

        Preconditions.start(
                'get_customer_using_config'
            ,   'customer_registration_data'
            ,   function(err, customerLogin, registerData) {
                client
                    .url('http://muldrow.demo.efficiencies.cdn.netsuitestaging.com')
                    .click('.header-profile-login-link')
                    .waitForAjax()
                    .LoginRegister.fillRegisterUser(
                        registerData
                    )
                    .pause(2000)
                    .click('.login-register-register-form-submit')
                    .waitForAjax()
                    .getText('.global-views-message-error', function(err, text) {
                        if (text === undefined) {
                            if (customerLogin) {
                                expect(customerLogin.email).not.toBe(registerData.email);
                            }
                        }
                    })
                    .pause(5000)
                    .call(done)
                ;
            });
    });
})
