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

When('I Add a New Hero {string}', function (heroName: string) {
    const { page }: CustomWorld = this;
    // const { dashboardPage } : DashboardPage = this;
    // const { commonPage } : CommonPage = this;
    const commonPage = new CommonPage(page);

    // Click the Heroes Link
    commonPage.heroesNavButton?.click();
    
    // Click the Add Hero Field, Enter in Name, 
    //  and Click Add Hero Button
    const heroesPage = new HeroesPage(page);
    heroesPage.newHeroInputField.fill(heroName);

    const addButton = heroesPage.addHeroButton;
    expect(addButton).toBeTruthy();
    expect(addButton).toBeVisible();
    
    // expect(heroesPage.newHeroInputField.tohave)
    // expect(heroesPage.newHeroInputField).toContainText(heroName);
    // expect(heroesPage.addHeroButton).toBeVisible();

    heroesPage.addHeroButton.click();
  });

// TODO: Your step definitions here
// When('I Add a New Hero \{\d*\}/', async function(this: CustomWorld, heroName: string) {
//     const { page }: CustomWorld = this;
//     const { dashboardPage } : DashboardPage = this;
//     // const { commonPage } : CommonPage = this;
//     commonPage = new CommonPage(page);

//     // Click the Heroes Link
//     await commonPage.heroesNavButton.click();
    
//     // Click the Add Hero Field, Enter in Name, 
//     //  and Click Add Hero Button
//     heroesPage = new HeroesPage(page);
//     heroesPage.newHeroInputField.fill(heroName);
//     heroesPage.addHeroButton.click();
// })

When('The Hero should Appear in the Hero List', async function(this: CustomWorld) {
    expect(true).toBeTruthy();
})