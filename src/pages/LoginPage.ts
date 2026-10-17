import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
export class LoginPage extends BasePage{
    private readonly emailInput:Locator;
    private readonly passwordInput:Locator;
    private readonly loginButton:Locator;

    constructor(page:Page){
        super(page);
        this.emailInput = page.getByLabel("Email");
        this.passwordInput = page.getByLabel("Password");
        this.loginButton = page.getByRole('button', { name: 'Log in' });
    }

    /**
     * 
     * @param emai - a valid email address of the user
     * @param password - valid password of the user
     * @returns A promise that resolves when the user logged in the application
     */
    public async doLogin(emai: string, password: string){
        await this.emailInput.fill(emai);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}