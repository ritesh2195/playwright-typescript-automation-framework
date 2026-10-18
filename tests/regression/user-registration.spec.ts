import { expect } from "@playwright/test";
import { test } from "../../src/fixtures/base-fixture";
import { createUserRegistrationData } from "../../src/test-data/register-user.data";

test.describe("User registration test", () => {
  test("User registration with user details", async function ({
    header,
    homePage,
    loginPage,
    registerPage,
    accountPage,
  }) {
    const userDetails = createUserRegistrationData();

    await homePage.launchUrl();
    await header.clickRegisterLink();
    await registerPage.registerNewUser(userDetails);
    expect(await header.isAtLogoutLinkVisible()).toBeTruthy();
    expect(await header.getLoggedInUserEmail()).toEqual(userDetails.email);
    await header.navigateToAccountPage();
    const savedUserDetails = await (await accountPage.getCustomerInfoSection()).getSavedUserDetails();
    expect(savedUserDetails).toMatchObject({
      email: userDetails.email,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      gender: userDetails.gender,
    });
    await header.clickLogOutLink();
    await header.clickLoginLink();
    await loginPage.doLogin(userDetails.email, userDetails.password);
    await header.isAtLogoutLinkVisible();
  });
});
