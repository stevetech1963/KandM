function scriptableLogs(request, response){
   if(request.getParameter('log')){
      nlapiLogExecution('DEBUG', 'scriptable checkout log', request.getParameter('log'));
   }
   response.write(JSON.stringify({'success' : true}));
}

function setCurrentLineRate(rate)
{
   nlapiSetCurrentLineItemValue('item', 'rate', rate, true, true);
   var qty = parseInt(nlapiGetCurrentLineItemValue('item', 'quantity'));
   var amount = qty * rate;
   nlapiSetCurrentLineItemValue('item', 'amount', amount, true, true);
}

function customRecalc(action){
  if(action=='commit' || action == "COMMIT"){
    nlapiSetFieldValue('shippingcost', 100);
    nlapiSetFieldValue('shiptotal', 100);
    nlapiSetFieldValue('shippingtotal', 100);
    nlapiSetFieldValue('shippingtax1rate');
  }
}
function customValidateLine(type)
{
   if (type != 'item')
   {
      return true;
   }
  // TODO Fetch the item price that need set dynamically from either a field on item record or a custom record
   setCurrentLineRate(100);
   return true;
}



function customFieldChange(type, name, linenum){

  var scriptableLogURL = "https://forms.na1.netsuite.com/app/site/hosting/scriptlet.nl?script=329&deploy=1&compid=3667905&h=e19bdea0b000de9c1c94";
  if(name == 'custbody_ltl_req_info'){
  nlapiRequestURL(scriptableLogURL + '&log=' + name);
  nlapiRequestURL(scriptableLogURL+ '&log=total is' + nlapiGetFieldValue('custbody_ltl_req_info'));

    if(!nlapiGetFieldValue('custbody_ltl_req_info'))
        return;

  var checkout_info = JSON.parse(nlapiGetFieldValue('custbody_ltl_req_info'));

      nlapiRequestURL(scriptableLogURL + '&log=' + nlapiGetFieldText(name));
  nlapiSetFieldValue('shipmethod', 17012, true,true)
    nlapiSetFieldValue('shippingcost', checkout_info.SHIP_TOTAL, true,true);
    nlapiSetFieldValue('shippingtotal', checkout_info.SHIP_TOTAL, true, true);
    nlapiSetFieldValue('shippingtax1rate', checkout_info.SHIP_TOTAL, true, true);

  }
}
