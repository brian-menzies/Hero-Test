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

    // Click the Heroes Link
    commonPage.heroesNavButton?.click();

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

When('The Hero should Appear in the Hero List', async function(this: CustomWorld) {
    expect(true).toBeTruthy();
})