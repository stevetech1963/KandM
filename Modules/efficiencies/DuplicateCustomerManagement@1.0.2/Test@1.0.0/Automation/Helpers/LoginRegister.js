
defineHelper('LoginRegister',
{
	// USED FROM ANYWHERE
	loginAs: function (customer, cb)
	{
		var client = this;

		this
			.waitForAjax()

			// REDIRECT TO LOGIN PAGE IF NOT THERE
			.LoginRegister.isLoginRegisterPage(function (err, is_login_page)
			{
				if (!is_login_page)
				{
					client
						.waitForExist(Selectors.LoginRegister.loginTouchPoint, 5000)
						.click(Selectors.LoginRegister.loginTouchPoint)
					;
				}
			})

			.LoginRegister.fillLogin(customer)
			.LoginRegister.clickSubmitLogin()

			.call(cb)
		;
	}

	// USED FROM CHECKOUT IN SITEBUILDER
,	doLogin: function (params, cb) {
		this
			.waitForAjax()
			.LoginRegister.fillLogin(params)
			.LoginRegister.clickSubmitLogin()
			.call(cb)
		;
	}

,	isLoginRegisterPage: function (cb) {
		this
			.waitForExist('.login-register-title', 1000, function (err, form_in_page)
			{
				cb(null, form_in_page);
			})
		;
	}

,	fillLogin: function (customer, cb)
	{
		var user = customer.user || customer.email;
		this
			.waitForExist(Selectors.LoginRegister.loginEmail, 5000)
			.setValue(Selectors.LoginRegister.loginEmail, user)
			.setValue(Selectors.LoginRegister.loginPassword, customer.password)
			.call(cb)
		;
	}

, 	clickSubmitLogin: function (cb)
	{
		this
			.click(Selectors.LoginRegister.submitLogin)
			.waitForAjax()

			// IF IN MODAL
			.GlobalViews.Modal.waitForModalClosure()

			.call(cb)
		;
	}

,	proceedAsGuest: function (params, cb)
	{
		this
			.waitForExist(Selectors.LoginRegister.guestButton, 5000)
			.click(Selectors.LoginRegister.guestButton)

			.waitForExist(Selectors.LoginRegister.guestFirstName, 5000)
			.setValue(Selectors.LoginRegister.guestFirstName, params.firstName || params.name)
			.setValue(Selectors.LoginRegister.guestLastName, params.lastName)
			.setValue(Selectors.LoginRegister.guestEmail, params.email)

			.waitForExist(Selectors.LoginRegister.guestSubmit, 5000)

			.click(Selectors.LoginRegister.guestSubmit)
			.waitForAjax()
			.call(cb)
		;
	}

,	clickCreateAccount: function (cb)
	{
		this
			.waitForExist(Selectors.LoginRegister.clickCreateAccount, 5000)
			.click(Selectors.LoginRegister.clickCreateAccount)
			.call(cb)
		;
	}

,	fillRegisterUser: function (user, cb)
	{
		this
			.waitForExist(Selectors.LoginRegister.registerFirstName, 5000)

			.setValue(Selectors.LoginRegister.registerFirstName, user.firstName)
			.setValue(Selectors.LoginRegister.registerLastName, user.lastName)
			.setValue(Selectors.LoginRegister.registerCompany, user.company)
			.setValue(Selectors.LoginRegister.registerEmail, user.email)
			.setValue(Selectors.LoginRegister.registerPassword, user.password)
			.setValue(Selectors.LoginRegister.registerPassword2, user.password)

			.call(cb)
		;
	}

,	clickSubmitRegisterUser: function (cb)
	{
		this
			.waitForExist(Selectors.LoginRegister.registerSubmit, 5000)
			.click(Selectors.LoginRegister.registerSubmit)
			.waitForAjax()
			.call(cb)
		;
	}

,	registerUser: function (user, cb)
	{

		this
			.waitForAjax()

			.click(Selectors.LoginRegister.registerLink)

			.waitForAjax()

			.LoginRegister.checkRegisterFieldsExist(function (err, datatype) {
		  		for (var key in datatype) {
				    if (datatype.hasOwnProperty(key)) {
				    	expect(datatype[key]).toEqual(true, 'Error: ' + key + ' not found.')
				    	//TODO
				    	//expect(datatype[key]).toEqual(true, colors.yellow('Error: ' + key + ' not found.'))
				    }
				}
			})

			.LoginRegister.fillRegisterUser(user)
			.LoginRegister.clickSubmitRegisterUser()

			.call(cb)
		;
	}

,	clickRegisterLinkInLoginModal: function (cb)
	{
		this
			.waitForExist('[data-type=register-now]', 5000)
			.click('[data-type=register-now]')
			.click('[data-type=register-now]')
			.call(cb)
		;
	}

,	checkRegisterFieldsExist: function (cb)
	{
		var datatype = {
			"registerFirstName" : false
		,	"registerLastName" : false
		,	"registerCompany" : false
		,	"registerEmail" : false
		,	"registerPassword" : false
		,	"registerPassword2" : false
		,	"registerSubmit" : false
		,	"registerEmailSubscribe" : false
		};

		this
			.waitForExist(Selectors.LoginRegister.registerFirstName, 5000)

			.isExisting(Selectors.LoginRegister.registerFirstName, function (err, exists)
			{
				datatype.registerFirstName = exists;
			})

			.isExisting(Selectors.LoginRegister.registerLastName, function (err, exists)
			{
				datatype.registerLastName = exists;
			})

   			.isExisting(Selectors.LoginRegister.registerCompany, function (err, exists)
   			{
				datatype.registerCompany = exists;
			})

			.isExisting(Selectors.LoginRegister.registerEmail, function (err, exists)
			{
				datatype.registerEmail = exists;
			})

			.isExisting(Selectors.LoginRegister.registerPassword, function (err, exists)
			{
				datatype.registerPassword = exists;
			})

			.isExisting(Selectors.LoginRegister.registerPassword2, function (err, exists)
			{
				datatype.registerPassword2 = exists;
			})

			.isExisting(Selectors.LoginRegister.registerSubmit, function (err, exists)
			{
				datatype.registerSubmit = exists;
			})

			.isExisting(Selectors.LoginRegister.registerEmailSubscribe, function (err, exists)
			{
				datatype.registerEmailSubscribe = exists;
			})

			.call(function ()
			{
				cb(null, datatype);
			})
		;
	}

});