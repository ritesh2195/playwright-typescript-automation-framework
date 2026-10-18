import { Locator, Page } from "@playwright/test";
import { BasePage } from "../pages/BasePage";

export class Header {

    private readonly loginLink: Locator;
    private readonly logoutLink: Locator;
    private readonly loggedInUserEmail: Locator;
    private readonly registerLink: Locator;

    constructor(private readonly page: Page){
        this.loginLink = page.getByRole('link',{name:'Log in'});

        this.logoutLink = page.getByRole('link',{name:'Log out'});

        this.registerLink = page.getByRole('link', {name:'Register'});

        this.loggedInUserEmail = page.locator(".header-links a[href='/customer/info']");
    }

    /**
     * Click on the Log in link
     */
    public async clickLoginLink(){
        await this.loginLink.click();
    }

    /**
     * Click on the Log out link
     */
    public async clickLogOutLink(){
        await this.logoutLink.click();
    }

    /**
     * Click on the Register link
     */
    public async clickRegisterLink(){
        await this.registerLink.click();
    }

    /**
     * Verify logout link is visible
     * @returns True if logout link is visible otherwise false
     */
    public async isAtLogoutLinkVisible(): Promise<boolean>{
        return await this.logoutLink.isVisible()
    }

    /**
     * Retrieve email id of logged in user
     * @returns Email id of logged in user
     */
    public async getLoggedInUserEmail(): Promise<string>{
        return await this.loggedInUserEmail.textContent() ?? '';
    }

    /**
     * Navigate to account page by clicking logged in user email link
     */
    public async navigateToAccountPage(): Promise<void>{
        await this.loggedInUserEmail.click();
    }
}