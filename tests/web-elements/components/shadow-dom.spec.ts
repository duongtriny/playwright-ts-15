import { test, expect, Page } from '@playwright/test';

test("Verify windows with new tab", async ({ page, context }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/shadow-dom');
    await page.getByLabel('Name:', { exact: true }).fill('Test With Me');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('What you just type: Test With Me')).toBeVisible();
});