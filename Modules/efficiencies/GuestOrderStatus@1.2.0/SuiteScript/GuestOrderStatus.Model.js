define('GuestOrderStatus.Model', [
    'GuestOrderStatus.Configuration',
    'SC.Model',
    'OrderStatusSummary.Model',
    'SearchHelper',
    'underscore'
], function GuestOrderStatusModel(
    Configuration,
    SCModel,
    OrderStatusSummary,
    SearchHelper,
    _
) {
    'use strict';

    return SCModel.extend({
        name: 'GuestOrderStatus',
        record: 'salesorder',
        filters: [
            {fieldName: 'mainline', join: null, operator: 'is', value1: 'T'}
        ],
        columns: {
            internalid: {fieldName: 'internalid'},
            orderid: {fieldName: 'tranid'},
            trackingnumbers: {fieldName: 'trackingnumbers'},
            shipmethod: {fieldName: 'shipmethod', type: 'text'},
            status: {fieldName: 'status', type: 'text'},
            statusID: {fieldName: 'status'}
        },

        proxy: function proxy(data, request) {
            var serviceUrl = nlapiResolveURL(
                'SUITELET',
                'customscript_ef_gos_sl_guest_order',
                'customdeploy_ef_gos_sl_guest_order',
                false
            );
            var currentDomainMatch = request.getURL().match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
            var currentDomain = currentDomainMatch && currentDomainMatch[0];
            var relativeServiceUrl = serviceUrl.replace(/^.*\/\/[^\/]+/, '');
            var finalServiceUrl;
            var apiResponse;
            var responseData;
            var unknownError = {
                status: 500,
                code: 'ERR_UNKNONW',
                message: 'Internal error'
            };
            if (currentDomain[currentDomain.length - 1] === '/') {
                currentDomain = currentDomain.slice(0, -1);
            }


            data.website = session.getSiteSettings(['siteid']).siteid;
            data.orderid = (data.orderid || '').split('-').pop();

            finalServiceUrl = currentDomain + relativeServiceUrl;
            apiResponse = nlapiRequestURL(finalServiceUrl, JSON.stringify(data), request.getAllHeaders(), 'POST');

            try {
                responseData = JSON.parse(apiResponse.getBody());
            } catch (e) {
                throw unknownError;
            }

            if (parseInt(apiResponse.getHeader('Custom-Header-Status'), 10) !== 200) {
                throw _.extend({}, {
                    status: apiResponse.getHeader('Custom-Header-Status'),
                    code: responseData.errorCode,
                    message: responseData.errorMessage
                });
            }

            return responseData;
        },

        get: function get(data) {
            var orderId = data.orderid;
            var secondField = data.secondField || 'email';
            var secondFieldValue = data[secondField];
            var secondFieldConfig;
            var search;
            var result;
            var location;
            var status;

            if (!orderId || (!secondFieldValue)) {
                throw notFoundError;
            }

            secondFieldConfig = _.findWhere(Configuration.secondField, {id: secondField});

            if (!secondFieldConfig) {
                throw methodNotAllowedError;
            }

            this.columns[secondField] = { fieldName: secondFieldConfig.id };
            this.filters.push({fieldName: this.columns.orderid.fieldName, operator: 'is', value1: orderId });
            this.filters.push({fieldName: 'website', operator: 'is', value1: data.website });
            this.filters.push({fieldName: secondField, operator: 'is', value1: secondFieldValue});

            search = new SearchHelper(this.record, this.filters, this.columns);
            result = search.search().getResults();

            if (!result || result.length !== 1) {
                throw notFoundError;
            } else {
                location = _.first(OrderStatusSummary.getLocation(result[0].internalid));
                if (result[0].statusID && (!_.contains(OrderStatusSummary.statusesWithNoSummary, result[0].statusID))) {
                    status = _.values(OrderStatusSummary.get(result[0].internalid));

                    result[0].pickupStatus = status[0].pickup;
                    result[0].shippingStatus = status[0].shipping;
                }

                if (location) {
                    result[0].address = location.name + ', ' + this.formatAddress(location);
                    result[0].openingHours = location.openingHours;
                }
            }

            // For form purposes.
            result[0].secondField = secondField;

            return result[0];
        },
        formatAddress: function formatAddress(data) {
            var address;

            if (data) {
                address = data.address1 + ' ' + data.city;
                if (data.state) {
                    address += ', ' + data.state;
                }
                if (data.zipcode) {
                    address += ', ' + data.zipcode;
                }

                address += ' ' + data.country;
            }

            return address;
        }
    });
});
