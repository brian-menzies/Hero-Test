import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../custom-world';
import { HeroesPage } from '../heroes-page';
import { CommonPage } from '../common-page';
import { DashboardPage } from '../dashboard-page';
import { expect } from '@playwright/test';

let commonPage: CommonPage;
let dashboardPage: DashboardPage;
let heroesPage: HeroesPage;

Given('I am in the hero page', async function(this: CustomWorld) {
    const { page }: CustomWorld = this;
    await page?.goto('http://localhost:4200/dashboard');

    expect(true).toBeTruthy();
})


// TODO: Your step definitions here

When('I Add a New Hero {string}', function (heroName: string) {
    // Variable Declarations
    const { page }: CustomWorld = this;
    commonPage = new CommonPage(page!);

    // Ensure on Heroes Page
    heroesPage = new HeroesPage(page!);
    
    expect(heroesPage.myHeroesText).toBeVisible();
    expect(heroesPage.newHeroInputField).toBeVisible();
    expect(heroesPage.addHeroButton).toBeVisible();
    
    // Click the Add Hero Field, Enter in Name, 
    //  and Click Add Hero Button
    heroesPage.newHeroInputField.fill(heroName);
    heroesPage.addHeroButton.click();
});

When('The Hero {string} should Appear in the Hero List', async function(heroName: string) {
    // Variable Declarations
    const { page }: CustomWorld = this;
    commonPage = new CommonPage(page!);

    // Ensure on Heroes Page
    heroesPage = new HeroesPage(page!);
    
    expect(heroesPage.myHeroesText).toBeVisible();
    expect(heroesPage.heroesListContainer).toBeVisible();

    // Ensure Hero Name is Present in the List of Heroes
    // console.log(`heroName Value is: [${heroName}]`);
    // console.log("Logging Heroes");
    // console.log("==============");
    let heroItems = heroesPage.heroesListContainer.locator('li');

    // console.log("heroItems are Present / Visible");
    // console.log("Found heroItems");
    await heroItems.nth(10).waitFor(); 

    let liItemCounter = await heroItems.count();    

    // console.log(`liItemCounter Value is: [${liItemCounter}]`);
    let heroPresent = false;

    for (let i = 0; i < liItemCounter; i++) {
        let currentHero = await heroItems.nth(i);
        let currentHeroName = await currentHero.textContent();
        // console.log(`nth textContent is: [${currentHeroName}]`);
        // console.log(`heroName Value is: [${heroName}]`);
        if(currentHeroName!.includes(heroName))
        {
            // console.log("currentHeroName includes heroName");
            heroPresent = true;
            break;
        }
    }

    expect(heroPresent === true, "Hero Name didn't appear to be Present in the List of Heroes");
});

When('I Navigate to the Heroes Page', function () {
    // Variable Declarations
    const { page }: CustomWorld = this;
    commonPage = new CommonPage(page!);

    // Click the Heroes Link
    commonPage.heroesNavButton?.click();

    // Ensure on Heroes Page
    heroesPage = new HeroesPage(page!);
    
    expect(heroesPage.myHeroesText).toBeVisible();
    expect(heroesPage.newHeroInputField).toBeVisible();
    expect(heroesPage.addHeroButton).toBeVisible();
});

When('I search for Hero {string}', function (heroName: string) {
    // Variable Declarations
    const { page }: CustomWorld = this;
    commonPage = new CommonPage(page!);

    // Ensure on Dashboard Page
    dashboardPage = new DashboardPage(page!);
    
    expect(dashboardPage.topHeroesText).toBeVisible();
    expect(dashboardPage.heroSearchContainer).toBeVisible();
    expect(dashboardPage.heroSearchBar).toBeVisible();
    
    // Click the Hero Search Bar and Enter in Hero Name
    dashboardPage.heroSearchBar.fill(heroName);
});

Then('The Hero {string} should Appear in the Search Results List', async function (heroName: string) {
    // Variable Declarations
    const { page }: CustomWorld = this;
    commonPage = new CommonPage(page!);

    // Ensure on Dashboard Page
    dashboardPage = new DashboardPage(page!);
    
    expect(dashboardPage.heroSearchContainer).toBeVisible();
    expect(dashboardPage.heroSearchBar).toBeVisible();
    
    // Ensure Hero Search Results are Present
    expect(dashboardPage.heroSearchResultsContainer).toBeVisible();

    // Ensure Hero Name is Present in Search Resuilts List
    // console.log(`heroName Value is: [${heroName}]`);
    // console.log("Logging Hero Search Results");
    // console.log("===========================");
    let heroItems = dashboardPage.heroSearchResultsContainer.locator('li');

    // console.log("heroItems are Present / Visible");
    // console.log("Found heroItems");
    await heroItems.nth(0).waitFor(); 

    let liItemCounter = await heroItems.count();    

    // console.log(`liItemCounter Value is: [${liItemCounter}]`);
    let heroPresent = false;

    for (let i = 0; i < liItemCounter; i++) {
        let currentHero = await heroItems.nth(i);
        let currentHeroName = await currentHero.textContent();
        // console.log(`nth textContent is: [${currentHeroName}]`);
        // console.log(`heroName Value is: [${heroName}]`);
        if(currentHeroName!.includes(heroName))
        {
            // console.log("currentHeroName includes heroName");
            heroPresent = true;
            break;
        }
    }

    expect(heroPresent === true, "Hero Name didn't appear to be Present in the List of Heroes");
});

Then('I Delete a Random Hero from the List of Heroes', function () {
    // Variable Declarations
    const { page }: CustomWorld = this;
    commonPage = new CommonPage(page!);

    // Ensure on Dashboard Page
    dashboardPage = new DashboardPage(page!);
    
    expect(dashboardPage.topHeroesText).toBeVisible();
    expect(dashboardPage.heroSearchContainer).toBeVisible();
    expect(dashboardPage.heroSearchBar).toBeVisible();
    
    // Click the Hero Search Bar and Enter in Hero Name
    dashboardPage.heroSearchBar.fill(heroName);
});