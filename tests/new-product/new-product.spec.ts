import { expect } from "@playwright/test";
import { NewProductPage } from "../../src/pages/newProductPage";
import { DashboardPage } from "../../src/pages/dashboardPage";
import { adminTest } from "../../src/fixtures/admin-fixture";

let dashboardPage: DashboardPage;
let newProductPage: NewProductPage;

adminTest.beforeEach('Before each test', async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    newProductPage = new NewProductPage(page);
});

adminTest('Verify user can create a new product successful', async ({ page }) => {
    await dashboardPage.isOnPage();
    await dashboardPage.clickMenuByLabel('New Product');
    await newProductPage.isOnPage();
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
    await newProductPage.inputTextByLabel('Product Name*', inputData.productName);
    await newProductPage.inputTextByLabel('SKU*', inputData.sku);
    await newProductPage.inputTextByLabel('Price*', inputData.price);
    await newProductPage.selectProductCategory('Women');
    await newProductPage.selectDropdownByLabel('Tax Class*', 'Taxable Goods');
    await newProductPage.uploadImageByLabel('Media', 'resources/images/Hunter_Pride_Month.jpg');
    await newProductPage.selectRadioOptionByLabel('Status*', 'Disabled');
    await newProductPage.selectRadioOptionByLabel('Visibility*', 'Not visible individually');
    await newProductPage.selectRadioOptionByLabel('Manage Stock*', 'No');
    await newProductPage.selectRadioOptionByLabel('Stock Availability*', 'Out of Stock');
    await newProductPage.inputTextByLabel('Quantity*', inputData.quantity);
    await newProductPage.selectCheckboxByLabel('No shipping required?', 'check');
    await newProductPage.inputTextByLabel('URL Key*', inputData.urlKey);
    await newProductPage.inputTextByLabel('Meta Title*', inputData.metaTitle);
    await newProductPage.inputTextByLabel('Meta Description', inputData.metaDescription);
    await newProductPage.selectDropdownByLabel('Attribute group*', 'Default');
    await newProductPage.selectDropdownByLabel('Color', 'Black');
    await newProductPage.selectDropdownByLabel('Size', 'XL');
    await newProductPage.clickButtonByLabel('Save');
    await newProductPage.verifyNotification('Product created successfully');
    await newProductPage.clickMenuByLabel('Products');
    await newProductPage.inputTextById('field-keyword', random.toString());
    await page.keyboard.press('Enter');
    await page.getByText(inputData.productName).click();
    await expect(page.getByText(`Editing ${inputData.productName}`)).toBeVisible();
    expect(await newProductPage.getInputValueByLabel('Product Name*')).toBe(inputData.productName);
    expect(await newProductPage.getInputValueByLabel('SKU*')).toBe(inputData.sku);
    expect(await newProductPage.getInputValueByLabel('Price*')).toBe(inputData.price);
    expect(await newProductPage.getInputValueByLabel('Quantity*')).toBe(inputData.quantity);
    expect(await newProductPage.getInputValueByLabel('URL Key*')).toBe(inputData.urlKey);
    expect(await newProductPage.getInputValueByLabel('Meta Title*')).toBe(inputData.metaTitle);
    expect((await newProductPage.getTextareaValueByLabel('Meta Description'))?.trim()).toBe(inputData.metaDescription);
});
