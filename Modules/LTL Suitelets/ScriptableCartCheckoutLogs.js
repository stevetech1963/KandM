function scriptableLogs(request, response){
   if(request.getParameter('log')){
      nlapiLogExecution('DEBUG', 'scriptable checkout log', request.getParameter('log'));
   }
   response.write(JSON.stringify({'success' : true}));
}


function getLTLQuotes(request, response){
  
  nlapiLogExecution('DEBUG', 'method: '+ request.getBody());
  
  var params = request.getAllParameters()
for ( param in params )
{
    nlapiLogExecution('DEBUG', 'parameter: '+ param);
    nlapiLogExecution('DEBUG', 'value: '+params[param]);
} 
  
   var reqBody = JSON.parse(request.getBody());
   var itemInfo = reqBody.itemInfo;
  var transInfo = reqBody.transInfo;
  var shipInfo = reqBody.shipInfo;
  
   nlapiLogExecution('DEBUG', 'itemInfo before parse', JSON.stringify(itemInfo));
  nlapiLogExecution('DEBUG', 'itemInfo after parse', itemInfo);
 
  

   if(!itemInfo){
      itemInfo = [
                 {'itemid': 3900, 'quantity': 2},
                     {'itemid': 10831, 'quantity': 2}
                 ]
   }

   var itemQtyMap = {};



   var itemIds = [];
   for(var i=0; i<itemInfo.length; i++){
      itemIds.push(itemInfo[i].itemid);
      itemQtyMap[itemInfo[i].itemid] = itemInfo[i].quantity;
   }
nlapiLogExecution("DEBUG", "itemids", itemIds.join(','));

   var itemSearchRecs = null
   if(itemIds && itemIds.length > 0){
      var itemSearchFilters = [];
      itemSearchFilters.push(new nlobjSearchFilter('internalid', null, 'anyof', itemIds));

      var itemSearchColumns = [];
      itemSearchColumns.push(new nlobjSearchColumn('weight'));
      itemSearchColumns.push(new nlobjSearchColumn('custitem_nxturn_height'));
      itemSearchColumns.push(new nlobjSearchColumn('custitem_nxturn_width'));
      itemSearchColumns.push(new nlobjSearchColumn('custitem_nxturn_length'));
      itemSearchColumns.push(new nlobjSearchColumn('custitem_nxturn_freight_class'));
      itemSearchColumns.push(new nlobjSearchColumn('custitem_nxturn_nmfc_number'));
      itemSearchColumns.push(new nlobjSearchColumn('custitem_mounted_height'));
      itemSearchColumns.push(new nlobjSearchColumn('custitem_mounted_width'));
      itemSearchColumns.push(new nlobjSearchColumn('custitem_mounted_length'));
      itemSearchColumns.push(new nlobjSearchColumn('custitem45'));
      itemSearchColumns.push(new nlobjSearchColumn('custitem46'));



      itemSearchRecs = nlapiSearchRecord('item', null, itemSearchFilters, itemSearchColumns)
   }




   var PRODUCTS = [];
   for(var i=0; i<itemSearchRecs.length;i++){

       var reqQty = itemQtyMap[itemSearchRecs[i].getId()];
       var weight = "" +  itemSearchRecs[i].getValue('weight') * reqQty + "";



       var height = itemSearchRecs[i].getValue('custitem_nxturn_height');
       var length = itemSearchRecs[i].getValue('custitem_nxturn_length');
       var width = itemSearchRecs[i].getValue('custitem_nxturn_width');
       var freightclass = itemSearchRecs[i].getText('custitem_nxturn_freight_class');
       var nmfc = itemSearchRecs[i].getValue('custitem_nxturn_nmfc_number');

//if mounted was selected we use different custom fields from the item record
    if(transInfo.MOUNTING == "True")
    {

      height = itemSearchRecs[i].getValue('custitem_mounted_height');
      length = itemSearchRecs[i].getValue('custitem_mounted_length');
      width = itemSearchRecs[i].getValue('custitem_mounted_width');
      freightclass = itemSearchRecs[i].getText('custitem45');
      nmfc = itemSearchRecs[i].getValue('custitem46');

    }


       var productData = {
          "PACKAGING_TYPE_ID": "1",
          "PACKAGING_TYPE": "pallet",
          "QUANTITY": "1",
          "ITEM_QUANTITY": "" + reqQty + "",
          "ITEM_WEIGHT": itemSearchRecs[i].getValue('weight'),
          "DESCRIPTION": itemSearchRecs[i].getId(),
          "WEIGHT": weight,
          "HEIGHT": height,
          "LENGTH": length,
          "WIDTH": width,
          "FREIGHT_CLASS_ID":  freightclass,
          "FREIGHT_CLASS":  freightclass,
          "NMFC_NUMBER":  nmfc
        }
        PRODUCTS.push(productData);
   }

nlapiLogExecution('DEBUG', 'productData', JSON.stringify(productData));

var today = new Date();
var readydate = nlapiAddDays(today, 1);


nlapiLogExecution('DEBUG', 'ready_date', readydate);
   var requestdata = {
        "SHIPMENT": {
          "INT_ID": "5898",
          "LABEL": "",
          "INTEGRATION_REFERENCE_NUMBER": "",
          "READY_DATE": readydate,
          "DECLARED_VALUE": transInfo.SUB_TOTAL,
          "INTERNAL_REFERENCE1": "",
          "INTERNAL_REFERENCE2": "",
          "WAREHOUSE": "2",
          "BOL_NUMBER": "",
          "SHIPMENT_REFERENCE": "",
          "LOCATION": {
            "NAME": shipInfo.NAME,
            "CONTACT": shipInfo.CONTACT,

            "EMAIL": "",
            "PHONE": shipInfo.PHONE,
            "STREET_ADDRESS": shipInfo.STREET_ADDRESS,
            "CITY": shipInfo.CITY,
            "STATE": shipInfo.STATE,
            "POSTAL_CODE": shipInfo.POSTAL_CODE,
            "LIFTGATE_REQUIRED": transInfo.LIFTGATE_REQUIRED,
            "HAS_LOADING_DOCK": transInfo.HAS_LOADING_DOCK,
            "SPECIAL_INSTRUCTIONS": transInfo.SPECIAL_INSTRUCTIONS,
            "APPOINTMENT": transInfo.APPOINTMENT
          },
          "PRODUCTS": {
            "PRODUCT": PRODUCTS
          },
          "SHIPMENT_REFERENCE_TYPE": "salesorder"
        }
   }
   
   nlapiLogExecution('DEBUG', 'reqData', JSON.stringify(requestdata));
   var quoteResponse = nlapiRequestURL('http://ws.nxturn.com/FV_LTL', JSON.stringify(requestdata), { "Content-Type": "application/json" });
nlapiLogExecution('DEBUG', 'QUOTES RESPONSE: ', quoteResponse.getBody());
   var quotes = JSON.parse(quoteResponse.getBody());
  nlapiLogExecution('DEBUG', 'QUOTES RESPONSE: ', quoteResponse.getBody());
  response.write(JSON.stringify(quotes));

}
