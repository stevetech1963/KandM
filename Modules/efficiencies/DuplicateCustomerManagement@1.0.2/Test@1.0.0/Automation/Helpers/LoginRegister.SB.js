defineHelperDependencies('LoginRegister.SB', 'LoginRegister');

defineHelper('LoginRegister.SB',
{

	loginAs: function (params, cb)
	{
		this
			.waitForExist(Selectors.LoginRegister.SB_loginTouchPoint, 5000)
			.click(Selectors.LoginRegister.SB_loginTouchPoint)

			.LoginRegister.fillLogin(params)
			.LoginRegister.clickSubmitLogin()

			.call(cb)
		;
	}

,	logInLink: function (cb)
	{
		this
			.waitForExist(Selectors.LoginRegister.SB_loginTouchPoint, 5000)
			.click(Selectors.LoginRegister.SB_loginTouchPoint)
			.call(cb)
		;
	}

,	registerUser: function (user, cb)
	{
		this
			.waitForExist(Selectors.LoginRegister.SB_registerTouchPoint, 5000)
			.click(Selectors.LoginRegister.SB_registerTouchPoint)

			.LoginRegister.fillRegisterUser(user)
			.LoginRegister.clickSubmitRegisterUser()

			.call(cb)
		;
	}
});