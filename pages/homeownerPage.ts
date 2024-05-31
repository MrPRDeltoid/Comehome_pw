import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';


export class HomeownerPage extends BasePage {
    readonly page: Page;

    readonly header: Locator;
    readonly searchField: Locator;
    readonly loginRow: Locator;
    readonly bottomText: Locator;
    readonly infoCard: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.header = page.locator('h1');
        this.searchField = page.locator('[name^="comehome-address-search-"]');
        this.loginRow = page.locator('[data-hc-name="my-home-login"]');
        this.bottomText = page.locator('[class$="__CHOHomePageHeroBottomText"]');
        this.infoCard = page.locator('[class$="__CHOHomePageCard"]');
    }

    // Methods
    async gotoHomeownerPage() {
        await this.page.goto('/homeowner');
    }
}
