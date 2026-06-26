import { expect } from "@playwright/test";
import { NewProductPage } from "../../src/pages/newProductPage";
import { DashboardPage } from "../../src/pages/dashboardPage";
import { adminTest } from "../../src/fixtures/admin-fixture";
import { EditProductPage } from "../../src/pages/editProductPage";
import { ProductsPage } from "../../src/pages/productsPage";
import newProductBody from "../../resources/data/product/new-product-body.json";

let dashboardPage: DashboardPage;
let newProductPage: NewProductPage;
let editProductPage: EditProductPage;
let productsPage: ProductsPage;
let productIds: string[] = [];
let token: string;

adminTest.beforeEach('Before each test', async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    newProductPage = new NewProductPage(page);
    editProductPage = new EditProductPage(page);
    productsPage = new ProductsPage(page);
    token = await editProductPage.getToken();
});

adminTest.afterAll("Teardown", async () => {
    for (let id of productIds) {
        await productsPage.deleteProduct(token, id);
    }
});

adminTest('Verify user can edit an existing product successful', async ({ page }) => {
    await dashboardPage.isOnPage();
    const random = new Date().getTime();
    newProductBody.name = `Test With Me - ${random}`;
    newProductBody.sku = `SKU-${random}`;
    newProductBody.url_key = `url-key-${random}`;
    await newProductPage.newProductByApi(newProductBody, token);
    await newProductPage.clickMenuByLabel('Products');
    await productsPage.isOnPage();
    await productsPage.inputTextById('field-keyword', random.toString());
    await page.keyboard.press('Enter');
    await page.getByText(newProductBody.name).click();
    await expect(page.getByText(`Editing ${newProductBody.name}`)).toBeVisible();
    let productId = editProductPage.getProductId();

    //Verify edit product
    const randomEdit = new Date().getTime();
    const editingData = {
        productName: `Test With Me - ${randomEdit}`,
        sku: `SKU-${randomEdit}`,
        price: '2000'
    };
    await editProductPage.inputTextByLabel('Product Name*', editingData.productName);
    await editProductPage.inputTextByLabel('SKU*', editingData.sku);
    await editProductPage.inputTextByLabel('Price*', editingData.price);
    await editProductPage.clickButtonByLabel('Save');
    await editProductPage.verifyNotification('Product updated successfully');
    await editProductPage.clickMenuByLabel('Products');
    await productsPage.isOnPage();
    await productsPage.inputTextById('field-keyword', randomEdit.toString());
    await page.keyboard.press('Enter');
    await page.getByText(editingData.productName).click();
    await expect(page.getByText(`Editing ${editingData.productName}`)).toBeVisible();
    expect(await editProductPage.getInputValueByLabel('Product Name*')).toBe(editingData.productName);
    expect(await editProductPage.getInputValueByLabel('SKU*')).toBe(editingData.sku);
    expect(await editProductPage.getInputValueByLabel('Price*')).toBe(editingData.price);
    productIds.push(productId);
});

