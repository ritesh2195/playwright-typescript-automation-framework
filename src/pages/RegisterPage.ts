import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import {RegisterUserModel} from '../models/RegisterUserModel'

export class RegisterPage extends BasePage{
    private readonly genderMaleRadioButton: Locator;
    private readonly genderFemaleRadioButton: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPassword: Locator;
    private readonly registerButton: Locator;

    constructor(page:Page){
        super(page);
        this.genderMaleRadioButton = page.getByLabel('Male', { exact: true });
        this.genderFemaleRadioButton = page.getByLabel('Female', { exact: true });
        this.firstNameInput = page.getByLabel('First name:');
        this.lastNameInput = page.getByLabel('Last name:');
        this.emailInput = page.getByLabel('Email:');
        this.passwordInput = page.getByLabel('Password:', { exact: true });
        this.confirmPassword = page.getByLabel('Confirm password:');
        this.registerButton = page.getByRole('button',{name:'Register'});
    }

    /**
    * Registers a new user using the supplied registration details.
    *
    * @param userDetails - Contains the user's name, email,
    * password, confirmation password, and gender.
    * @returns A promise that resolves when the registration
    * form has been submitted.
    */
    public async registerNewUser(userDetails: RegisterUserModel){
        if (userDetails.gender==='Male'){
            await this.genderMaleRadioButton.check();
        }

        else if (userDetails.gender==='Female'){
            await this.genderFemaleRadioButton.check();
        }
        await this.firstNameInput.fill(userDetails.firstName);
        await this.lastNameInput.fill(userDetails.lastName);
        await this.emailInput.fill(userDetails.email);
        await this.passwordInput.fill(userDetails.password);
        await this.confirmPassword.fill(userDetails.confirmPassword);
        await this.registerButton.click();
    }
}