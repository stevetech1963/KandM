{{!
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}

<div class="product-list-details-later">
	<button class="product-list-details-later-button-saveforlater-pusher" data-type="sc-pusher" data-target="cart-save-for-later">
		{{translate 'Saved for Later'}} <i></i>
	</button>
	<div class="product-list-details-later-row" data-action="pushable" data-id="cart-save-for-later">
		<div class="product-list-details-later-col">
			<h3 class="product-list-details-later-list-header-title">
				{{#if isLaterOrPredefined}}{{translate name}}{{else}}{{name}}{{/if}}
				<small class="product-list-details-later-shopping-cart-title-details-count">
					{{#if isEmpty}}
						{{translate 'No products yet'}}
					{{else}}
						{{#if hasOneItem}}
							{{translate '$(0) Product' itemsLength}}
						{{else}}
							{{#if hasMoreThanOneItem}}
								{{translate '$(0) Products' itemsLength}}
							{{/if}}
						{{/if}}
					{{/if}}
				</small>
			</h3>

			<div data-confirm-message class="product-list-details-later-confirm-message"></div>

			{{#if hasItems}}
				<div class="product-list-details-later-explanation">
					{{translate 'To buy an item now, click "Move to Cart"'}}
				</div>
			{{/if}}

			{{#if hasItems}}
				<div class="product-list-details-later-list-items" data-type="product-list-items">
					<table class="cart-detailed-item-view-cell-actionable-table cart-detailed-table-row-with-border">
						<tbody data-view="ProductList.DetailsLater.Collection"></tbody>
					</table>
				</div>
			{{else}}
				<div class="product-list-details-later-header-no-items">
					{{translate 'You don\'t have items in this list yet.'}}
				</div>
			{{/if}}
		</div>
	</div>
</div>
