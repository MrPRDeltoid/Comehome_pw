import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';


export class PropertyPage extends BasePage {
    // Elements common to both public and owner views
    readonly page: Page;
    readonly breadcrumbsSection: Locator;
    readonly breadcrumbs: Locator;
    readonly publicViewButton: Locator;
    readonly ownerViewButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.breadcrumbsSection = page.locator('[data-hc-name="breadcrumbs"]');
        this.publicViewButton = page.locator('[data-hc-name="public-view-button"]');
        this.ownerViewButton = page.locator('[data-hc-name="owner-view-button"]');
    }

    // Methods

}

export class PublicView extends PropertyPage {
    // Elements and methods specific to public view
    readonly photoSection: Locator;
    readonly introSection: Locator;
    readonly introSectionAddress: Locator;
    readonly introSectionDetails: Locator;
    readonly propertyDetailsSection: Locator;
    readonly summaryOptionsPanel: Locator;
    readonly upsellSection: Locator;
    readonly mapViewSection: Locator;

    constructor(page: Page) {
        super(page);
        this.photoSection = page.locator('[data-hc-name="carousel-section"]');
        this.introSection = page.locator('[data-hc-name="property-intro-section"]');
        this.introSectionAddress = page.locator('.PropertyIntro__Address');
        this.introSectionDetails = page.locator('[data-hc-name="property-info"]');
        this.propertyDetailsSection = page.locator('[class$="__AdditionalHomeDetails"]');
        this.summaryOptionsPanel = page.locator('[data-hc-name="summary-options-panel"]');
        this.upsellSection = page.locator('[data-hc-name="upsell-section"]');
        this.mapViewSection = page.locator('section[class^="MapPropertyPage__MapPropertyPage"]');
    }

    // Methods

}

export class OwnerView extends PropertyPage {
    // Elements and methods specific to owner view
    readonly avmSection: Locator;
    readonly brokerageSection: Locator;
    readonly yourHomeSection: Locator;
    readonly yourNeighborhoodSection: Locator;
    readonly toolsAndInsightsSection: Locator;

    constructor(page: Page) {
        super(page);
        this.avmSection = page.locator('[data-hc-name="avm-section"]');
        this.brokerageSection = page.locator('class$="__BrokerageAttribution"]');
        this.yourHomeSection = page.locator('[data-hc-name="ho-dashboard-section-your_home"]');
        this.yourNeighborhoodSection = page.locator('[data-hc-name="ho-dashboard-section-your_neighborhood"]');
        this.toolsAndInsightsSection = page.locator('[data-hc-name="ho-dashboard-section-tools_and_insights"]');
    }

    // Methods

}
