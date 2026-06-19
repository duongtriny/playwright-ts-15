import { expect, test } from "@playwright/test";
import { CommonPage } from "../../src/pages/commonPage";
import { CouponPage } from "../../src/pages/couponPage";
import { LoginPage } from "../../src/pages/loginPage";

let commonPage: CommonPage;
let couponPage: CouponPage;
let loginPage: LoginPage;

test.beforeEach('Before each test', async ({ page }) => {
    commonPage = new CommonPage(page);
    couponPage = new CouponPage(page);
    loginPage = new LoginPage(page);
    await page.goto('http://localhost:3000/admin/login');
});

test('Verify create coupon successful', async ({ page }) => {
    await loginPage.isOnPage();
    await loginPage.adminLogin('test@with.me', '1234567890');
    await expect(page.locator("//h1[text()='Dashboard']")).toBeVisible();
    await commonPage.clickMenuByLabel('New Coupon');
    await couponPage.isOnPage();
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
    await commonPage.inputTextByLabel('Coupon Code*', inputData.couponCode);
    await commonPage.inputTextByLabel('Description*', inputData.description);
    await commonPage.selectRadioOptionByLabel('Status*', 'Disabled');
    await commonPage.inputTextByLabel('Discount amount*', inputData.discountAmount);
    await commonPage.inputDateByLabel('Start date', inputData.startDate);
    await commonPage.inputDateByLabel('End date', inputData.endDate);
    await commonPage.selectCheckboxByLabel('Free shipping?', 'check');
    await couponPage.selectRadioOptionByLabelCoupon('Discount Type', 'Fixed discount to entire order');
    await commonPage.inputTextByLabel('Minimum purchase amount', inputData.minimumAmount);
    await commonPage.inputTextByLabel('Minimum purchase qty', inputData.minimumQuantity);
    await couponPage.selectDropdownByLabelCoupon('Customer groups', 'Default');
    await commonPage.inputTextByLabel("Customer's purchase", inputData.customerPurchase);
    await commonPage.clickButtonByLabel("Save");
    await expect(page.getByText(`Editing ${inputData.couponCode}`)).toBeVisible();
});