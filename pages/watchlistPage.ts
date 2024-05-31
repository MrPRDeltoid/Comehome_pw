import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';


export class WatchlistPage extends BasePage {
    readonly page: Page;

    readonly savedHomesButton: Locator;
    readonly savedSearchesButton: Locator;
    readonly buttonHeader: Locator;
    readonly buttonDescription: Locator;
    readonly buttonHighlight: Locator;
    // Elements when not logged in
    readonly loggedOutSection: Locator;
    readonly savedIcon: Locator;
    readonly header: Locator;
    readonly subheader: Locator;
    readonly signupButton: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.savedHomesButton = page.locator('[data-hc-name="saved-homes-button"]');
        this.savedSearchesButton = page.locator('[data-hc-name="saved-searches-button"]');
        this.buttonHeader = page.locator('[data-hc-name="title"]');
        this.buttonDescription = page.locator('[data-hc-name="desc"]');
        this.buttonHighlight = page.locator('[data-hc-name="highlight"]');
        // Elements when not logged in
        this.loggedOutSection = page.locator('[data-hc-name="logged-out-section"]');
        this.savedIcon = page.locator('[data-hc-name="icon"]');
        this.header = page.locator('[data-hc-name="title"]');
        this.subheader = page.locator('.WatchListAlertsLoggedOut__DescriptionSection');
        this.signupButton = page.locator('[data-hc-name="signup-button"]');
        this.loginButton = page.locator('[data-hc-name="login-button"]');
    }

    // Methods
    async gotoHomeownerPage() {
        await this.page.goto('/watchlist');
    }
}
