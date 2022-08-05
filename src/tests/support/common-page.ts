import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Locator, Page } from 'playwright';
import { CustomWorld } from './custom-world';

export class CommonPage {
    commonPage: Page;
    
    constructor(page: Page)
    {
        this.commonPage = page;
    }

    public get tourOfHeroesText() {
        return this.commonPage.locator('h1', {hasText: 'Tour of Heroes'});
    }

    public get dashboardNavButton() {
        return this.commonPage.locator('a', {hasText: 'Dashboard'});
    }

    public get heroesNavButton() {
        return this.commonPage.locator('a', {hasText: 'Heroes'});
    }
}