define('ItemView.LeadTime.Model'
,	[
		'SC.Model'
	,	'Models.Init'

	,	'Backbone.Validation'
	,	'underscore'
	]
,	function (
		SCModel
	,	ModelsInit

	,	BackboneValidation
	,	_
	)
{
	'use strict';
	// @class Address.Model Defines the model used by the Address frontent module.
	// @extends SCModel
	return SCModel.extend({

		name: 'ItemViewLeadTime',

        getLeadTime : function getLeadTime(id){

            var url = nlapiResolveURL('SUITELET', 'customscript_sc_get_location_lead_time', 'customdeploy_sc_get_location_lead_time', true)
			,	response = nlapiRequestURL(url, {id: id})
			,	result   = {};


			if(response.getBody())
			{
				result = JSON.parse( response.getBody() );
			}

            return result;
        }
    });
});
