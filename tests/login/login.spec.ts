import { expect, test } from "@playwright/test";

test.beforeEach('Before each test', async ({ page }) => {
    await page.goto('http://localhost:3000/admin/login');
});

test('Verify login successful', async ({ page }) => {
    let signInButton = page.getByRole('button', { name: 'SIGN IN' });
    await expect(signInButton).toBeVisible();
    await page.locator('#field-email').fill('test@with.me');
    await page.locator('#field-password').fill('1234567890');
    await signInButton.click();
    //First case: Must use xpath with class
    await expect(page.locator("//h1[contains(concat(' ', @class, ' '), ' page-heading-title ')]")).toHaveText('Dashboard');
    //Second case: Xpath with text
    await expect(page.locator("//h1[text()='Dashboard']")).toBeVisible();
});

test('Verify form empty', async ({ page }) => {
    let signInButton = page.getByRole('button', { name: 'SIGN IN' });
    await expect(signInButton).toBeVisible();
    await signInButton.click();
    await expect.soft(page.locator("//div[text()='Email is required']")).toBeVisible();
    await expect.soft(page.locator("//div[text()='Password is required']")).toBeVisible();
});