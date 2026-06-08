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
    await page.locator("#field-sku").fill("123456");
    await page.locator("#field-price").fill("1000");
    await page.getByRole('button', { name: "Select category" }).click();
    await page.getByPlaceholder('Search categories').fill('Women');
    await page.locator("//h3[normalize-space()='Women']/following::button[1][normalize-space()='Select']").click();
    await page.locator("#field-tax_class").click();
    await page.locator("//div[@role='option' and normalize-space()='Taxable Goods']").click();
    // let descriptionTypeXpath = "//*[local-name()='path' and @d='M0 10a2 2 0 0 1 2-2h44a2 2 0 0 1 2 2v28a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V10Z']";
    // await page.locator(descriptionTypeXpath).click();
    // let descriptionContent = `
    //     Giày Thể Thao Nữ Biti's Hunter Pride Month Màu Trắng - Kiểu Dáng Court Sneaker Cổ Thấp, Chất Liệu Quai Si PU, Đế IP Siêu Nhẹ Cao 3.5cm Tôn Dáng (Mã SP: HSW009303TRG)
    //     Nếu bạn đang tìm kiếm một đôi giày sneaker nữ chính hãng sở hữu phối màu trắng tinh khôi, dễ dàng mix-match với mọi trang phục nhưng vẫn có điểm nhấn độc đáo, mang thông điệp ý nghĩa để tự tin diện đi học, đi làm công sở hằng ngày hay xuống phố dạo chơi thì Biti's Hunter Pride Month Màu Trắng (HSW009303TRG) là sự lựa chọn thực sự lý tưởng. Nằm trong bộ sưu tập đặc biệt mang tính biểu tượng của Biti's Hunter, mẫu giày này dung hòa hoàn hảo giữa phong cách thời trang lifestyle tối giản và trải nghiệm vận động êm ái vượt trội hằng ngày.
    // `;
    // await page.locator("//div[@data-placeholder-active='Type / to see the available blocks']").fill(descriptionContent);
    let uploadFileXpath = "//div[@data-slot = 'card-title' and normalize-space()='Media']/following::input[1][@type='file']";
    await page.locator(uploadFileXpath).setInputFiles(path.join(process.cwd(), 'resources/images/Hunter_Pride_Month.jpg'));
    await page.locator("//div[@role='group' and .//label[normalize-space()='Status*']]//label[normalize-space()='Disabled']/preceding::span[@role='radio'][1]").click();
    await page.locator("//div[@role='group' and .//label[normalize-space()='Visibility*']]//label[normalize-space()='Not visible individually']/preceding::span[@role='radio'][1]").click();
    await page.locator("//div[@role='group' and .//label[normalize-space()='Manage Stock*']]//label[normalize-space()='No']/preceding::span[@role='radio'][1]").click();
    await page.locator("//div[@role='group' and .//label[normalize-space()='Stock Availability*']]//label[normalize-space()='Out of Stock']/preceding::span[@role='radio'][1]").click();
    await page.locator('#field-qty').fill('10');
    await page.locator("//label[normalize-space()='No shipping required?']/preceding::span[@role='checkbox'][1]").click();
    // await page.locator('#field-weight').fill('100');
    await page.locator('#field-url_key').fill('bitis-121212');
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
