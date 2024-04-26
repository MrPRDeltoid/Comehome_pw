import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { PublicView } from '../pages/propertyPage';


test.beforeEach('Load Home Page', async ({ page }) => {
  const home_page = new HomePage(page);
  await home_page.gotoHomePage();
});

test.afterAll('Close the browser', async ({ page }) => {
   await page.close();
});

test.describe("The Home Page", () => {
  test("Has correct sections", async ({ page }) => {
    const home_page = new HomePage(page);
    await expect(home_page.mainHeader).toHaveScreenshot('home_page_mainHeader.png');
    await expect(home_page.topSection).toHaveScreenshot('home_page_topSection.png');
    await expect(home_page.photoSection).toHaveScreenshot('home_page_photoSection.png');
    await expect(home_page.trackOrBuySection).toHaveScreenshot('home_page_trackOrBuySection.png');
    await expect(home_page.yourTeamAgentSection).toHaveScreenshot('home+page_yourTeamAgentSection.png');
    await expect(home_page.footerSection).toHaveScreenshot('home_page_footerSection.png');
  });

  test('Has correct title, header and subheader', async ({ page }) => {
    const home_page = new HomePage(page);
    await expect(page).toHaveTitle("Home | ComeHome");
    await expect(home_page.header).toHaveText("Find your dream home");
    await expect(home_page.subheader).toHaveText("Search homes in your neighborhood and find a house that's right for you.");
  });

  test('Can search for a property and select to show correct property page', async ({ page }) => {
    const home_page = new HomePage(page);
    const public_view = new PublicView(page);
    const property_data = require('../data/properties.json')['property1'];
    await home_page.searchForProperty(property_data['street_address']);
    // Add assertions on property page
    const breadcrumb_exp = ["Home", `${property_data['city']}, ${property_data['state']}`, property_data['zip'], property_data['street_address']];
    await expect(public_view.breadcrumbsSection.getByRole('listitem')).toHaveText(breadcrumb_exp);
    // Verify state of view buttons
    await expect(public_view.publicViewButton).toHaveAttribute('data-state', 'active');
    await expect(public_view.ownerViewButton).toHaveAttribute('data-state', 'inactive');
    // Verify property details header
    await expect(public_view.introSectionAddress).toHaveText(`${property_data['street_address']}., ${property_data['city']}, ${property_data['state']} ${property_data['zip']}`);
    await expect(public_view.introSectionDetails).toHaveText(`${property_data['property_type']}${property_data['beds']} Beds${property_data['baths']} Baths${property_data['gla']} Sq Ft`);
  });

  test('Shows correct content in track or buy home section', async ({ page }) => {
    const home_page = new HomePage(page);
    await expect(home_page.buyHomeTitle).toHaveText("Buying a home");
    await expect(home_page.buyHomeDescription).toHaveText("Search homes for sale and filter by price, neighborhood, school ratings, and more. Find the perfect home that fits your needs.");
    await expect(home_page.searchHomesButton).toHaveText("Search homes");
    await expect(home_page.searchHomesButton).toHaveAttribute('href', '/search');
    await expect(home_page.yourHomeTitle).toHaveText("Your homeowner dashboard");
    await expect(home_page.yourHomeDescription).toHaveText("See your home's value, equity, and what a home renovation would do to your value. Claim your home and access these features and more.");
    await expect(home_page.seeMyHomeButton).toHaveText("See my home");
    await expect(home_page.seeMyHomeButton).toHaveAttribute('href', '/homeowner');
  });

  test('Shows correct content in the find an agent section', async ({ page }) => {
    const home_page = new HomePage(page);
    await expect(home_page.findAgentTitle).toHaveText("Need help finding an agent? We'll connect you.");
    await expect(home_page.findAgentDescription).toHaveText("We can help pair you with the right agent for your real estate needs. Let our team help make locating the best agent easy and smooth.");
    await expect(home_page.findAgentButton).toHaveText("Learn More");
    await expect(home_page.findAgentButton).toHaveAttribute('href', '/concierge-team');
  });
});
