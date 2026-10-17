import {Page} from "@playwright/test";

export class BasePage {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Method to launch application url
     */
    public async launchUrl() {
        await this.page.goto("/");
    }

    /**
     * Method to return title of current web page
     * @returns page title of the current web page
     */
    public async getPageTitle(): Promise<string>{
        return await this.page.title() ?? ''
    }
}