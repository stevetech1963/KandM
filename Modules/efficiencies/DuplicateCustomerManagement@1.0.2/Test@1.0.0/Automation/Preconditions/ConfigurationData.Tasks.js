Preconditions.add('customer_registration_data', function(cb)
{ //a1s2d3q4
    /*
        @Account For testing
        @Registered User
        email: 1467053133756@automationbacon.com
        pass:  a1s2d3q4

    */

    var customer = {
        'email': '1467053133756@automationbacon.com'
        ,   'firstName': 'Roberto'
        ,   'lastName': new Date().getTime() + 'Bolanos'
        ,   'company': 'Queen'
        ,   'password': 'a1s2d3q4X'
        ,   'passwordConfirmation': 'a1s2d3q4X'
    };

    cb(null, customer);
});

Preconditions.add(
    'get_customer_using_config', [
    'configuration'
,   'customer_registration_data'
    ], function(
        configuration,
        registerData,
        done
    ) {
    Preconditions.Configuration.addSection('myCustomer', {
        'email': null,
        'password': null
    });
    var myCustomer = registerData;
    if ( myCustomer && (myCustomer.email && myCustomer.password) )
    {
        Preconditions.Customer.getCustomerByEmail(
            myCustomer.email
        ,   Preconditions.Configuration.credentials
        ,   function(err, customerData) {
                if (!err) {
                    customerData.password = myCustomer.password;
                    done(null, customerData);
                }
                else {
                    console.log(err);
                }
            }
        )
    }
    else
    {
        pending("Please fill myCustomer entry in " + Preconditions.Configuration.configurationFilePath);
    }
});