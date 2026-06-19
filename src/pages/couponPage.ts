import { expect, Page } from "@playwright/test";

export class CouponPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    async isOnPage() {
        await expect(this.page.locator("//h1[text()='Create a new coupon']")).toBeVisible();
    }
    async selectRadioOptionByLabelCoupon(label: string, option: string) {
        let xpath = `//div[@data-slot='card-title' and normalize-space()='${label}']/following::label[normalize-space()='${option}']/preceding::span[@role='radio'][1]`;
        await this.page.locator(xpath).click();
    }

    async selectDropdownByLabelCoupon(label: string, value: string) {
        let xpath = `//label[normalize-space()='${label}']/following::input[1]`;
        await this.page.locator(xpath).click();
        let itemXpath = `//div[@role='option' and normalize-space()='${value}']`;
        await this.page.locator(itemXpath).click();
    }
}