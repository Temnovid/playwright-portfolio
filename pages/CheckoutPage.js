export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput  = page.locator('[data-test="lastName"]');
    this.postalInput    = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton   = page.locator('[data-test="finish"]');
    this.confirmHeader  = page.locator('.complete-header');
    this.summaryTotal   = page.locator('.summary_total_label');
  }

  async fillInfo({ firstName, lastName, postal }) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalInput.fill(postal);
    await this.continueButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }
}