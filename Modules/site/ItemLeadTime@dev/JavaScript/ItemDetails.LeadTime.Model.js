define('ItemDetails.LeadTime.Model'
,	[	'underscore'
	,	'Backbone'
	,	'Utils'
	]
,	function (
		_
	,	Backbone
	)
{
    'use strict';

    return Backbone.Model.extend(
	{
		// @property {String} urlRoot
        urlRoot: _.getAbsoluteUrl('services/ItemView.LeadTime.Service.ss')
    });
});
