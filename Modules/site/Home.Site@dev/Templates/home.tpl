{{!
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}
<section class="home-section">
	<div class="home-nopad">
		<!-- CAROUSEL -->
		{{#if showCarousel}}
		<div class="home-slider-container">
			<div class="home-image-slider">
				<ul data-slider class="home-image-slider-list">
					{{#each carousel}}
						<li>
							<div class="home-slide-main-container">
								<img src="{{../url}}{{image}}" class="home-slide-image" alt="{{title}}" />
								<!--<div style="background-image: url('{{../url}}{{image}}');"></div>-->
								<div class="home-slide-caption">
									{{#if title}}<h2 class="home-slide-caption-title">{{title}}</h2>{{/if}}
									{{#if text}}<p>{{text}}</p>{{/if}}
									<div class="home-slide-caption-button-container">
										<a{{objectToAtrributes item}} class="home-slide-caption-button-greyscale">{{#if text}}{{linktext}}{{else}}{{translate 'Shop now'}}{{/if}} <i class="home-slide-button-icon"></i></a>
									</div>
								</div>
							</div>
						</li>
					{{/each}}
				</ul>
			</div>
		</div>
		{{/if}}
	</div>
</section>
<section class="home-section">
	<div class="home-nopad">
		<div class="home-cms-zone" data-cms-area="home_content_top" data-cms-area-filters="path"></div>

		<!--
		INFOBLOCKS
		Two infoblocks per row
		-->
		<div class="home-infoblock-layout">
			{{#each infoblock}}
			<a{{objectToAtrributes item}} class="home-infoblock-link home-infoblock-link-hover-handler">
				<div class="home-infoblock home-infoblock-tinter"
		        style="background-image: url({{../url}}{{image}});{{#if color}}background-color:{{color}}{{else}}darkgray{{/if}};">
					<div class="home-infoblock-content">
			            {{#if title}}<h2 class="home-infoblock-title home-infoblock-text-transform">{{title}}</h2>{{/if}}
			            {{#if text}}<h3 class="home-infoblock-text home-infoblock-text-transform">{{text}}</h3>{{/if}}
			        </div>
				</div>
			</a>
			{{/each}}
		</div>

        
		<!-- CMS MERCHANDISING ZONE -->
		<div class="home-merchandizing-zone">
			<div class="home-merchandizing-zone-content">
				<div data-cms-area="home_merchandizing_zone" data-cms-area-filters="path"></div>
			</div>
		</div>

	</div>
</section>
<section class="home-section">
	<div class="home-nopad">
<!--Instead of CMS we will opt to use backend configuration-->
			<!-- <div class="home-cms-zone" data-cms-area="home_content_middle" data-cms-area-filters="path"></div> -->
		<div class="home-middle-content-wrapper">
			<div class="home-middle-content">
				<div class="home-middle-content-title">
					{{middleTitle}}
				</div>
				<div class="home-middle-content-text-container">
					<p class="home-middle-content-text">
						{{middleContentText}}

						<a class="home-middle-content-link" href="{{buttonLink}}">{{buttonText}}</a>
					</p>
				</div>
				<div class="home-middle-content-banner-image-container">
					<img src="{{middleBannerImg}}" class="home-middle-content-banner-image"/>
				</div>
			</div>
		</div>
	</div>
</section>
<section class="home-section">
	<div class="home">
		<!-- FREE TEXT AND IMAGES -->
		<div class="home-page-freetext-wrapper">
			<div class="home-page-freetext-no-box">
			    <div class="home-page-freetext-content home-page-freetext-flex">
					{{#if showFreeTextImages}}
			        <div class="home-page-freetext-content-images-wrapper home-page-freetext-content-image-flex">
						{{#each freeTextImages}}
		                <div class="home-page-freetext-content-image"><a{{objectToAtrributes item}}><img src="{{../url}}{{image}}"></a></div>
						{{/each}}
			        </div>
			        {{/if}}
			        <div class="home-page-freetext-content-text home-page-freetext-content-text-flex">
						<div class="home-page-freetext-content-text-wrapper">
							{{#if freeTextTitle}}
							<div class="home-page-freetext-content-header">
						        <h3>{{freeTextTitle}}</h3>
						    </div>
						    {{/if}}
				        	<div data-view="FreeText"></div>
						</div>
			        </div>
			    </div>
			</div>
		</div>

	    <div class="home-cms-zone" data-cms-area="home_content_bottom" data-cms-area-filters="path"></div>
	</div>
</section>
