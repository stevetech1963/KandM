<section class="about-container">
    <div class="about-upper-content">
        <div class="about-upper-content-title">
            <div data-cms-area="cms-about-upper-content-title" data-cms-area-filters="path" class="cms-about-upper-content-title">

            </div>

        </div>
        <div class="about-upper-content-subtitle">
            <div data-cms-area="cms-about-upper-content-subtitle" data-cms-area-filters="path" class="cms-about-upper-content-subtitle">

            </div>
        </div>
        <div class="about-upper-content-body">
            <div data-cms-area="cms-about-upper-content-body" data-cms-area-filters="path" class="cms-about-upper-content-body">

            </div>

        </div>
        {{#if showNavigationLinks}}
        <div class="about-upper-content-nav-bar">
            <ul class="about-upper-content-nav-bar-list">
                {{#each navigationLinks}}
                <li>
                    <a href="{{href}}">
                        {{text}}
                    </a>
                </li>
                {{/each}}
            </ul>
        </div>
        {{/if}}
    </div>
    <div class="about-banner">
        {{#if showCarousel}}
        <div class="about-banner-slider-container">
            <div class="about-banner-image-slider">
                <ul data-slider class="about-banner-image-slider-list">
                    {{#each carousel}}
                    <li>
                        <div class="about-banner-slide-main-container">
                            <img src="{{../url}}{{image}}" class="about-banner-slide-image" alt="{{title}}"/>
                            <div class="about-banner-slide-caption">
                                {{#if title}}
                                <h2 class="about-banner-caption-title">{{title}}</h2>
                                {{/if}}
                                {{#if text}}
                                <p>
                                    {{text}}
                                </p>
                                {{/if}}
                            </div>
                        </div>
                    </li>
                    {{/each}}
                </ul>
            </div>
        </div>
        {{/if}}
    </div>
    <div class="about-lower-content">
        <div class="about-lower-content-body">
            <div class="about-lower-content-left">
                <div data-cms-area="cms-about-lower-content-left" data-cms-area-filters="path" class="cms-about-lower-content-left">

                </div>
            </div>
            <div class="about-lower-content-right">
                <div data-cms-area="cms-about-lower-content-right" data-cms-area-filters="path" class="cms-about-lower-content-right">

                </div>
            </div>
        </div>
    </div>
</section>
