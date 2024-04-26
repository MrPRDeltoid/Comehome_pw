import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { MainHeader } from '../pages/basePage';
import { FindHomePage } from '../pages/findHomePage';


test.beforeEach('Load Home Page', async ({ page }) => {
  const home_page = new HomePage(page);
  await home_page.gotoHomePage();
});

test.afterAll('Close the browser', async ({ page }) => {
  await page.close();
});

test.describe('The Main Header', () => {
  test('Has correct elements', async ({ page }) => {
    const main_header = new MainHeader(page);
    await expect(main_header.logo).toHaveScreenshot('main_header_logo.png');
    await expect(main_header.buyHomeButton).toHaveText("Find a home");
    await expect(main_header.myHomeButton).toHaveText("My home");
    await expect(main_header.savedButton).toHaveText("Saved");
    await expect(main_header.alertsButton).toHaveText("Alerts");
    await expect(main_header.findAnAgentButton).toHaveText("Find an agent");
    await expect(main_header.joinLoginLink).toHaveText("Join or Log in");
  });
});

test.describe('The Main Header Options', () => {
  test('Can click Find a home to show correct page', async ({ page }) => {
    const main_header = new MainHeader(page);
    const find_home_page = new FindHomePage(page);
    await main_header.buyHomeButton.click();
    await expect(page).toHaveTitle('Real estate and homes for sale | ComeHome')
    await expect(find_home_page.mainHeader).toHaveScreenshot('find_home+page_mainHeader.png');
    await expect(find_home_page.searchBar).toHaveScreenshot('find_home+page_searchBar.png');
    await expect(find_home_page.mapSection).toBeVisible();
    await expect(find_home_page.cardSection).toBeVisible();
  });

/*
  test('Can click My home to show correct page', async ({ page }) => {
    
  });

  test('Can click Saved to show correct page', async ({ page }) => {
    
  });

  test('Can click Alerts to show correct page', async ({ page }) => {
    
  });

  test('Can click Find an agent to show correct page', async ({ page }) => {
    
  }); 

  */
});
