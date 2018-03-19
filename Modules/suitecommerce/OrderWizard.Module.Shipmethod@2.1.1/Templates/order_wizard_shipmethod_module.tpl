{{!
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

<div class="order-wizard-shipmethod-module">
	{{#if showTitle}}
		<h3 class="order-wizard-shipmethod-module-title">
			{{title}}
		</h3>
	{{/if}}
	
	{{#if showEnterShippingAddressFirst}}
		<div class="order-wizard-shipmethod-module-message">
			{{translate 'Warning: Please enter a valid shipping address first'}}
		</div>
	{{else}}
		{{#if showLoadingMethods}}
			<div class="order-wizard-shipmethod-module-message">
				{{translate 'Loading...'}}
			</div>
		{{else}}
			{{#if hasShippingMethods}}
				{{#if showSelectForShippingMethod}}
					<select data-action="select-delivery-option" data-action="edit-module" class="order-wizard-shipmethod-module-option-select">
						<option>{{translate 'Select a delivery method'}}</option>
						{{#each shippingMethods}}
							<option 
							{{#if isActive}}selected{{/if}} 
							value="{{internalid}}"
							id="delivery-options-{{internalid}}">
								{{rate_formatted}} - {{name}}
							</option>
						{{/each}}
					</select>
				{{else}}
					{{#each shippingMethods}}



						<a data-action="select-delivery-option-radio" 
						class="order-wizard-shipmethod-module-option {{#if isActive}}order-wizard-shipmethod-module-option-active{{/if}}"
						data-value="{{internalid}}">
							<input type="radio" name="delivery-options" data-action="edit-module" class="order-wizard-shipmethod-module-checkbox" 
							{{#if isActive}}checked{{/if}}
							value="{{internalid}}" 
							id="delivery-options-{{internalid}}" />
							
							<span class="order-wizard-shipmethod-module-option-name">{{name}}
								

								{{#if showGetQuotesLink}}
									<a href="#" data-toggle="modal" data-target="#ltl-popup"><span id="ltlquotesbutton" class="order-wizard-shipmethod-module-option-price">Get LTL Quotes</span></a><br><br>

								<script>
									jQuery('.order-wizard-step-button-continue').show();
									if(!SC.ENVIRONMENT.SHIP_TOTAL && !SC.ENVIRONMENT.SHIP_CARRIER){
										jQuery('.order-wizard-step-button-continue').hide();
									}
								</script>
									
									
                                   
								{{else}}
									<span class="order-wizard-shipmethod-module-option-price">
									{{rate_formatted}}
									</span>	
                                      	


								{{/if}}

								
							</span>
						</a>
					{{/each}}
				{{/if}}



	         <!-- LTL Quotes Modal popup-->
            <div class="modal alertPopup fade" id="ltl-popup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
              <div class="modal-dialog " role="document">
                <div class="modal-content" style="max-width:600px;">
                  <div class="modal-header">
                    <button type="button" onclick="jQuery('#divLTLQuotes').hide()" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="gridSystemModalLabel">LTL QUOTES FROM SERVICE</h4>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      <div class="col-sm-12">
                      <div class="order-wizard-shipmethod-module">   


              <form>

             <input type="checkbox" name="LIFTGATE_REQUIRED" class="order-wizard-shipmethod-module-checkbox" id="LIFTGATE_REQUIRED">
             <span class="order-wizard-shipmethod-module-option-name">LIFTGATE REQUIRED  </span>
             <br><br>

            <input type="checkbox" name="HAS_LOADING_DOCK" class="order-wizard-shipmethod-module-checkbox" id="HAS_LOADING_DOCK">
            <span class="order-wizard-shipmethod-module-option-name">HAS LOADING DOCK  </span>
            <br><br>

             <input type="checkbox" name="APPOINTMENT" class="order-wizard-shipmethod-module-checkbox" id="APPOINTMENT">
             <span class="order-wizard-shipmethod-module-option-name">Need APPOINTMENT  </span>
             <br><br>

  			<span class="order-wizard-shipmethod-module-option-name">SPECIAL INSTRUCTIONS </span>
			<textarea name="comment" name="SPECIAL_INSTRUCTIONS" id="SPECIAL_INSTRUCTIONS" style="margin: 0px; width: 222px; height: 52px;vertical-align: middle;"></textarea>

			<textarea style="display:none" name="quoteInfo" id="quoteInfo"></textarea>
              <br><br>

              <div style="align:center">
              <input type="button" class="address-details-select-address" style="width:160px" onclick="fetchQuotes();" name="btnLTLTransFields" value="Fetch Quotes"></div>


              <script>

              var transBodyFldsObj = {};
              var entityObj ={};


              function applyLTLQuote(){

              	var selectedQuoteId = $("input[type='radio'][name='ltl-delivery-options']:checked").val();
              	var quotelist = JSON.parse(document.getElementById('quoteInfo').value);
              	var selectedQuoteObject = _.findWhere(quotelist.QUOTE, {QUOTE_ID: parseInt(selectedQuoteId,10)});

              	transBodyFldsObj["SHIP_CARRIER"] =  $("input[type='radio'][name='ltl-delivery-options']:checked").attr('ship_carrier');
              	transBodyFldsObj["SHIP_TOTAL"] =  $("input[type='radio'][name='ltl-delivery-options']:checked").attr('ship_total');
              	transBodyFldsObj["QUOTE_ID"] =  $("input[type='radio'][name='ltl-delivery-options']:checked").val();
              	transBodyFldsObj["SHIP_METHOD"] = 17012;

              	transBodyFldsObj["QUOTE_ID"] = selectedQuoteObject.QUOTE_ID;
              	transBodyFldsObj["CARRIER_NAME"] = selectedQuoteObject.CARRIER_NAME;
              	transBodyFldsObj["TOTAL_AMOUNT"] = selectedQuoteObject.TOTAL_AMOUNT;
              	transBodyFldsObj["TRANSIT_DAYS"] = selectedQuoteObject.TRANSIT_DAYS;
              	transBodyFldsObj["PICKUP_DATE"] = selectedQuoteObject.PICKUP_DATE;
              	transBodyFldsObj["ESTIMATED_DELIVERY_DATE"] = selectedQuoteObject.ESTIMATED_DELIVERY_DATE;
              	transBodyFldsObj["REFERENCE_ID"] = selectedQuoteObject.REFERENCE_ID;




              	console.log(JSON.stringify(transBodyFldsObj));

              	SC.ENVIRONMENT.SHIP_TOTAL = transBodyFldsObj.SHIP_TOTAL;
              	SC.ENVIRONMENT.SHIP_CARRIER = transBodyFldsObj.CARRIER_NAME;


             	var model = SC.Application('Checkout').getLayout().currentView.model;
				model.get('options')["custbody_shipping_instrucitons"] = document.getElementById('SPECIAL_INSTRUCTIONS').value;

				console.log(JSON.stringify(transBodyFldsObj));
				model.get('options')["custbody_ltl_req_info"] = JSON.stringify(transBodyFldsObj);
				



				model.save();
				jQuery('#divLTLQuotes').html('');
				jQuery('#ltl-popup').modal('toggle');
				jQuery('a[data-value="17012"]').click();
				jQuery('.order-wizard-step-button-continue').show(); 



				//$("input[type='radio'][name='delivery-options']:checked").attr('ship_carrier')
				//$("input[type='radio'][name='delivery-options']:checked").val()

				


              }

              var QUOTE_LIST = null;

              function fetchQuotes(){
              	var subtotal = SC.Application('Checkout').getLayout().currentView.model.get('summary').subtotal.toString() + ".00";

              	transBodyFldsObj["LIFTGATE_REQUIRED"] = document.getElementById('LIFTGATE_REQUIRED').checked.toString() == "on" ? "True" : "False";
              	transBodyFldsObj["HAS_LOADING_DOCK"] = document.getElementById('HAS_LOADING_DOCK').checked.toString() == "on" ? "True" : "False";
              	transBodyFldsObj["APPOINTMENT"] = document.getElementById('APPOINTMENT').value == "on" ? "True" : "False";
              	transBodyFldsObj["SPECIAL_INSTRUCTIONS"] = document.getElementById('SPECIAL_INSTRUCTIONS').value;
              	transBodyFldsObj["SUB_TOTAL"] = subtotal;




              	var shipAddr = SC.Application('Checkout').getLayout().currentView.model.get('addresses').models[0];
entityObj["NAME"] = shipAddr.get('company')  || "";
entityObj["CONTACT"] =  shipAddr.get('fullname')  || "";
entityObj["PHONE"] =  shipAddr.get('phone')  || "";
entityObj["STREET_ADDRESS"] =  shipAddr.get('addr1')  || "";
entityObj["CITY"] =  shipAddr.get('city')  || "";
entityObj["STATE"] =  shipAddr.get('state')  || "";
entityObj["POSTAL_CODE"] =  shipAddr.get('zip')  || "";


              	var view = SC.Application('Checkout').getLayout().currentView;
              	var itemLines = view.model.get('lines').models;


              	//Did customer select mounting because if so we use different custom field on the item
              	//record for height, width, length, freight class and nmfc number
              	 var custbody_mounting_selected = SC.Application('Checkout').getLayout().currentView.model.get('options')["custbody_mounting_selected"] == "on" ? "True" : "False";

              	 console.log("mounting:" + custbody_mounting_selected);
              	 transBodyFldsObj["MOUNTING"] = custbody_mounting_selected;
                

              	var itemInfo = [
                    
                 ]
              	for(var i=0; i<itemLines.length; i++){
              		itemObj = {'itemid': itemLines[i].get('item').get('internalid'), 'quantity': itemLines[i].get('item').get('quantity')};
              		itemInfo.push(itemObj);
              		 
              	}

              	 var itemInfoObj = {};
             itemInfoObj["itemInfo"] = itemInfo;
             itemInfoObj["transInfo"] = transBodyFldsObj;
             itemInfoObj["shipInfo"] = entityObj;

             
              	console.log(JSON.stringify(itemInfoObj));

              	

              	var url = "/app/site/hosting/scriptlet.nl?script=328&deploy=1";
              	jQuery.ajax({
				    type: "POST",
				    url: url,
				    data : JSON.stringify(itemInfoObj),
				    contentType: "application/json; charset=utf-8",
				    dataType: "json",
				    success: function(response) {
				      
				      QUOTE_LIST = response.QUOTE_LIST;
				      console.log(JSON.stringify(QUOTE_LIST));

				      var QuotesHTML = "";

				      if(QUOTE_LIST && QUOTE_LIST.QUOTE.length > 0){

				      	document.getElementById('quoteInfo').value = JSON.stringify(QUOTE_LIST);

				      	for(var i=0; i<QUOTE_LIST.QUOTE.length;i++){

                                     var name = QUOTE_LIST.QUOTE[i].CARRIER_NAME.split("(Freightquote)");       


				      			QuotesHTML += '<input type="radio" name="ltl-delivery-options" class="order-wizard-shipmethod-module-checkbox" value="' + QUOTE_LIST.QUOTE[i].QUOTE_ID+ '" id="delivery-options-2" ship_carrier="' + QUOTE_LIST.QUOTE[i].CARRIER_NAME + '" ship_total="' + QUOTE_LIST.QUOTE[i].TOTAL_AMOUNT + '"  ><span class="order-wizard-shipmethod-module-option-name"><strong>'+ name[0] +'</strong> Transit Days:'+QUOTE_LIST.QUOTE[i].TRANSIT_DAYS
+' ETA:'+QUOTE_LIST.QUOTE[i].ESTIMATED_DELIVERY_DATE
+'<span class="order-wizard-shipmethod-module-option-price">$'+ QUOTE_LIST.QUOTE[i].TOTAL_AMOUNT +'</span></span>  <br><br>'
				      	}

				      	 QuotesHTML += '<div style="align:center"><input type="button" class="address-details-select-address" style="width:225px" onclick="applyLTLQuote();" name="btnApplyLTLTShipping" value="Apply Selected Quote"></div>' ;
				      }else{
				      	QuotesHTML = "<p> There are no quotes returned. Please try after sometime.</p>";
				      }

				      jQuery('#divLTLQuotes').html(QuotesHTML)



				    }
				  });
              	jQuery('#divLTLQuotes').show();
              	


  

              }
              </script>
             </form>

             	<div id="divLTLQuotes" style="display:none">

                </div>

                       </div>

                      </div>
                    </div>
                  </div>
                </div>
                <!-- /.modal-content --> 
              </div>
            </div>
          <!-- End LTL QUOTES FROM SERVICE Modal popup-->
			{{else}}
				<div class="order-wizard-shipmethod-module-message">
					{{translate 'Warning: No Delivery Methods are available for this address'}}
				</div>
			{{/if}}
		{{/if}}
	{{/if}}
</div>
