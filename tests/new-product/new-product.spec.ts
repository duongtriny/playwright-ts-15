import { expect, test } from "@playwright/test";
import path from "path";

test.beforeEach('Before each test', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/login');
});

test('Verify user can create a new product successful', async ({ page }) => {
    //Login
    let signInButton = page.getByRole('button', { name: 'SIGN IN' });
    await expect(signInButton).toBeVisible();
    await page.locator('#field-email').fill('test@with.me');
    await page.locator('#field-password').fill('1234567890');
    await signInButton.click();
    await expect(page.locator("//h1[text()='Dashboard']")).toBeVisible();
    //Create new product
    await page.getByRole("link", { name: "New Product" }).click();
    await expect(page.locator("//h1[text()='Create a new product']")).toBeVisible();
    await page.locator("#field-name").fill("Test With Me");
    const random = new Date().getTime();
    await page.locator("#field-sku").fill(`SKU-${random}`);
    await page.locator("#field-price").fill("1000");
    await page.getByRole('button', { name: "Select category" }).click();
    await page.getByPlaceholder('Search categories').fill('Women');
    await page.locator("//h3[normalize-space()='Women']/following::button[1][normalize-space()='Select']").click();
    await page.locator("#field-tax_class").click();
    await page.locator("//div[@role='option' and normalize-space()='Taxable Goods']").click();
    let uploadFileXpath = "//div[@data-slot = 'card-title' and normalize-space()='Media']/following::input[1][@type='file']";
    await page.locator(uploadFileXpath).setInputFiles(path.join(process.cwd(), 'resources/images/Hunter_Pride_Month.jpg'));
    await page.locator("//div[@role='group' and .//label[normalize-space()='Status*']]//label[normalize-space()='Disabled']/preceding::span[@role='radio'][1]").click();
    await page.locator("//div[@role='group' and .//label[normalize-space()='Visibility*']]//label[normalize-space()='Not visible individually']/preceding::span[@role='radio'][1]").click();
    await page.locator("//div[@role='group' and .//label[normalize-space()='Manage Stock*']]//label[normalize-space()='No']/preceding::span[@role='radio'][1]").click();
    await page.locator("//div[@role='group' and .//label[normalize-space()='Stock Availability*']]//label[normalize-space()='Out of Stock']/preceding::span[@role='radio'][1]").click();
    await page.locator('#field-qty').fill('10');
    await page.locator("//label[normalize-space()='No shipping required?']/preceding::span[@role='checkbox'][1]").click();
    // await page.locator('#field-weight').fill('100');
    await page.locator('#field-url_key').fill(`url-key-${random}`);
    await page.locator('#field-meta_title').fill("Biti's Hunter Pride");
    await page.locator('#field-meta_description').fill("Giày Thể Thao Nữ Biti's Hunter Pride Month Màu Trắng - Kiểu Dáng Court Sneaker Cổ Thấp");

    await page.locator("#field-group_id").click();
    await page.locator("//div[@role='option' and normalize-space()='Default']").click();

    await page.locator("//span[normalize-space()='Color']/following::button[@role='combobox'][1]").click();
    await page.locator("//div[@role='option' and normalize-space()='Black']").click();

    await page.locator("//span[normalize-space()='Size']/following::button[@role='combobox'][1]").click();
    await page.locator("//div[@role='option' and normalize-space()='XL']").click();
    await page.locator("//button[normalize-space()='Save']").click();
    await expect(page.locator("//div[@role='alert' and normalize-space()='Product created successfully']")).toBeVisible();
});
