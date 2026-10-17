import { Locator, Page } from "@playwright/test";
import { SavedUserDetails } from "../models/SavedUserDetailsModel";

export class CustomerInfoSection {
  private readonly genderMaleRadioButton: Locator;
  private readonly genderFemaleRadioButton: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;

  constructor(private readonly page: Page) {
    this.genderMaleRadioButton = page.getByLabel('Male', { exact: true });
    this.genderFemaleRadioButton = page.getByLabel('Female', { exact: true });
    this.firstNameInput = page.getByLabel("First name:");
    this.lastNameInput = page.getByLabel("Last name:");
    this.emailInput = page.getByLabel("Email:");
  }

  /**
   * Retrieve all saved user details
   * @returns An object containing the user details
   */
  public async getSavedUserDetails(): Promise<SavedUserDetails> {
    let gender: string = "";
    if (await this.genderMaleRadioButton.isChecked()) {
      gender = "Male";
    } else if (await this.genderFemaleRadioButton.isChecked()) {
      gender = "Female";
    }

    const savedUserInfor: SavedUserDetails = {
      gender,
      firstName: (await this.firstNameInput.getAttribute("value")) ?? "",
      lastName: (await this.lastNameInput.getAttribute("value")) ?? "",
      email: (await this.emailInput.getAttribute("value")) ?? "",
    };

    savedUserInfor["firstName"] =
      (await this.firstNameInput.getAttribute("value")) ?? "";
    savedUserInfor["lastName"] =
      (await this.lastNameInput.getAttribute("value")) ?? "";
    savedUserInfor["email"] =
      (await this.emailInput.getAttribute("value")) ?? "";

    return savedUserInfor;
  }
}
