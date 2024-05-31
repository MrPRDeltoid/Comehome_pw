import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';


export class SearchPage extends BasePage {
    readonly page: Page;
    // Main sections
    readonly searchBar: Locator;
    readonly mapSection: Locator;
    readonly cardSection: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        // Main sections
        this.searchBar = page.locator('[data-hc-name="toolbar"]');
        this.mapSection = page.locator('[data-hc-name="map-section"]');
        this.cardSection = page.locator('[data-hc-name="property-card-section"]');
    }

    // Methods
    async gotoSearchPage() {
        await this.page.goto('/search');
    }
}
