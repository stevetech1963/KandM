define('EF - GOS - SL - Guest Order Status Service', [
    'GuestOrderStatus.Model',
    'Application'
], function GuestOrderStatusService(
    GuestOrderStatusModel,
    Application
) {
    'use strict';

    var service = function service(request) {
        var method = request.getMethod();
        var data;

        /* Only run this script from the webstore */
        if (nlapiGetContext().getExecutionContext().toString() !== 'webstore') {
            return Application.sendError(forbiddenError);
        }

        try {
            data = JSON.parse(request.getBody());
        } catch (e) {
            return Application.sendError(methodNotAllowedError);
        }

        try {
            switch (method) {
            case 'POST':
                Application.sendContent(GuestOrderStatusModel.get(data));
                break;
            default:
                return Application.sendError(methodNotAllowedError);
            }
        } catch (e) {
            return Application.sendError(e);
        }
    };

    return {
        service: service
    };
});