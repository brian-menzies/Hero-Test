import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Locator, Page } from 'playwright';
import { CustomWorld } from './custom-world';

export class CommonPage {
    context?: BrowserContext;
    commonPage?: Page;
    browser?: Browser;

    // tourOfHeroesText?: Locator;
    // dashboardNavButton?: Locator;
    // heroesNavButton?: Locator;
    
    constructor(page: Page)
    {
        this.commonPage = page;
        // this.tourOfHeroesText = page.locator('h1', {hasText: 'Tour of Heroes'});
        // this.dashboardNavButton = page.locator('a', {hasText: 'Dashboard'});
        // this.heroesNavButton = page.locator('a', {hasText: 'Heroes'});
    }

    public get tourOfHeroesText() {
        return this.commonPage?.locator('h1', {hasText: 'Tour of Heroes'});
    }

    public get dashboardNavButton() {
        return this.commonPage?.locator('a', {hasText: 'Dashboard'});
    }

    public get heroesNavButton() {
        return this.commonPage?.locator('a', {hasText: 'Heroes'});
    }
}