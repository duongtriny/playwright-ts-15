import { test, expect, Page } from '@playwright/test';

test("Verify select option cascader", async ({ page }) => {
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

test("Verify select option in cascader with multiple choices", async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/cascader');
    let inputs = [
        {
            path: 'Light',
            children: ['Number 1', 'Number 2']
        },
        {
            path: 'Bamboo->Little',
            children: ['Toy Cards', 'Toy Bird']
        }
    ]
    await selectCascaderMultiItemByLabel('Cascader multiple values', inputs, page);
    await expect(page.getByText("Current value: light, 1light, 2bamboo, little, cardsbamboo, little, bird")).toBeVisible();
});

async function selectCascaderMultiItemByLabel(label: string, inputs: any, page: Page) {
    let dropdownXpath = `(//span[contains(concat(' ', @class, ' '), 'ant-divider-inner-text ') and normalize-space()='${label}']/following::input)[1]`;
    await page.locator(dropdownXpath).click();
    for (let input of inputs) {
        if (input.path) {
            let pathItems = input.path.split('->');
            for (let pathItem of pathItems) {
                let pathItemXpath = `//li[@role='menuitemcheckbox' and normalize-space()='${pathItem}']`;
                await page.locator(pathItemXpath).click();
            }
        }

        for (let child of input.children) {
            let childItemXpath = `//li[@role='menuitemcheckbox' and normalize-space()='${child}']`;
            let childItemLocator = page.locator(childItemXpath);
            await childItemLocator.locator('.ant-cascader-checkbox').click()
        }
    }
    await page.keyboard.press('Tab');
}