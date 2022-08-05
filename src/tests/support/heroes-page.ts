import { Browser, BrowserContext, Locator, Page } from 'playwright';

export class HeroesPage {
    context?: BrowserContext;
    heroesPage: Page;
    browser?: Browser;   
    
    constructor(page: Page)
    {
        this.heroesPage = page;
    }
    
    public get myHeroesText() {
        return this.heroesPage.locator('h2', {hasText: 'My Heroes'});
    }
    
    public get newHeroInputField() {
        return this.heroesPage.locator('id=new-hero');
    }

    
    public get addHeroButton() {
        return this.heroesPage.locator('id=add-button');
    }
}