describe('SCA Unique Email Registration Test Automation', function()
{
    it ('Should Register New Email', function(done)
    {
        var client = this.client;

        // .url('http://montblanc.automation2.crovetto.me')
        // http://muldrow.demo.efficiencies.cdn.netsuitestaging.com

        Preconditions.start(
            'configuration'
        ,   'create_one_full_customer'
        ,   'generate_one_customer_registration_data'
        ,   function(err, conf, customer, registerData) {
                console.log(customer);
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

                .pause(5000)
                .call(done)
            ;
        });
    });
})