import { expect } from "@playwright/test";
import { test } from "../../src/fixtures/base-fixture";
import {env} from '../../src/config/env'

test.describe("search product test", ()=>{
    test("valid search product", async function({
        header, 
        page, 
        homePage,  
        loginPage,
        productListPage,
        shoppingCartPage
    }){
        await homePage.launchUrl();
        await header.searchProduct('laptop');
        const { title, price } = await productListPage.addProductToCart();
        await header.clickShoppingCartLink();
        const cartPrice = Number(await shoppingCartPage.getProductTotalPrice());
        expect(price).toEqual(cartPrice)
        await shoppingCartPage.checkTermOfService();
        await shoppingCartPage.clickCheckoutButton();
        await loginPage.doLogin(env.testUserEmail, env.testUserPassword);
    })
})