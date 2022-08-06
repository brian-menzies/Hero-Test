import { Browser, BrowserContext, Locator, Page } from 'playwright';

export class HeroDetailsPage {
    heroDetailsPage: Page;
    
    constructor(page: Page)
    {
        this.heroDetailsPage = page;
    }

    public get heroNameDetailsText() {
        return this.heroDetailsPage?.locator('h2');
    }
    
    public get heroNameInputField() {
        return this.heroDetailsPage?.locator('id=hero-name');
    }
    
    public get backButton() {
        return this.heroDetailsPage.locator('button', {hasText: 'go back'});
    }
    
    public get saveButton() {
        return this.heroDetailsPage.locator('button', {hasText: 'save'});
    }
}