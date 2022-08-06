import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../custom-world';
import { HeroesPage } from '../heroes-page';
import { CommonPage } from '../common-page';
import { DashboardPage } from '../dashboard-page';
import { expect } from '@playwright/test';
import { HeroDetailsPage } from '../hero-details-page';

let commonPage: CommonPage;
let dashboardPage: DashboardPage;
let heroesPage: HeroesPage;
let heroDetailsPage: HeroDetailsPage;
let deletedHeroName: string;

Given('I am in the hero page', async function(this: CustomWorld) {
    const { page }: CustomWorld = this;
    await page?.goto('http://localhost:4200/dashboard');

    expect(true).toBeTruthy();
})


// TODO: Your step definitions here

When('I Add a New Hero {string}', async function (heroName: string) {
    // Variable Declarations
    const { page }: CustomWorld = this;
    commonPage = new CommonPage(page!);
    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    // Ensure on Heroes Page
    heroesPage = new HeroesPage(page!);
    
    expect(heroesPage.myHeroesText).toBeVisible();
    expect(heroesPage.newHeroInputField).toBeVisible();
    expect(heroesPage.addHeroButton).toBeVisible();

    // console.log("Changing Hero Name");
    const heroNameField = heroesPage.newHeroInputField;

    let currentHeroName = await heroNameField.inputValue();
    // console.log(`currentHeroName2 Value is: [${currentHeroName}]`);    
    
    // Click the Add Hero Field, Enter in Name, 
    //  and Click Add Hero Button
    heroesPage.newHeroInputField.fill(heroName);
    await delay(1000);

    let newHeroName = await heroNameField.inputValue();
    // console.log(`newHeroName Value is: [${newHeroName}]`);
    
    // console.log("newHeroName === heroName Validation");
    // console.log(`newHeroName Value is: [${newHeroName}]`);
    // console.log(`heroName Value is: [${heroName}]`);
    expect(newHeroName === heroName).toBeTruthy();
    
    await delay(1000);
    heroesPage.addHeroButton.click();
    await delay(1000);
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
            console.log("currentHeroName includes heroName");
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

When('I Navigate to the Dashboard Page', function () {
    // Variable Declarations
    const { page }: CustomWorld = this;
    commonPage = new CommonPage(page!);

    // Click the Heroes Link
    commonPage.dashboardNavButton?.click();

    // Ensure on Dashboard Page
    dashboardPage = new DashboardPage(page!);
    
    // console.log("Finding Dashboard Page Elements");
    expect(dashboardPage.topHeroesText).toBeVisible();
    expect(dashboardPage.heroSearchContainer).toBeVisible();
    expect(dashboardPage.heroSearchBar).toBeVisible();
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

When('I Select Hero {string} from the Search Results', async function (heroName: string) {
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

    for (let i = 0; i < liItemCounter; i++) {
        let currentHero = await heroItems.nth(i);
        let currentHeroName = await currentHero.textContent();
        console.log(`nth textContent is: [${currentHeroName}]`);
        // console.log(`heroName Value is: [${heroName}]`);
        if(currentHeroName!.includes(heroName))
        {
            console.log("currentHeroName includes heroName");
            currentHero.click();
            console.log("Clicked Hero Item in the Search List");
            break;
        }
    }
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

Then('I Delete a Random Hero from the List of Heroes', async function () {
    // Variable Declarations
    const { page }: CustomWorld = this;
    commonPage = new CommonPage(page!);

    // Ensure on Heroes Page
    heroesPage = new HeroesPage(page!);
    
    expect(heroesPage.myHeroesText).toBeVisible();
    expect(heroesPage.heroesListContainer).toBeVisible();
    
    // Ensure Hero List is Present and Contains Records
    // console.log("Logging Heroes");
    // console.log("==============");
    let heroItems = heroesPage.heroesListContainer.locator('li');

    // console.log("heroItems are Present / Visible");
    // console.log("Found heroItems");
    await heroItems.nth(0).waitFor(); 
    
    let liItemCounter = await heroItems.count();    

    // console.log(`liItemCounter Value is: [${liItemCounter}]`);
    
    // Select Random Hero (between 0 and Max)
    let heroDeleteIndex = Math.floor(Math.random() * (liItemCounter + 1));
    // console.log(`heroDeleteIndex Value is: [${heroDeleteIndex}]`);

    let currentHero = await heroItems.nth(heroDeleteIndex);
    let currentHeroName = await currentHero.textContent();
    // console.log(`nth textContent is: [${currentHeroName}]`);

    deletedHeroName = currentHeroName!;

    let deleteButton = currentHero.locator('button.delete');
    // console.log("Found Delete Button");

    deleteButton.click();
});

Then('I Delete a Random Here from the List of Heroes that\'s not {string}', async function (heroName: string) {
    // Variable Declarations
    const { page }: CustomWorld = this;
    commonPage = new CommonPage(page!);
    const delay = ms => new Promise(res => setTimeout(res, ms));

    // Ensure on Heroes Page
    heroesPage = new HeroesPage(page!);
    
    expect(heroesPage.myHeroesText).toBeVisible();
    expect(heroesPage.heroesListContainer).toBeVisible();
    
    // Ensure Hero List is Present and Contains Records
    // console.log("Logging Heroes");
    // console.log("==============");
    let heroItems = heroesPage.heroesListContainer.locator('li');

    // console.log("heroItems are Present / Visible");
    // console.log("Found heroItems");
    await heroItems.nth(0).waitFor(); 
    
    let liItemCounter = await heroItems.count();    

    // console.log(`liItemCounter Value is: [${liItemCounter}]`);    
    
    while(true)
    {
        // Select Random Hero (between 0 and Max)
        let heroDeleteIndex = Math.floor(Math.random() * (liItemCounter + 1));
        // console.log(`heroDeleteIndex Value is: [${heroDeleteIndex}]`);

        let currentHero = await heroItems.nth(heroDeleteIndex);
        let currentHeroName = await currentHero.textContent();
        // console.log(`currentHeroName is: [${currentHeroName}]`);

        if(!(currentHeroName!.includes(heroName)))
        {
            // console.log("currentHeroName doesn't include heroName");
            const deleteButton = currentHero.locator('.delete');
            // console.log("Found Delete Button");
        
            await delay(1000);
            console.log(`Deleted Hero [${currentHeroName}]`);           
            deleteButton.click();
            await delay(1000);
            break;
        }
    }   
  });

Then('The Previously Deleted Hero should not be present in the List of Heroes', async function () {
    // Variable Declarations
    const { page }: CustomWorld = this;
    commonPage = new CommonPage(page!);

    // Ensure on Heroes Page
    heroesPage = new HeroesPage(page!);
    
    expect(heroesPage.myHeroesText).toBeVisible();
    expect(heroesPage.heroesListContainer).toBeVisible();
    
    // Ensure Hero List is Present and Contains Records
    // console.log("Logging Heroes");
    // console.log("==============");
    let heroItems = heroesPage.heroesListContainer.locator('li');

    // console.log("heroItems are Present / Visible");
    // console.log("Found heroItems");
    // heroItems.nth(8).waitFor(); 
    
    let liItemCounter = await heroItems.count();    

    // console.log(`liItemCounter Value is: [${liItemCounter}]`);
    let heroPresent = false;

    // console.log(`deletedHeroName Value is: [${deletedHeroName}]`);

    // let currentHeroesInList = [];
    var currentHeroesInList:Array<any>=[] 

    // console.log(`liItemCounter Value is: [${liItemCounter}]`);

    for (let i = 0; i < (liItemCounter - 1); i++) {
        let currentHero = heroItems.nth(i);
        let currentHeroName = await currentHero.textContent();
        // console.log(`currentHeroName Value is: [${currentHeroName}]`);
        currentHeroesInList.push(await currentHero.textContent());
    }

    if (currentHeroesInList.includes(deletedHeroName)) {
        console.log(`⛔️ currentHeroesInList contains deletedHeroName [${deletedHeroName}]`);
        heroPresent = true;
      } else {
        console.log(`✅ currentHeroesInList does NOT contain deletedHeroName [${deletedHeroName}]`);
        heroPresent = false;
      }
    
    // console.log(`heroPresent Value is: [${heroPresent}]`);

    expect(heroPresent).toBeFalsy();
    // console.log("heroPresent was Falsy");
});

Then('The Hero Details Page Appears', async function () {
    // Variable Declarations
    const { page }: CustomWorld = this;
    commonPage = new CommonPage(page!);

    // Ensure on Hero Details Page
    heroDetailsPage = new HeroDetailsPage(page!);
    
    // Wait for the element
    await heroDetailsPage.heroNameInputField.waitFor();

    // console.log("waited for inputField");

    expect(heroDetailsPage.heroNameDetailsText).toBeVisible();
    expect(heroDetailsPage.heroNameInputField).toBeVisible();
    expect(heroDetailsPage.backButton).toBeVisible();
});

Then('I Change the Hero Name to {string}', async function (heroName: string) {
    // Variable Declarations
    const { page }: CustomWorld = this;

    // Ensure on Hero Details Page
    heroDetailsPage = new HeroDetailsPage(page!);
    expect(heroDetailsPage.heroNameDetailsText).toBeVisible();
    expect(heroDetailsPage.heroNameInputField).toBeVisible();
    
    // console.log("Changing Hero Name");
    const heroNameField = heroDetailsPage.heroNameInputField;

    // let currentHeroName = await heroNameField.getAttribute("ng-reflect-model");
    let currentHeroName = await heroNameField.inputValue();
    // console.log(`currentHeroName Value is: [${currentHeroName}]`);   

    heroNameField.fill(heroName);    
    let textSelector = 'text=' + heroName;
    // console.log(`textSelector Value is: [${textSelector}]`);   
    await this.page.waitForSelector(textSelector);

    let newHeroName = await heroNameField.inputValue();
    // console.log(`newHeroName Value is: [${newHeroName}]`);

    expect(currentHeroName === newHeroName).toBeFalsy();
    
    const delay = ms => new Promise(res => setTimeout(res, ms));
    await delay(1000);
    // console.log("Waited 1s");

    // Click the Save Button
    heroDetailsPage.saveButton.click();    
    await delay(1000);
    // console.log("Waited Another 1s");
});

Then('No Results for {string} should Appear in the Search Results List', async function (heroName: string) {
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

    let liItemCounter = await heroItems.count();
    // console.log(`liItemCounter Value is: [${liItemCounter}]`);
    
    expect(liItemCounter === 0).toBeTruthy();
});

Then('I Search for Hero {string}', function (heroName: string) {
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

Then('I Clear the Hero Search Field', async function () {
    // Variable Declarations
    const { page }: CustomWorld = this;
    commonPage = new CommonPage(page!);

    // Ensure on Dashboard Page
    dashboardPage = new DashboardPage(page!);
    
    expect(dashboardPage.topHeroesText).toBeVisible();
    expect(dashboardPage.heroSearchContainer).toBeVisible();
    expect(dashboardPage.heroSearchBar).toBeVisible();
    
    // Click the Hero Search Bar and Enter in Hero Name
    dashboardPage.heroSearchBar.fill('');

    let currentSearchTerms = await dashboardPage.heroSearchBar.inputValue();
    // console.log(`currentSearchTerms Value is: [${currentSearchTerms}]`);
    
    expect(currentSearchTerms === '').toBeTruthy();
});

Then('The Hero {string} should be Present in the Top Heroes Section', async function (heroName: string) {
    // Variable Declarations
    const { page }: CustomWorld = this;
    commonPage = new CommonPage(page!);

    // Ensure on Dashboard Page
    dashboardPage = new DashboardPage(page!);
    
    expect(dashboardPage.topHeroesText).toBeVisible();
    expect(dashboardPage.topHeroesMenu).toBeVisible();

    // Ensure Hero Name is Present in Top Heroes List
    console.log(`heroName Value is: [${heroName}]`);
    // console.log("Logging Hero Search Results");
    // console.log("===========================");
    let topHeroItems = dashboardPage.topHeroesMenu.locator('a');

    // console.log("topHeroItems are Present / Visible");    
    // topHeroItems.nth(3).waitFor();
    // console.log("Found topHeroItems");

    let locatorSelector = 'text=' + heroName;
    // console.log(`locatorSelector Value is: [${locatorSelector}]`);
    let newHeroLink = dashboardPage.topHeroesMenu.locator(locatorSelector);
    expect(newHeroLink).toBeVisible();
    // console.log("newHeroLink was Visible");
  });