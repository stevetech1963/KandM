define(
	'ItemView.LeadTime.ServiceController'
,	[
		'ServiceController'
	,	'Application'
	,	'ItemView.LeadTime.Model'
	]
,	function(
		ServiceController
	,	Application
	,	LeadTimeModel
) {
		'use strict';
		// @extend ServiceController
		return ServiceController.extend({

            // @property {String} name Mandatory for all ssp-libraries model
            name:'ItemView.LeadTime.ServiceController',

            get: function()
			{
                var id = this.request.getParameter('internalid');
				return LeadTimeModel.getLeadTime(id);
			}
        })
    })
