{{!
	© 2016 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
}}
<div class="header">
    <div class="header-navlinks-background"><div></div></div>
    <div class="header-background"{{#if headerbackground}}  style="background-image: url({{headerbackground}})"{{/if}}></div>

    <div class="header-main">
        <div class="header-main-container">
            <div class="nav-header-logo"{{#if logobackground}} style="background-image: url({{logobackground}})"{{/if}} data-view="Header.Logo"></div>
            <div class="header-sidebar-toggle-wrapper">
                <button class="header-sidebar-toggle" data-action="header-sidebar-show">
                    <i class="header-sidebar-toggle-icon"></i>
                </button>
            </div>
            <nav class="header-menu-container">
                <div class="header-navlinks">
                    <div data-view="Header.Menu" data-phone-template="header_sidebar" data-tablet-template="header_sidebar"></div>
                </div>
                <ul class="header-right-menu">
                    <li class="header-menu-storelocator-list-item" data-view="StoreLocatorHeaderLink"></li>
                    <li class="header-menu-profile-list-item">
                        <div class="header-menu-profile" data-view="Header.Profile">
                    </div>
                    </li>
                    <li class="header-menu-requestquote-list-item">
                        <div data-view="RequestQuoteWizardHeaderLink"></div>
                    </li>{{#if showLanguagesOrCurrencies}}<li class="header-subheader-settings"><!-- not pretty markup, but fixes whitespace bug -->
                        <a href="#" class="header-subheader-settings-link" data-toggle="dropdown" title="{{translate 'Settings'}}">
                            <i class="header-menu-settings-icon"></i>
                            <i class="header-menu-settings-carret"></i>
                        </a>
                        <div class="header-menu-settings-dropdown">
                            <h5 class="header-menu-settings-dropdown-title">{{translate 'Site Settings'}}</h5>
                            {{#if showLanguages}}
                                <div data-view="Global.HostSelector"></div>
                            {{/if}}
                            {{#if showCurrencies}}
                                <div data-view="Global.CurrencySelector"></div>
                            {{/if}}
                        </div></li>{{/if}}<li class="header-menu-minicart-list-item"><!-- not pretty markup, but fixes whitespace bug -->
                        <div data-view="Header.MiniCart"></div>
                    </li>
                    <li class="header-menu-search-list-item">
                        <a class="header-menu-search-link" data-action="show-sitesearch" title="{{translate 'Search'}}" href="#">
                            <i class="header-menu-search-icon"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    <div class="header-site-search" data-view="SiteSearch" data-type="SiteSearch"></div>
    <div id="banner-header-bottom" class="content-banner banner-header-bottom" data-cms-area="header_banner_bottom" data-cms-area-filters="global"></div>
    <div class="header-sidebar-overlay" data-action="header-sidebar-hide"></div>
</div>