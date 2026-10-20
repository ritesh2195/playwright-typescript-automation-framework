import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ShoppingCartPage extends BasePage{
    private readonly totalPrice;
    private readonly productName;
    private readonly termOfServiceCheckBox: Locator;
    private readonly checkoutButton: Locator;
    constructor(page:Page){
        super(page);
        this.productName = page.locator("//a[@class='product-name']");
        this.totalPrice = page.locator("//span[@class='product-price order-total']//strong");
        this.termOfServiceCheckBox = page.locator('#termsofservice');
        this.checkoutButton = page.getByRole('button',{name:'Checkout'});
    }

    /**
     * Retrieve product name from shopping cart page
     * @returns Product name displaying on shopping cart page
     */
    public async getProductName(): Promise<string>{
        return await this.productName.textContent() ?? ''
    }

    /**
     * Retrieve total price from shopping cart page
     * @returns Total price displaying on shopping cart page
     */
    public async getProductTotalPrice(): Promise<string>{
        return await this.totalPrice.textContent() ?? ''
    }

    /**
     * Check the term of service
     */
    public async checkTermOfService(){
        await this.termOfServiceCheckBox.check();
    }

    /**
     * Click on checkout button
     */
    public async clickCheckoutButton(){
        await this.checkoutButton.click();
    }
}