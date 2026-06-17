import { expect, Page, test } from "@playwright/test";
import path from "path";
import { clickButtonByLabel, clickMenuByLabel, getInputValueByLabel, getTextareaValueByLabel, inputTextById, inputTextByLabel, selectCheckboxByLabel, selectDropdownByLabel, selectProductCategory, selectRadioOptionByLabel, uploadImageByLabel, verifyNotification } from "../../src/common/common";

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
    const random = new Date().getTime();
    const inputData = {
        productName: `Test With Me - ${random}`,
        sku: `SKU-${random}`,
        price: '1000',
        quantity: '10',
        urlKey: `url-key-${random}`,
        metaTitle: "Biti's Hunter Pride",
        metaDescription: "Giày Thể Thao Nữ Biti's Hunter Pride Month Màu Trắng - Kiểu Dáng Court Sneaker Cổ Thấp"
    };
    await inputTextByLabel('Product Name*', inputData.productName, page);
    await inputTextByLabel('SKU*', inputData.sku, page);
    await inputTextByLabel('Price*', inputData.price, page);
    await selectProductCategory('Women', page);
    await selectDropdownByLabel('Tax Class*', 'Taxable Goods', page);
    await uploadImageByLabel('Media', 'resources/images/Hunter_Pride_Month.jpg', page);
    await selectRadioOptionByLabel('Status*', 'Disabled', page);
    await selectRadioOptionByLabel('Visibility*', 'Not visible individually', page);
    await selectRadioOptionByLabel('Manage Stock*', 'No', page);
    await selectRadioOptionByLabel('Stock Availability*', 'Out of Stock', page);
    await inputTextByLabel('Quantity*', inputData.quantity, page);
    await selectCheckboxByLabel('No shipping required?', 'check', page);
    await inputTextByLabel('URL Key*', inputData.urlKey, page);
    await inputTextByLabel('Meta Title*', inputData.metaTitle, page);
    await inputTextByLabel('Meta Description', inputData.metaDescription, page);
    await selectDropdownByLabel('Attribute group*', 'Default', page);
    await selectDropdownByLabel('Color', 'Black', page);
    await selectDropdownByLabel('Size', 'XL', page);
    await clickButtonByLabel('Save', page);
    await verifyNotification('Product created successfully', page);
    await clickMenuByLabel('Products', page);
    await inputTextById('field-keyword', random.toString(), page);
    await page.keyboard.press('Enter');
    await page.getByText(inputData.productName).click();
    await expect(page.getByText(`Editing ${inputData.productName}`)).toBeVisible();
    expect(await getInputValueByLabel('Product Name*', page)).toBe(inputData.productName);
    expect(await getInputValueByLabel('SKU*', page)).toBe(inputData.sku);
    expect(await getInputValueByLabel('Price*', page)).toBe(inputData.price);
    expect(await getInputValueByLabel('Quantity*', page)).toBe(inputData.quantity);
    expect(await getInputValueByLabel('URL Key*', page)).toBe(inputData.urlKey);
    expect(await getInputValueByLabel('Meta Title*', page)).toBe(inputData.metaTitle);
    expect((await getTextareaValueByLabel('Meta Description', page))?.trim()).toBe(inputData.metaDescription);
});
