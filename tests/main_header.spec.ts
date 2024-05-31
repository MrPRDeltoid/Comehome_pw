import { test, expect } from '@playwright/test';
import playwrightConfig from '../playwright.config';
import { HomePage } from '../pages/homePage';
import { MainHeader } from '../pages/basePage';
import { SearchPage } from '../pages/searchPage';
import { HomeownerPage } from '../pages/homeownerPage';
import { WatchlistPage } from '../pages/watchlistPage';
import { AlertsPage } from '../pages/alertsPage';
import { AgentPage } from '../pages/agentPage';


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
    const search_page = new SearchPage(page);

    await main_header.buyHomeButton.click();
    await expect(page).toHaveURL(`${playwrightConfig.use?.baseURL}search`);
    await expect(page).toHaveTitle("Real estate and homes for sale | ComeHome");
    await expect(search_page.mainHeader).toHaveScreenshot('search+page_mainHeader.png', { maxDiffPixelRatio: 0.05 });
    await expect(search_page.searchBar).toHaveScreenshot('search+page_searchBar.png');
    await expect(search_page.mapSection).toBeVisible();
    await expect(search_page.cardSection).toBeVisible();
    await expect(search_page.footerSection).toHaveScreenshot('search+page_footerSection.png');
  });


  test('Can click My home to show correct page', async ({ page }) => {
    const main_header = new MainHeader(page);
    const homeowner_page = new HomeownerPage(page);

    await main_header.myHomeButton.click();
    await expect(page).toHaveURL(`${playwrightConfig.use?.baseURL}homeowner`);
    await expect(page).toHaveTitle("My Home | ComeHome");
    await expect(homeowner_page.mainHeader).toHaveScreenshot('homeowner+page_mainHeader.png');
    await expect(homeowner_page.header).toHaveText("Access your home value and market insights for free");
    await expect(homeowner_page.searchField).toHaveAttribute('placeholder', "Enter your home address");
    await expect(homeowner_page.loginRow).toHaveText("Claimed your home already?\nLog in");
    await expect(homeowner_page.bottomText).toHaveText("Claim your home to access tools to…");
    await expect(homeowner_page.infoCard).toHaveScreenshot('homeowner+page_infoCard.png');
    await expect(homeowner_page.footerSection).toHaveScreenshot('homeowner+page_footerSection.png');
  });

  test('Can click Saved to show correct page', async ({ page }) => {
    const main_header = new MainHeader(page);
    const watchlist_page = new WatchlistPage(page)

    await main_header.savedButton.click();
    await expect(page).toHaveURL(`${playwrightConfig.use?.baseURL}watchlist`);
    await expect(page).toHaveTitle("Saved Homes | ComeHome");
    await expect(watchlist_page.mainHeader).toHaveScreenshot('watchlist+page_mainHeader.png');
    // TODO: Commented lines are not filtering to the sub element
    //await expect(watchlist_page.savedHomesButton.filter({ has: watchlist_page.buttonHeader })).toHaveText("Saved homes");
    //await expect(watchlist_page.savedHomesButton.filter({ has: watchlist_page.buttonDescription })).toHaveText("Homes that you have liked and want to follow.");
    //await expect(watchlist_page.savedHomesButton.filter({ has: watchlist_page.buttonHighlight })).toHaveAttribute('style');
    //await expect(watchlist_page.savedSearchesButton.filter({ has: watchlist_page.buttonHeader })).toHaveText("Saved searches");
    //await expect(watchlist_page.savedSearchesButton.filter({ has: watchlist_page.buttonDescription })).toHaveText("Future homes that come onto the market based on your search and filter criteria.");
    //await expect(watchlist_page.savedSearchesButton.filter({ has: watchlist_page.buttonHighlight })).not.toHaveAttribute('style');
    await expect(watchlist_page.savedIcon).toHaveScreenshot('watchlist+page_savedIcon.png');
    await expect(watchlist_page.loggedOutSection.getByRole('heading')).toHaveText("Saved homes");
    await expect(watchlist_page.subheader).toHaveText("We'll alert you to changes when there's news about a saved property");
    await expect(watchlist_page.signupButton).toHaveText("Sign Up");
    await expect(watchlist_page.loginButton).toHaveText("Login");
    await expect(watchlist_page.footerSection).toHaveScreenshot('watchlist+page_footerSection.png');
  });

  test('Can click Alerts to show correct page', async ({ page }) => {
    const main_header = new MainHeader(page);
    const alerts_page = new AlertsPage(page);

    await main_header.alertsButton.click();
    await expect(page).toHaveURL(`${playwrightConfig.use?.baseURL}alerts`);
    await expect(page).toHaveTitle("Alerts | ComeHome");
    await expect(alerts_page.mainHeader).toHaveScreenshot('alerts+page_mainHeader.png');
    await expect(alerts_page.header).toHaveText("Alerts");
    await expect(alerts_page.subheader).toHaveText("Find out what's new with your saved homes");
    await expect(alerts_page.colorBar).toHaveAttribute('style');
    await expect(alerts_page.manageLink).toHaveText("Manage Alerts");
    await expect(alerts_page.alertsIcon).toHaveScreenshot('alerts+page_alertsIcon.png');
    await expect(alerts_page.loggedOutSection.getByRole('heading')).toHaveText("Activate Alerts");
    await expect(alerts_page.loggedOutSubheader).toHaveText("We'll alert you to changes when there's news about a saved property");
    await expect(alerts_page.signupButton).toHaveText("Sign Up");
    await expect(alerts_page.loginButton).toHaveText("Login");
    await expect(alerts_page.footerSection).toHaveScreenshot('alerts+page_footerSection.png');
  });

  test('Can click Find an agent to show correct page', async ({ page }) => {
    const main_header = new MainHeader(page);
    const agent_page = new AgentPage(page);

    await main_header.findAnAgentButton.click();
    await expect(page).toHaveURL(`${playwrightConfig.use?.baseURL}concierge-team`);
    await expect(page).toHaveTitle("Home | ComeHome");  // TODO: BUG - The title is not updated, shows title from previous loaded page
    await expect(agent_page.mainHeader).toHaveScreenshot('agent+page_mainHeader.png');
    await expect(agent_page.header).toHaveText("ComeHome Concierge Team");
    await expect(agent_page.subheader).toHaveText("Connected to thousands of the top real estate agents nationwide.");
    await expect(agent_page.connectAgentButton).toHaveText("Connect with an agent");
    await expect(agent_page.connectAgentButton).toBeEnabled;
    await expect(agent_page.headshotsImage).toHaveScreenshot('agent+page_headshotsImage.png');
    const descriptions_exp = ['Full real estate agent support for buying and selling', 
                              'Guidance throughout the homeownership journey', 
                              'Assistance with contracts & negotiations'];
    const descriptions = agent_page.descriptionText
    for (let idx=0; idx < await descriptions.count(); idx++){
      await expect(descriptions.nth(idx)).toHaveText(descriptions_exp[idx])
    }
    await expect(agent_page.descriptionText).toHaveText(descriptions_exp);
    await expect(agent_page.secondaryHeader).toHaveText("Buying, selling or both? Get paired with a top local expert.");
    await expect(agent_page.secondarySubheader).toHaveText("With our experience and your individual needs, we’ll help connect you with the right agent to guide you through your transaction.");
    await expect(agent_page.getStartedButton).toHaveText("Get started");
    await expect(agent_page.getStartedButton).toBeEnabled;
    await expect(agent_page.secondaryImage).toHaveScreenshot('agent+page_secondaryImage.png');
    await expect(agent_page.footerSection).toHaveScreenshot('agent+page_footerSection.png');
  }); 
});
