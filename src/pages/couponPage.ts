import { expect, Page } from "@playwright/test";
import { CommonPage } from "./commonPage";
import { CommonBehavior } from "./commonInterface";
import * as allure from "allure-js-commons";

export class CouponPage extends CommonPage implements CommonBehavior {
    constructor(page: Page) {
        super(page);
    }
    async isOnPage() {
        await allure.step("It should be on Coupon page", async () => {
            await expect(this.page.locator("//h1[text()='Create a new coupon']")).toBeVisible();
        })
    }
    async selectRadioOptionByLabelCoupon(label: string, option: string) {
        await allure.step(`Select option "${option}" in radio group "${label}"`, async () => {
            let xpath = `//div[@data-slot='card-title' and normalize-space()='${label}']/following::label[normalize-space()='${option}']/preceding::span[@role='radio'][1]`;
            await this.page.locator(xpath).click();
        });
    }

    async selectDropdownByLabelCoupon(label: string, value: string) {
        await allure.step(`Select item "${value}" in dropdown "${label}"`, async () => {
            let xpath = `//label[normalize-space()='${label}']/following::input[1]`;
            await this.page.locator(xpath).click();
            let itemXpath = `//div[@role='option' and normalize-space()='${value}']`;
            await this.page.locator(itemXpath).click();
        });
    }
}