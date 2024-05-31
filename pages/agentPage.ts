import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';


export class AgentPage extends BasePage {
    readonly page: Page;

    readonly header: Locator;
    readonly subheader: Locator;
    readonly connectAgentButton: Locator;
    readonly descriptionText: Locator;
    readonly headshotsImage: Locator;
    readonly secondaryHeader: Locator;
    readonly secondarySubheader: Locator;
    readonly getStartedButton: Locator;
    readonly secondaryImage: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;

        this.header = page.locator('[data-hc-name="top-module-header-text"]');
        this.subheader = page.locator('[data-hc-name="top-module-sub-header-text"]');
        this.connectAgentButton = page.locator('[data-hc-name="connect-with-an-agent-cta"]');
        this.descriptionText = page.locator('[data-hc-name="description-section"]');
        this.headshotsImage = page.locator('[data-hc-name="concierge-team-headshots"]');
        this.secondaryHeader = page.locator('[data-hc-name="sub-module-header-text"]');
        this.secondarySubheader = page.locator('[data-hc-name="sub-module-sub-header-text"]');
        this.getStartedButton = page.locator('[data-hc-name="get-started"]');
        this.secondaryImage = page.locator('.ConciergeTeamPage__SubModuleImage');
    }

    // Methods
    async gotoAlertsPage() {
        await this.page.goto('/alerts');
    }
}
