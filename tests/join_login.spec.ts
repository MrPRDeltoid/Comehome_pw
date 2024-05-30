import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { JoinLoginDialog, MainHeader } from '../pages/basePage';


test.beforeEach('Launch signup/login dialog', async ({ page }) => {
  const home_page = new HomePage(page);
  const main_header = new MainHeader(page);

  await home_page.gotoHomePage();
  await main_header.showJoinLoginDialog();
});

test.afterAll('Close the browser', async ({ page }) => {
  await page.close();
});

test.describe("The signup/login dialog", () => {  // TODO:Add forgot password link
  test.afterEach('Close dialog', async ({ page }) => {
    const main_header = new MainHeader(page);
    const join_login_dialog = new JoinLoginDialog(page);

    join_login_dialog.closeDialog();
    await expect(main_header.joinLoginDialog).toBeHidden();
  });

  test('Has correct contents and elements on signup form', async ({ page }) => {
    const join_login_dialog = new JoinLoginDialog(page);

    await expect(join_login_dialog.title).toHaveText("Welcome");
    await expect(join_login_dialog.subTitle).toHaveText("Please sign up for a ComeHome account.");
    await expect(join_login_dialog.loginRow).toHaveText("Already have an account?\nLog in");
    await expect(join_login_dialog.firstnameField).toBeVisible();
    await expect(join_login_dialog.lastnameField).toBeVisible();
    await expect(join_login_dialog.emailField).toBeVisible();
    await expect(join_login_dialog.phoneField).toBeVisible();
    await expect(join_login_dialog.passwordField).toBeVisible();
    await expect(join_login_dialog.confirmRow).toHaveText("Terms of Service AgreementBy registering, I agree to ComeHome\nTerms of Use\nand\nPrivacy Policy");
    await expect(join_login_dialog.signupButton).toHaveText("Sign Up");
  });

  test('Has correct contents and elements on login form', async ({ page }) => {
    const join_login_dialog = new JoinLoginDialog(page);
    
    // Click the Login link
    await join_login_dialog.loginLink.click();
    await expect(join_login_dialog.title).toHaveText("Welcome");
    await expect(join_login_dialog.subTitle).toHaveText("Please log in to your account");
    await expect(join_login_dialog.signupRow).toHaveText("Don't have an account?\nSign up");
    await expect(join_login_dialog.firstnameField).toBeHidden();
    await expect(join_login_dialog.lastnameField).toBeHidden();
    await expect(join_login_dialog.emailField).toBeVisible();
    await expect(join_login_dialog.phoneField).toBeHidden();
    await expect(join_login_dialog.passwordField).toBeVisible();
    await expect(join_login_dialog.confirmRow).toBeHidden();
    await expect(join_login_dialog.loginButton).toHaveText("Log In");
  });
});
