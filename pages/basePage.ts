import { expect, type Locator, type Page } from '@playwright/test';


export class BasePage {
    // Common elements and methods across the app
    readonly mainHeader: Locator;
    readonly footerSection: Locator;

    constructor(page: Page) {
        this.mainHeader = page.locator('[data-hc-name="top-section"]');
        this.footerSection = page.locator('[data-hc-name="footer-section"]');
    }
}

export class MainHeader extends BasePage {
    // Main header elements
    readonly logo: Locator;
    readonly buyHomeButton: Locator;
    readonly myHomeButton: Locator;
    readonly savedButton: Locator;
    readonly alertsButton: Locator;
    readonly findAnAgentButton: Locator;
    readonly joinLoginLink: Locator;
    readonly joinLoginDialog: Locator;

    constructor(page: Page) {
        super(page);
        this.logo = this.mainHeader.locator('[data-hc-name="comehome-logo"]');
        this.buyHomeButton = this.mainHeader.locator('[data-hc-name="buy-home-button"]');
        this.myHomeButton = this.mainHeader.locator('[data-hc-name="my-home-button"]');
        this.savedButton = this.mainHeader.locator('[data-hc-name="saved-button"]');
        this.alertsButton = this.mainHeader.locator('[data-hc-name="alerts-button"]');
        this.findAnAgentButton = this.mainHeader.locator('[data-hc-name="find-an-agent-button"]');
        this.joinLoginLink = this.mainHeader.getByLabel('Join or log in')
        this.joinLoginDialog = page.locator('[class$="SlideInModal__ModalWithCloseIcon"]');
    }

    // Methods
    async showJoinLoginDialog() {
        await this.joinLoginLink.click();
        await expect(this.joinLoginDialog).toBeVisible();
    }
}

export class JoinLoginDialog extends MainHeader {
    readonly page: Page;
    readonly header: Locator;
    readonly closeButton: Locator;
    readonly title: Locator;
    readonly subTitle: Locator;
    readonly loginRow: Locator;
    readonly loginLink: Locator;
    readonly signupRow: Locator;
    readonly signupLink: Locator;
    readonly firstnameField: Locator;
    readonly lastnameField: Locator;
    readonly emailField: Locator;
    readonly phoneField: Locator;
    readonly passwordField: Locator;
    readonly confirmRow: Locator;
    readonly signupButton: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.header = this.joinLoginDialog.locator('[data-hc-name="modal-header"]');
        this.closeButton = this.joinLoginDialog.locator('[data-hc-name="close-dialog-button"]');
        this.title = this.joinLoginDialog.locator('[class="AuthModal__Title"]');
        this.subTitle = this.joinLoginDialog.locator('[class="AuthModal__Subtitle"]');
        this.loginRow = this.joinLoginDialog.locator('[data-hc-name="log-in-row"]');
        this.loginLink = this.joinLoginDialog.locator('[data-event-name="click_login_cta"]');
        this.signupRow = this.joinLoginDialog.locator('[data-hc-name="sign-up-row"]');
        this.signupLink = this.joinLoginDialog.locator('[data-event-name="click_signup_cta"]');
        this.firstnameField = this.joinLoginDialog.getByLabel('first name');
        this.lastnameField = this.joinLoginDialog.getByLabel('last name');
        this.emailField = this.joinLoginDialog.getByLabel('email');
        this.phoneField = this.joinLoginDialog.getByLabel('phone');
        this.passwordField = this.joinLoginDialog.locator('[name="password"]');
        this.confirmRow = this.joinLoginDialog.locator('[data-hc-name="confirm-row"]');
        this.signupButton = this.joinLoginDialog.locator('[data-hc-name="signup-button"]');
        this.loginButton = this.joinLoginDialog.getByLabel('log in', { exact: true });
    }
    // Methods
    async closeDialog() {
        await this.closeButton.click();
    }
}
