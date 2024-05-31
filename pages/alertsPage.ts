import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';


export class AlertsPage extends BasePage {
    readonly page: Page;

    readonly header: Locator;
    readonly subheader: Locator;
    readonly colorBar: Locator;
    readonly manageLink: Locator;
    // Elements when not logged in
    readonly loggedOutSection: Locator;
    readonly alertsIcon: Locator;
    readonly loggedOutHeader: Locator;
    readonly loggedOutSubheader: Locator;
    readonly signupButton: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.header = page.locator('.AlertsHeader__AlertTitle');
        this.subheader = page.locator('.AlertsHeader__AlertSubTitle');
        this.colorBar = page.locator('.AlertsHeader__AlertsBottomColorBar');
        this.manageLink = page.locator('.ManageAlertsLink__AlertsLink');
        // Elements when not logged in
        this.loggedOutSection = page.locator('[data-hc-name="logged-out-section"]');
        this.alertsIcon = page.locator('[data-hc-name="icon"]');
        this.loggedOutHeader = page.locator('[data-hc-name="title"]');
        this.loggedOutSubheader = page.locator('.WatchListAlertsLoggedOut__DescriptionSection');
        this.signupButton = page.locator('[data-hc-name="signup-button"]');
        this.loginButton = page.locator('[data-hc-name="login-button"]');
    }

    // Methods
    async gotoAlertsPage() {
        await this.page.goto('/alerts');
    }
}
