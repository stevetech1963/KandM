describe("Custom preconditions", function() {
    it("Should get customer credentials from config file", function(done) {
       Preconditions.start(
            'get_customer_using_config'
            ,   function (err, customerLogin) {
                console.log(customerLogin);
                done();
            }
       );
    });
})