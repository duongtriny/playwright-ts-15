import { expect, test } from "@playwright/test";
import { CommonPage } from "../../src/pages/commonPage";
import { NewProductPage } from "../../src/pages/newProductPage";
import { LoginPage } from "../../src/pages/loginPage";

let commonPage: CommonPage;
let newProductPage: NewProductPage;
let loginPage: LoginPage;

test.beforeEach('Before each test', async ({ page }) => {
    commonPage = new CommonPage(page);
    newProductPage = new NewProductPage(page);
    loginPage = new LoginPage(page);
    await page.goto('http://localhost:3000/admin/login');
});

test('Verify user can create a new product successful', async ({ page }) => {
    await loginPage.isOnPage();
    await loginPage.adminLogin('test@with.me', '1234567890');
    await expect(page.locator("//h1[text()='Dashboard']")).toBeVisible();
    await commonPage.clickMenuByLabel('New Product');
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
    await commonPage.inputTextByLabel('Product Name*', inputData.productName);
    await commonPage.inputTextByLabel('SKU*', inputData.sku);
    await commonPage.inputTextByLabel('Price*', inputData.price);
    await newProductPage.selectProductCategory('Women');
    await commonPage.selectDropdownByLabel('Tax Class*', 'Taxable Goods');
    await commonPage.uploadImageByLabel('Media', 'resources/images/Hunter_Pride_Month.jpg');
    await commonPage.selectRadioOptionByLabel('Status*', 'Disabled');
    await commonPage.selectRadioOptionByLabel('Visibility*', 'Not visible individually');
    await commonPage.selectRadioOptionByLabel('Manage Stock*', 'No');
    await commonPage.selectRadioOptionByLabel('Stock Availability*', 'Out of Stock');
    await commonPage.inputTextByLabel('Quantity*', inputData.quantity);
    await commonPage.selectCheckboxByLabel('No shipping required?', 'check');
    await commonPage.inputTextByLabel('URL Key*', inputData.urlKey);
    await commonPage.inputTextByLabel('Meta Title*', inputData.metaTitle);
    await commonPage.inputTextByLabel('Meta Description', inputData.metaDescription);
    await commonPage.selectDropdownByLabel('Attribute group*', 'Default');
    await commonPage.selectDropdownByLabel('Color', 'Black');
    await commonPage.selectDropdownByLabel('Size', 'XL');
    await commonPage.clickButtonByLabel('Save');
    await commonPage.verifyNotification('Product created successfully');
    await commonPage.clickMenuByLabel('Products');
    await commonPage.inputTextById('field-keyword', random.toString());
    await page.keyboard.press('Enter');
    await page.getByText(inputData.productName).click();
    await expect(page.getByText(`Editing ${inputData.productName}`)).toBeVisible();
    expect(await commonPage.getInputValueByLabel('Product Name*')).toBe(inputData.productName);
    expect(await commonPage.getInputValueByLabel('SKU*')).toBe(inputData.sku);
    expect(await commonPage.getInputValueByLabel('Price*')).toBe(inputData.price);
    expect(await commonPage.getInputValueByLabel('Quantity*')).toBe(inputData.quantity);
    expect(await commonPage.getInputValueByLabel('URL Key*')).toBe(inputData.urlKey);
    expect(await commonPage.getInputValueByLabel('Meta Title*')).toBe(inputData.metaTitle);
    expect((await commonPage.getTextareaValueByLabel('Meta Description'))?.trim()).toBe(inputData.metaDescription);
});
