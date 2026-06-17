import { expect, Page, test } from "@playwright/test";
import path from "path";
import { clickButtonByLabel, clickMenuByLabel, inputDateByLabel, inputTextByLabel, selectCheckboxByLabel, selectDropdownByLabel, selectRadioOptionByLabel, verifyNotification } from "../../src/common/common";

test.beforeEach('Before each test', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/login');
});

test('Verify create coupon successful', async ({ page }) => {
    let signInButton = page.getByRole('button', { name: 'SIGN IN' });
    await expect(signInButton).toBeVisible();
    await inputTextByLabel('Email*', 'test@with.me', page);
    await inputTextByLabel('Password*', '1234567890', page);
    await clickButtonByLabel('SIGN IN', page);
    await expect(page.locator("//h1[text()='Dashboard']")).toBeVisible();
    await clickMenuByLabel('New Coupon', page);
    await expect(page.locator("//h1[text()='Create a new coupon']")).toBeVisible();
    const random = new Date().getTime();
    const inputData = {
        couponCode: `CODE${random}`,
        description: 'Happy coupon',
        discountAmount: '100',
        startDate: '01/10/2026',
        endDate: '31/10/2026',
        minimumAmount: '200',
        minimumQuantity: '2',
        customerPurchase: '1'
    };
    await inputTextByLabel('Coupon Code*', inputData.couponCode, page);
    await inputTextByLabel('Description*', inputData.description, page);
    await selectRadioOptionByLabel('Status*', 'Disabled', page);
    await inputTextByLabel('Discount amount*', inputData.discountAmount, page);
    await inputDateByLabel('Start date', inputData.startDate, page);
    await inputDateByLabel('End date', inputData.endDate, page);
    await selectCheckboxByLabel('Free shipping?', 'check', page);
    await selectRadioOptionByLabelCoupon('Discount Type', 'Fixed discount to entire order', page);
    await inputTextByLabel('Minimum purchase amount', inputData.minimumAmount, page);
    await inputTextByLabel('Minimum purchase qty', inputData.minimumQuantity, page);
    await selectDropdownByLabelCoupon('Customer groups', 'Default', page);
    await inputTextByLabel("Customer's purchase", inputData.customerPurchase, page);
    await clickButtonByLabel("Save", page);
    await expect(page.getByText(`Editing ${inputData.couponCode}`)).toBeVisible();
});

async function selectRadioOptionByLabelCoupon(label: string, option: string, page: Page) {
    let xpath = `//div[@data-slot='card-title' and normalize-space()='${label}']/following::label[normalize-space()='${option}']/preceding::span[@role='radio'][1]`;
    await page.locator(xpath).click();
}

export async function selectDropdownByLabelCoupon(label: string, value: string, page: Page) {
    let xpath = `//label[normalize-space()='${label}']/following::input[1]`;
    await page.locator(xpath).click();
    let itemXpath = `//div[@role='option' and normalize-space()='${value}']`;
    await page.locator(itemXpath).click();
}