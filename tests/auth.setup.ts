import { expect } from "@playwright/test";
import {test as setup} from "../src/fixtures/base-fixture";
import {env} from "../src/config/env";
import path from "path";

setup("Verify login test", async function({homePage, loginPage, header, page}){

        await homePage.launchUrl();

        await header.clickLoginLink();

        await loginPage.doLogin(env.testUserEmail, env.testUserPassword);

        expect(await header.isAtLogoutLinkVisible()).toBeTruthy()

        expect(await header.getLoggedInUserEmail()).toEqual(env.testUserEmail);

        await page.context().storageState({path: path.resolve(process.cwd(), "auth/user.json")})
})