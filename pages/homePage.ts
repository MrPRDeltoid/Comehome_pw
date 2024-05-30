import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';


export class HomePage extends BasePage {
    readonly page: Page;
    // Main sections
    readonly topSection: Locator;
    readonly photoSection: Locator;
    readonly trackOrBuySection: Locator;
    readonly yourTeamAgentSection: Locator;
    // Header content
    readonly header: Locator;
    readonly subheader: Locator;
    // Property search
    readonly findHomeButton: Locator;
    readonly trackHomeButton: Locator;
    readonly searchField: Locator;
    readonly searchButton: Locator;
    readonly searchResultItem: Locator;
    // Photo section
    readonly photoColumn: Locator;
    readonly photo: Locator;
    // Track or buy home section
    readonly buyHomeTitle: Locator;
    readonly buyHomeDescription: Locator;
    readonly searchHomesButton: Locator;
    readonly yourHomeTitle: Locator;
    readonly yourHomeDescription: Locator;
    readonly seeMyHomeButton: Locator;
    // Find agent section
    readonly findAgentTitle: Locator;
    readonly findAgentDescription: Locator;
    readonly findAgentButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        // Main sections
        this.topSection = page.locator('[class$="__TopSection"]');
        this.photoSection = page.locator('[class$="__PhotoSection"]');
        this.trackOrBuySection = page.locator('[class$="__HomeSubpageTrackOrBuyHome"]');
        this.yourTeamAgentSection = page.locator('[class$="__HomeSubpageYourTeamAgent"]');
        // Header content
        this.header = page.locator('h1');
        this.subheader = page.locator('[class$="__SubHeader"]');
        // Property search
        this.findHomeButton = page.locator('[data-hc-name="find-a-home"]');
        this.trackHomeButton = page.locator('[data-hc-name="track-my-home"]');
        this.searchField = page.locator('[name^="comehome-address-search-"]')
        this.searchButton = page.locator('button[class$="HomeSubpageSearch__SearchButton"]');
        this.searchResultItem = page.locator('[data-hc-name="header-search-results-address-list-item"]')
        // Photo section
        this.photoColumn = page.locator('class$="__PhotoColumn"]');
        this.photo = page.locator('[class$="__PhotoColumnPhoto"]');
        // Track or buy home section
        this.buyHomeTitle = page.locator('[data-hc-name="buy-home-modal-header"]');
        this.buyHomeDescription = page.locator('[data-hc-name="buy-home-modal-description"]');
        this.searchHomesButton = page.locator('[data-hc-name="buy-home-modal-button"]');
        this.yourHomeTitle = page.locator('[data-hc-name="your-home-dash-modal-header"]');
        this.yourHomeDescription = page.locator('[data-hc-name="your-home-dash-modal-description"]');
        this.seeMyHomeButton = page.locator('[data-hc-name="your-home-dash-modal-button"]');
        // Find agent section
        this.findAgentTitle = page.locator('.HomeSubpageYourTeamAgent__CardHeader');
        this.findAgentDescription = page.locator('.HomeSubpageYourTeamAgent__CardDescription');
        this.findAgentButton = page.locator('[data-hc-name="find-an-agent-cta"]');
    }

    // Methods
    async gotoHomePage() {
        await this.page.goto('/');
    }

    async searchForProperty(property: string) {
        await this.searchField.fill(property);
        await this.searchButton.click();
    }
}
