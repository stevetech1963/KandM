function afterSubmit(type){

	/*

	Quote Number	custrecord_nxturn_ltlquote_quotenum	Free-Form Text	 	 	Yes
 	Carrier Name	custrecord_nxturn_ltlquote_carriername	Free-Form Text	 	 	Yes
 	Total Amount	custrecord_nxturn_ltlquote_totalamt	Free-Form Text	 	 	Yes
 	Transit Days	custrecord_nxturn_ltlquote_transitdays	Free-Form Text	 	 	Yes
 	Pickup Date	custrecord_nxturn_ltlquote_pickupdate	Free-Form Text	 	 	Yes
 	Estimated Delivery Date	custrecord_nxturn_ltlquote_estdelivdate	Free-Form Text	 	 	Yes
 	Reference ID	custrecord_nxturn_ltlquote_refid	Free-Form Text	 	 	Yes
 	Sales Order	custrecord_nxturn_ltlquote_salesorder	List/Record	Transaction	 	Yes
 	Quote	custrecord_nxturn_ltlquote_quote	List/Record	Transaction	 	Yes
 	Customer	custrecord_nxturn_ltlquote_customer	List/Record	Customer	 	Yes
 	Item Fulfillment	custrecord_nxturn_ltlquote_itemfulfill	List/Record	Transaction	 	Yes
	*/

	/*
		{
  "LIFTGATE_REQUIRED": "False",
  "HAS_LOADING_DOCK": "False",
  "APPOINTMENT": "True",
  "SPECIAL_INSTRUCTIONS": "",
  "SUB_TOTAL": "963.00",
  "SHIP_CARRIER": "FedEx Freight Priority (Freightquote)",
  "SHIP_TOTAL": "371.9",
  "QUOTE_ID": "93799464",
  "SHIP_METHOD": 17012
}
	*/

	var soRec = nlapiGetNewRecord();


	nlapiLogExecution('DEBUG', 'shipmethod', soRec.getFieldValue('shipmethod'));

	// if (soRec.getId() == '332199' ||  (type == 'create' && soRec.getFieldValue('source') == "Web (Dawson SCA)"))
	 if (type == 'create' && soRec.getFieldValue('shipmethod') == '17012')  //LTL Quotes ship method
	  {

		  	var reqInfo = soRec.getFieldValue('custbody_ltl_req_info');
		  	var reqInfoObj = JSON.parse(reqInfo);

			var quoteRec = nlapiCreateRecord('customrecord_nxturn_ltlquote');

			quoteRec.setFieldValue('custrecord_nxturn_ltlquote_quotenum', reqInfoObj.QUOTE_ID.toString());
			quoteRec.setFieldValue('custrecord_nxturn_ltlquote_carriername', reqInfoObj.SHIP_CARRIER);
			quoteRec.setFieldValue('custrecord_nxturn_ltlquote_totalamt', reqInfoObj.SHIP_TOTAL);
			quoteRec.setFieldValue('custrecord_nxturn_ltlquote_transitdays', reqInfoObj.TRANSIT_DAYS);
			quoteRec.setFieldValue('custrecord_nxturn_ltlquote_pickupdate', reqInfoObj.PICKUP_DATE);
			quoteRec.setFieldValue('custrecord_nxturn_ltlquote_estdelivdate', reqInfoObj.ESTIMATED_DELIVERY_DATE);
			quoteRec.setFieldValue('custrecord_nxturn_ltlquote_refid', reqInfoObj.REFERENCE_ID.toString());
			-
			quoteRec.setFieldValue('custrecord_nxturn_ltlquote_quote', '');
			quoteRec.setFieldValue('custrecord_nxturn_ltlquote_itemfulfill', '');
			quoteRec.setFieldValue('custrecord_nxturn_ltlquote_salesorder', soRec.getId());
			quoteRec.setFieldValue('custrecord_nxturn_ltlquote_customer', soRec.getFieldValue('entity'));
			var quoteRecId = nlapiSubmitRecord(quoteRec, true, true);
			nlapiLogExecution('DEBUG', 'Submitted Quote Record ID', quoteRecId);
	}
}
