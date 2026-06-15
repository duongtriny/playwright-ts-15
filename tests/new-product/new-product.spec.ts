import { expect, Page, test } from "@playwright/test";
import path from "path";

test.beforeEach('Before each test', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/login');
});

test('Verify user can create a new product successful', async ({ page }) => {
    let signInButton = page.getByRole('button', { name: 'SIGN IN' });
    await expect(signInButton).toBeVisible();
    await inputTextByLabel('Email*', 'test@with.me', page);
    await inputTextByLabel('Password*', '1234567890', page);
    await clickButtonByLabel('SIGN IN', page);
    await expect(page.locator("//h1[text()='Dashboard']")).toBeVisible();
    await clickMenuByLabel('New Product', page);
    await expect(page.locator("//h1[text()='Create a new product']")).toBeVisible();
    await inputTextByLabel('Product Name*', 'Test With Me', page);
    const random = new Date().getTime();
    await inputTextByLabel('SKU*', `SKU-${random}`, page);
    await inputTextByLabel('Price*', `1000`, page);
    await selectProductCategory('Women', page);
    await selectDropdownByLabel('Tax Class*', 'Taxable Goods', page);
    await uploadImageByLabel('Media', 'resources/images/Hunter_Pride_Month.jpg', page);
    await selectRadioOptionByLabel('Status*', 'Disabled', page);
    await selectRadioOptionByLabel('Visibility*', 'Not visible individually', page);
    await selectRadioOptionByLabel('Manage Stock*', 'No', page);
    await selectRadioOptionByLabel('Stock Availability*', 'Out of Stock', page);
    await inputTextByLabel('Quantity*', '10', page);
    await selectCheckboxByLabel('No shipping required?', 'check', page);
    await inputTextByLabel('URL Key*', `url-key-${random}`, page);
    await inputTextByLabel('Meta Title*', "Biti's Hunter Pride", page);
    await inputTextByLabel('Meta Description', "Giày Thể Thao Nữ Biti's Hunter Pride Month Màu Trắng - Kiểu Dáng Court Sneaker Cổ Thấp", page);
    await selectDropdownByLabel('Attribute group*', 'Default', page);
    await selectDropdownByLabel('Color', 'Black', page);
    await selectDropdownByLabel('Size', 'XL', page);
    await clickButtonByLabel('Save', page);
    await verifyNotification('Product created successfully', page);
});

async function inputTextByLabel(label: string, value: string, page: Page) {
    let xpath1 = `//label[normalize-space()='${label}']/following::input[1]`;
    let xpath2 = `//label[normalize-space()='${label}']/following::textarea[1]`;
    let locator = page.locator(`(${xpath1} | ${xpath2})[1]`);
    await locator.click();
    await locator.clear();
    await locator.fill(value);
}

async function clickButtonByLabel(label: string, page: Page) {
    let xpath = `//button[normalize-space()='${label}']`;
    await page.locator(xpath).click();
}

async function clickMenuByLabel(label: string, page: Page) {
    let xpath = `//div[contains(concat(' ',@class, ' '), ' admin-nav ')]//a[normalize-space()='${label}']`;
    await page.locator(xpath).click();
}

async function selectProductCategory(value: string, page: Page) {
    await clickButtonByLabel('Select category', page);
    await page.getByPlaceholder('Search categories').fill(value);
    await page.locator(`//h3[normalize-space()='${value}']/following::button[1][normalize-space()='Select']`).click();
}

async function selectDropdownByLabel(label: string, value: string, page: Page) {
    let xpath1 = `//label[normalize-space()='${label}']/following::button[1]`;
    let xpath2 = `//td[normalize-space()='${label}']/following::button[1]`;
    let dropdownXpath = `(${xpath1} | ${xpath2})[1]`;
    await page.locator(dropdownXpath).click();
    let itemXpath = `//div[@role='option' and normalize-space()='${value}']`;
    await page.locator(itemXpath).click();
}

async function uploadImageByLabel(label: string, filePath: string, page: Page) {
    let uploadFileXpath = `//div[@data-slot = 'card-title' and normalize-space()='${label}']/following::input[1][@type='file']`;
    await page.locator(uploadFileXpath).setInputFiles(path.join(process.cwd(), filePath));
}

async function selectRadioOptionByLabel(label: string, option: string, page: Page) {
    let xpath = `//div[@role='group' and .//label[normalize-space()='${label}']]//label[normalize-space()='${option}']/preceding::span[@role='radio'][1]`;
    await page.locator(xpath).click();
}

async function verifyNotification(message: string, page: Page) {
    await expect(page.locator(`//div[@role='alert' and normalize-space()='${message}']`)).toBeVisible();
}

async function selectCheckboxByLabel(label: string, isCheck: 'check' | 'uncheck', page: Page) {
    let xpath = `//label[normalize-space()='${label}']/preceding::span[@role='checkbox'][1]`;
    //get current value
    let currentValue = await page.locator(xpath).getAttribute('aria-checked');
    if ((isCheck == 'check' && currentValue == 'false') || (isCheck == 'uncheck' && currentValue == 'true')) {
        await page.locator(xpath).click();
    }
}