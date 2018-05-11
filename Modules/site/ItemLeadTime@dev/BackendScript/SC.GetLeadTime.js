function getLeadTime(request){

    var id = request.getParameter('id')
    var leadtime;
    try {
        var filters = [
            new nlobjSearchFilter("internalid",null,"is",id),
            new nlobjSearchFilter("makeinventoryavailablestore","inventorylocation","is", "T")
        ],
        columns = [
            new nlobjSearchColumn("locationleadtime")
        ],
        search = nlapiSearchRecord("item", null, filters, columns);

        _.each(search, function(locations){
            var LocationLeadTime = locations.getValue("locationleadtime")
            if(!leadtime){
                leadtime = LocationLeadTime;
            }else{
                leadtime = !!LocationLeadTime && LocationLeadTime < leadtime ? LocationLeadTime : leadtime
            }
        });
    }catch(e){
        
    }

    response.setContentType('json');
    response.write(JSON.stringify({leadtime : leadtime}));
}
