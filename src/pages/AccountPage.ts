import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CustomerInfoSection } from "../components/CustomerInfoSection";

export class AccountPage extends BasePage{
    
    private readonly customerInfo: CustomerInfoSection;
    private readonly customerInfoLink: Locator;
    private readonly orderLink: Locator;
    private readonly adressesLink: Locator;

    constructor(page:Page){
        super(page);
        this.customerInfo = new CustomerInfoSection(page);
        this.customerInfoLink = page.getByRole('link',{name:'Customer Info'});
        this.orderLink = page.getByRole('link',{name:'Order'});
        this.adressesLink = page.getByRole('link',{name:'Addresses'});
    }

    /**
     * Return CustomerInfoSection class object
     * @returns object of CustomerInfoSection class 
     */
    public async getCustomerInfoSection(): Promise<CustomerInfoSection> {
        return this.customerInfo;
    }

    /**
     * Click on Addresses link in left menu navigation
     */
    public async clickAddressesLink(): Promise<void> {
        await this.adressesLink.click();
    }

    /**
     * Click on Order link in left menu navigation
     */
    public async clickOrderLink(): Promise<void>{
        await this.orderLink.click();
    }
}