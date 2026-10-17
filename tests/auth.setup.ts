import { expect } from "@playwright/test";
import {test as setup} from "../src/fixtures/base-fixture";

setup("Verify login test", async function({homePage, loginPage, header, page}){

        await homePage.launchUrl();

        await header.clickLoginButton();

        await loginPage.doLogin("abcdef2195@gmail.com", "Abcdef");

        expect(await header.isAtLoginPage()).toBeTruthy()

        expect(await header.getLoggedInUserEmail()).toEqual("abcdef2195@gmail.com");

        await page.context().storageState({path:'../auth/user.json'})
})