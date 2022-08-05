import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Locator, Page } from 'playwright';
import { CustomWorld } from './custom-world';

export class DashboardPage {    
    context?: BrowserContext;
    dashboardPage?: Page;
    browser?: Browser;

    topHeroesText?: Locator;
    heroesMenu?: Locator;
    heroSearchContainer?: Locator;
    heroSearchTitleText?: Locator;
    heroSearchBar?: Locator;
    heroSearchResultsContainer?: Locator;

    constructor(page: Page)
    {
        this.topHeroesText = page.locator('h2', {hasText: 'Top Heroes'});
        this.heroesMenu = page.locator('id=heroes-menu');
        this.heroSearchContainer = page.locator('id=search-component');        
        this.heroSearchTitleText = this.heroSearchContainer.locator('text=Hero Search');
        this.heroSearchBar = this.heroSearchContainer.locator('id=search-box');
        this.heroSearchResultsContainer = this.heroSearchContainer.locator('id=search-result');
    }
}