import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ProductDetailsModel } from "../models/ProductDetailsModel";

export class ProductListPage extends BasePage{

    private readonly addToCartButton: Locator;
    private readonly productTitleLink: Locator;
    private readonly productActualPrice: Locator;
    constructor(page:Page){
        super(page);
        this.addToCartButton = page.getByRole('button',{name:'Add to cart'});
        this.productTitleLink = page.locator('h2 a');
        this.productActualPrice = page.locator('.price.actual-price')
    }

    /**
     * Click on add to cart button of first product
     * @returns tile of the first product including price
     */
    public async addProductToCart(): Promise<ProductDetailsModel>{
        const productTitle = await this.productTitleLink.nth(0).textContent() ?? '';
        const productActualPrice = await this.productActualPrice.nth(0).textContent() ?? ''
        const productDetails: ProductDetailsModel = {
            title: productTitle,
            price: Number(productActualPrice.replace(/[^\d.-]/g, ""))
        }
        await this.addToCartButton.nth(0).click();
        return productDetails;    
    }
}