import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Locator, Page } from 'playwright';
import { CustomWorld } from './custom-world';

export class DashboardPage {
    dashboardPage: Page;

    constructor(page: Page)
    {
        this.dashboardPage = page;
    }

    public get topHeroesText() {
        return this.dashboardPage.locator('h2', {hasText: 'Top Heroes'});
    }

    public get heroesMenu() {
        return this.dashboardPage.locator('id=heroes-menu');
    }

    public get heroSearchContainer() {
        return this.dashboardPage.locator('id=search-component');
    }

    public get heroSearchTitleText() {
        return this.heroSearchContainer?.locator('text=Hero Search');
    }

    public get heroSearchBar() {
        return this.heroSearchContainer?.locator('id=search-box');
    }

    public get heroSearchResultsContainer() {
        return this.heroSearchContainer?.locator('ul.search-result');
    }
}