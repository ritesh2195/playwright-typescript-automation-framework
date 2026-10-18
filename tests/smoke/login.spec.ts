import { expect } from "@playwright/test";
import {test} from "../../src/fixtures/base-fixture";
import {env} from '../../src/config/env'

test.describe("Login Test", ()=>{

    test("Verify login test", async function({homePage, loginPage, header}){

        await homePage.launchUrl();

        await header.clickLoginLink();

        await loginPage.doLogin(env.testUserEmail, env.testUserPassword);

        expect(await header.isAtLogoutLinkVisible()).toBeTruthy()

        expect(await header.getLoggedInUserEmail()).toEqual(env.testUserEmail);
    })
})