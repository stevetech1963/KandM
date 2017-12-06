defineHelper('LoginRegister.Expects', 
{
	checkIsLoggedIn: function (cb)
	{
		this
			.waitForAjax()
			.waitForExist(Selectors.LoginRegister.myAccountLayout, 5000)
			.isExisting(Selectors.LoginRegister.myAccountLayout, function(err, text)
			{
				expect(text).toBeTrue();
			})
			.call(cb)
		;
	}
});