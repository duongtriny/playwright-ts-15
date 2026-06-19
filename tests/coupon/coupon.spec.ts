import { expect, test } from "@playwright/test";
import { CommonPage } from "../../src/pages/commonPage";
import { CouponPage } from "../../src/pages/couponPage";
import { LoginPage } from "../../src/pages/loginPage";
import { DashboardPage } from "../../src/pages/dashboardPage";

let couponPage: CouponPage;
let loginPage: LoginPage;
let dashboardPage: DashboardPage;

test.beforeEach('Before each test', async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    couponPage = new CouponPage(page);
    loginPage = new LoginPage(page);
    await page.goto('http://localhost:3000/admin/login');
});

test('Verify create coupon successful', async ({ page }) => {
    await loginPage.isOnPage();
    await loginPage.adminLogin('test@with.me', '1234567890');
    await dashboardPage.isOnPage();
    await dashboardPage.clickMenuByLabel('New Coupon');
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
    await couponPage.inputTextByLabel('Coupon Code*', inputData.couponCode);
    await couponPage.inputTextByLabel('Description*', inputData.description);
    await couponPage.selectRadioOptionByLabel('Status*', 'Disabled');
    await couponPage.inputTextByLabel('Discount amount*', inputData.discountAmount);
    await couponPage.inputDateByLabel('Start date', inputData.startDate);
    await couponPage.inputDateByLabel('End date', inputData.endDate);
    await couponPage.selectCheckboxByLabel('Free shipping?', 'check');
    await couponPage.selectRadioOptionByLabelCoupon('Discount Type', 'Fixed discount to entire order');
    await couponPage.inputTextByLabel('Minimum purchase amount', inputData.minimumAmount);
    await couponPage.inputTextByLabel('Minimum purchase qty', inputData.minimumQuantity);
    await couponPage.selectDropdownByLabelCoupon('Customer groups', 'Default');
    await couponPage.inputTextByLabel("Customer's purchase", inputData.customerPurchase);
    await couponPage.clickButtonByLabel("Save");
    await expect(page.getByText(`Editing ${inputData.couponCode}`)).toBeVisible();
});