import { test, expect, Page } from '@playwright/test';

test("Verify select option in auto complete", async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/cascader');
    await selectCascaderItemByLabel('Cascader', ['Test', 'With', 'You'], page);
    await expect(page.getByText('Current value: Test, With, You')).toBeVisible();
});

async function selectCascaderItemByLabel(label: string, options: string[], page: Page) {
    let dropdownXpath = `(//span[contains(concat(' ', @class, ' '), 'ant-divider-inner-text ') and normalize-space()='${label}']/following::input)[1]`;
    await page.locator(dropdownXpath).click();
    for (let option of options) {
        let optionXpath = `//li[@role='menuitemcheckbox' and normalize-space()='${option}']`;
        await page.locator(optionXpath).click();
    }
}