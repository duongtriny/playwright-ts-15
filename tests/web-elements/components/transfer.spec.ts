import { test, expect, Page } from '@playwright/test';

test("Verify transfer", async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/transfer');
    //Move from Source to Target
    let inputs = ['Apple', 'Banana'];
    await transferDataByLabel('Transfer', inputs, 'right', page);
    let currentSourceItems = await getPanelDataByLabel('Transfer', 'Source', page);
    let currentTargetItems = await getPanelDataByLabel('Transfer', 'Target', page);
    expect(isSubArray(currentSourceItems, inputs)).toBeFalsy();
    expect(isSubArray(currentTargetItems, inputs)).toBeTruthy();

    //Move from Target to Source
    inputs = ['Orange', 'Pineapple'];
    await transferDataByLabel('Transfer', inputs, 'left', page);
    currentSourceItems = await getPanelDataByLabel('Transfer', 'Source', page);
    currentTargetItems = await getPanelDataByLabel('Transfer', 'Target', page);
    expect(isSubArray(currentSourceItems, inputs)).toBeTruthy();
    expect(isSubArray(currentTargetItems, inputs)).toBeFalsy();
});

async function transferDataByLabel(label: string, inputs: string[], direction: 'left' | 'right', page: Page) {
    let currentPanel = direction == 'right' ? 'Source' : 'Target';
    let transferXpath = `//span[contains(concat(' ', @class, ' '), 'ant-divider-inner-text') and normalize-space()='${label}']/following::div[contains(concat(' ', @class, ' '), ' ant-transfer ')]`;
    let transferLocator = page.locator(transferXpath);
    let panelXpath = `//div[contains(concat(' ', @class, ' '),  ' ant-transfer-section ') and .//span[contains(concat(' ', @class, ' '),  ' ant-transfer-list-header-title ') and normalize-space()='${currentPanel}']] `;
    let panelLocator = transferLocator.locator(panelXpath);
    for (let input of inputs) {
        let itemXpath = `(//span[contains(concat(' ', @class, ' '),  ' ant-transfer-list-content-item-text ') and normalize-space()='${input}']/preceding::input)[last()]`;
        await panelLocator.locator(itemXpath).click();
    }
    let moveToTargetCss = `//button[.//span[@aria-label='${direction}']]`;
    await transferLocator.locator(moveToTargetCss).click();
}

async function getPanelDataByLabel(transferLabel: string, panelLabel: 'Source' | 'Target', page: Page) {
    let transferXpath = `//span[contains(concat(' ', @class, ' '), 'ant-divider-inner-text') and normalize-space()='${transferLabel}']/following::div[contains(concat(' ', @class, ' '), ' ant-transfer ')]`;
    let transferLocator = page.locator(transferXpath);
    let panelXpath = `//div[contains(concat(' ', @class, ' '),  ' ant-transfer-section ') and .//span[contains(concat(' ', @class, ' '),  ' ant-transfer-list-header-title ') and normalize-space()='${panelLabel}']] `;
    let panelLocator = transferLocator.locator(panelXpath);
    let items = await panelLocator.locator('li.ant-transfer-list-content-item').allTextContents();
    return items;
}

function isSubArray(parent: string[], subArray: string[]) {
    let item = subArray.find(item => !parent.includes(item));
    return item == undefined;
}