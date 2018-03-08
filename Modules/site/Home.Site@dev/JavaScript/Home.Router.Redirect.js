define('Home.Router.Redirect', [
    'Home.Router',
    'underscore'
], function (
    HomeRouter,
    _
) {
    'use strict';

    _.extend(HomeRouter.prototype, {
        homePage: function ()
    		{
    			// var view = new HomeView({application: this.application});
                window.location = 'https://www.dawsontireandwheel.com';


    			//view.showContent();
    		}
    })
})
