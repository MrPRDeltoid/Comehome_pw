import { test, expect } from '@playwright/test';
import playwrightConfig from '../playwright.config';
import { HomePage } from '../pages/homePage';
import { PublicView, OwnerView } from '../pages/propertyPage';
import { SearchPage } from '../pages/searchPage';


test.beforeEach('Load Home Page', async ({ page }) => {
  const home_page = new HomePage(page);

  await home_page.gotoHomePage();
});

test.afterAll('Close the browser', async ({ page }) => {
   await page.close();
});

test.describe('The Home Page', () => {
  
  test('Has correct sections', async ({ page }) => {
    const home_page = new HomePage(page);

    await expect(home_page.mainHeader).toHaveScreenshot('home_page_mainHeader.png');
    await expect(home_page.topSection).toHaveScreenshot('home_page_topSection.png');
    await expect(home_page.photoSection).toHaveScreenshot('home_page_photoSection.png');
    await expect(home_page.trackOrBuySection).toHaveScreenshot('home_page_trackOrBuySection.png');
    await expect(home_page.yourTeamAgentSection).toHaveScreenshot('home+page_yourTeamAgentSection.png');
    await expect(home_page.footerSection).toHaveScreenshot('home_page_footerSection.png');
  });

  test('Has correct title and url', async ({ page }) => {

    await expect(page).toHaveURL(`${playwrightConfig.use?.baseURL}`);
    await expect(page).toHaveTitle("Home | ComeHome");
  });
});

test.describe('The Find Home search view', () => {

  test('Has correct elements and text', async ({ page }) => {
    const home_page = new HomePage(page);

    await expect(home_page.header).toHaveText("Find your dream home");
    await expect(home_page.subheader).toHaveText("Search homes in your neighborhood and find a house that's right for you.");
    await expect(home_page.findHomeButton).toHaveText("Find a home");
    await expect(home_page.searchField).toHaveAttribute('placeholder', "Search for a city, ZIP code or address");
    await expect(home_page.searchButton).toBeVisible();
  });

  test('Can search for a property and select to show correct property page', async ({ page }) => {
    const home_page = new HomePage(page);
    const public_view = new PublicView(page);
    const property_data = require('../data/properties.json')['property1'];

    await home_page.searchForProperty(property_data['street']);
    await public_view.breadcrumbsSection.waitFor();
    expect(page.url()).toContain("property-details");
    expect(await page.title()).toContain(property_data['street']);
    // Add assertions on property page
    const breadcrumb_exp = ["Home", `${property_data['city']}, ${property_data['state']}`, property_data['zip'], property_data['street']];
    await expect(public_view.breadcrumbsSection.getByRole('listitem')).toHaveText(breadcrumb_exp);
    // Verify state of view buttons
    await expect(public_view.publicViewButton).toHaveAttribute('data-state', 'active');
    await expect(public_view.ownerViewButton).toHaveAttribute('data-state', 'inactive');
    // Verify property details header
    await expect(public_view.introSectionAddress)
      .toHaveText(`${property_data['street']}., ${property_data['city']}, ${property_data['state']} ${property_data['zip']}`);
    await expect(public_view.introSectionDetails)
      .toHaveText(`${property_data['type']}${property_data['beds']} Beds${property_data['baths']} Baths${property_data['gla']} Sq Ft`);
  });
});

test.describe('The My Home search view', () => {

  test.beforeEach('Switch to My Home value view', async ({ page }) => {
    const home_page = new HomePage(page);
  
    await home_page.trackHomeButton.click();
  });

  test('Has correct elements and text', async ({ page }) => {
    const home_page = new HomePage(page);

    await expect(home_page.header).toHaveText("See your home's full potential");
    await expect(home_page.subheader).toHaveText("Claim your home and unlock features to see your home's value, equity, and more.");
    await expect(home_page.trackHomeButton).toHaveText("My home value");
    await expect(home_page.searchField).toHaveAttribute('placeholder', "Enter your home address");
    await expect(home_page.searchButton).toBeVisible();
  });

  test('Can search for a property and select to show correct property page', async ({ page }) => {
    const home_page = new HomePage(page);
    const owner_view = new OwnerView(page);
    const property_data = require('../data/properties.json')['property1'];

    await home_page.searchForProperty(property_data['street']);
    await owner_view.breadcrumbsSection.waitFor();
    expect(page.url()).toContain("homeowner");
    expect(await page.title()).toContain(property_data['street']);
    // Verify AVM section address and details
    await expect(owner_view.avmSectionAddress).toHaveText(property_data['street']);
    await expect(owner_view.avmSectionDetails).toHaveText(`${property_data['beds']} Bed|${property_data['baths']} Bath|${property_data['gla'].replace(',', '')} Sq Ft.`);
  });
});

test.describe('The Track or Buy Home section', () => {

  test('Shows correct content', async ({ page }) => {
    const home_page = new HomePage(page);

    await expect(home_page.buyHomeTitle).toHaveText("Buying a home");
    await expect(home_page.buyHomeDescription).toHaveText("Search homes for sale and filter by price, neighborhood, school ratings, and more. Find the perfect home that fits your needs.");
    await expect(home_page.searchHomesButton).toHaveText("Search homes");
    await expect(home_page.searchHomesButton).toBeEnabled;
    await expect(home_page.searchHomesButton).toHaveAttribute('href', '/search');
    await expect(home_page.yourHomeTitle).toHaveText("Your homeowner dashboard");
    await expect(home_page.yourHomeDescription).toHaveText("See your home's value, equity, and what a home renovation would do to your value. Claim your home and access these features and more.");
    await expect(home_page.seeMyHomeButton).toHaveText("See my home");
    await expect(home_page.seeMyHomeButton).toBeEnabled;
    await expect(home_page.seeMyHomeButton).toHaveAttribute('href', '/homeowner');
  });

  test('Can click on Search homes button to load correct page', async ({ page }) => {
    const home_page = new HomePage(page);
    const search_page = new SearchPage(page);

    home_page.searchHomesButton.click();
    await search_page.cardSection.waitFor();
    await expect(page).toHaveURL(`${playwrightConfig.use?.baseURL}search`);
    await expect(page).toHaveTitle("Real estate and homes for sale | ComeHome");
  });

  test('Can click on See my home button to load correct page', async ({ page }) => {
    const home_page = new HomePage(page);

    home_page.seeMyHomeButton.click();
    await expect(page).toHaveURL(`${playwrightConfig.use?.baseURL}homeowner`);
    await expect(page).toHaveTitle("My Home | ComeHome");
  });
});

test.describe('The Find an Agent section', () => {

  test('Shows correct content', async ({ page }) => {
    const home_page = new HomePage(page);

    await expect(home_page.findAgentTitle).toHaveText("Need help finding an agent? We'll connect you.");
    await expect(home_page.findAgentDescription).toHaveText("We can help pair you with the right agent for your real estate needs. Let our team help make locating the best agent easy and smooth.");
    await expect(home_page.findAgentButton).toHaveText("Learn More");
    await expect(home_page.findAgentButton).toBeEnabled;
    await expect(home_page.findAgentButton).toHaveAttribute('href', '/concierge-team');
  });

  test('Can click on Learn more button to load correct page', async ({ page }) => {
    const home_page = new HomePage(page);

    home_page.findAgentButton.click();
    await expect(page).toHaveURL(`${playwrightConfig.use?.baseURL}concierge-team`);
    await expect(page).toHaveTitle("Home | ComeHome");  // TODO: BUG - The title is not updated, shows title from previous loaded page
  });
});
