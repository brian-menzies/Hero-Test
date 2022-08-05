import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Locator, Page } from 'playwright';

export class CustomWorld extends World {
    context?: BrowserContext;
    page?: Page;
    browser?: Browser;
    
    

    heroNameInputText?: Locator;
    heroNameInputField?: Locator;
    addHeroButton?: Locator;

    heroListContainer?: Locator;
}

setWorldConstructor(CustomWorld);