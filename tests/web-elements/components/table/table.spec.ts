import { test, expect, Page } from '@playwright/test';
import { expectedTableData } from './table-test-data';

test("Verify select option in auto complete", async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/table');
    let tableData = await getTableDataByLabel('Table', ['Name', 'Address', 'Age', 'Tags'], page);
    expect(sortJson(tableData)).toMatchObject(sortJson(expectedTableData));
});

async function getTableDataByLabel(label: string, expectedFields: string[], page: Page) {
    let tableXpath = `//span[contains(concat(' ', @class, ' '), 'ant-divider-inner-text') and normalize-space()='${label}']/following::table[1]`;
    let tableLocator = page.locator(tableXpath);
    await page.waitForTimeout(1000);
    let headers = await tableLocator.locator("//th").allTextContents();
    let headerObject: any = {};
    for (let i = 0; i < headers.length; i++) {
        headerObject[`${headers[i]}`] = i;
    }
    let nextButton = page.locator('.ant-pagination-item-link .anticon-right');
    let isNext = true;
    let data = [];
    do {
        let rows = await tableLocator.locator("//tbody//tr").all();
        for (let row of rows) {
            let obj: any = {};
            for (let fieldName of expectedFields) {
                if (fieldName == 'Tags') {
                    let tags = await row.locator(`//td[${headerObject[fieldName] + 1}]//span[contains(concat(' ', @class,' '), ' ant-tag ')]`).allTextContents();
                    obj['Tags'] = tags;
                } else {
                    let cellValue = await row.locator(`//td[${headerObject[fieldName] + 1}]`).textContent();
                    obj[fieldName] = cellValue;
                }
            }
            data.push(obj);
        }
        let currentStatus = await nextButton.isDisabled();
        isNext = !currentStatus;
        if (isNext) {
            await nextButton.click();
        }
    } while (isNext);
    return data;
}

function sortJson(value: any): any {
    // Array → sort values
    if (Array.isArray(value)) {
        return value
            .map(sortJson)
            .sort((a, b) => {
                return JSON.stringify(a).localeCompare(JSON.stringify(b));
            });
    }

    // Object → sort keys
    if (value !== null && typeof value === "object") {
        const sorted: { [key: string]: any } = {};
        Object.keys(value)
            .sort()
            .forEach(key => {
                sorted[key] = sortJson(value[key]);
            });
        return sorted;
    }

    return value;
}
