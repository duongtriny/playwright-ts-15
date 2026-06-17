import { expect, Page } from "@playwright/test";
import path from "node:path";

export async function inputTextByLabel(label: string, value: string, page: Page) {
    let xpath1 = `//label[normalize-space()="${label}"]/following::input[1]`;
    let xpath2 = `//label[normalize-space()="${label}"]/following::textarea[1]`;
    let locator = page.locator(`(${xpath1} | ${xpath2})[1]`);
    await locator.click();
    await locator.clear();
    await locator.fill(value);
}
export async function inputDateByLabel(label: string, value: string, page: Page) {
    let xpath1 = `//label[normalize-space()="${label}"]/following::input[1]`;
    let xpath2 = `//label[normalize-space()="${label}"]/following::textarea[1]`;
    let locator = page.locator(`(${xpath1} | ${xpath2})[1]`);
    await locator.click();
    await page.keyboard.type(value);
}

export async function clickButtonByLabel(label: string, page: Page) {
    let xpath = `//button[normalize-space()='${label}']`;
    await page.locator(xpath).click();
}

export async function clickMenuByLabel(label: string, page: Page) {
    let xpath = `//div[contains(concat(' ',@class, ' '), ' admin-nav ')]//a[normalize-space()='${label}']`;
    await page.locator(xpath).click();
}

export async function selectProductCategory(value: string, page: Page) {
    await clickButtonByLabel('Select category', page);
    await page.getByPlaceholder('Search categories').fill(value);
    await page.locator(`//h3[normalize-space()='${value}']/following::button[1][normalize-space()='Select']`).click();
}

export async function selectDropdownByLabel(label: string, value: string, page: Page) {
    let xpath1 = `//label[normalize-space()='${label}']/following::button[1]`;
    let xpath2 = `//td[normalize-space()='${label}']/following::button[1]`;
    let dropdownXpath = `(${xpath1} | ${xpath2})[1]`;
    await page.locator(dropdownXpath).click();
    let itemXpath = `//div[@role='option' and normalize-space()='${value}']`;
    await page.locator(itemXpath).click();
}

export async function uploadImageByLabel(label: string, filePath: string, page: Page) {
    let uploadFileXpath = `//div[@data-slot = 'card-title' and normalize-space()='${label}']/following::input[1][@type='file']`;
    await page.locator(uploadFileXpath).setInputFiles(path.join(process.cwd(), filePath));
}

export async function selectRadioOptionByLabel(label: string, option: string, page: Page) {
    let xpath = `//div[@role='group' and .//label[normalize-space()='${label}']]//label[normalize-space()='${option}']/preceding::span[@role='radio'][1]`;
    await page.locator(xpath).click();
}

export async function verifyNotification(message: string, page: Page) {
    await expect(page.locator(`//div[@role='alert' and normalize-space()='${message}']`)).toBeVisible();
}

export async function selectCheckboxByLabel(label: string, isCheck: 'check' | 'uncheck', page: Page) {
    let xpath = `//label[normalize-space()='${label}']/preceding::span[@role='checkbox'][1]`;
    //get current value
    let currentValue = await page.locator(xpath).getAttribute('aria-checked');
    if ((isCheck == 'check' && currentValue == 'false') || (isCheck == 'uncheck' && currentValue == 'true')) {
        await page.locator(xpath).click();
    }
}

export async function inputTextById(id: string, value: string, page: Page) {
    let selector = `#${id}`;
    let locator = page.locator(selector);
    await locator.click();
    await locator.clear();
    await locator.fill(value);
}

export async function getInputValueByLabel(label: string, page: Page) {
    let xpath1 = `//label[normalize-space()='${label}']/following::input[1]`;
    let xpath2 = `//label[normalize-space()='${label}']/following::textarea[1]`;
    let locator = page.locator(`(${xpath1} | ${xpath2})[1]`);
    return await locator.getAttribute('value');
}

export async function getTextareaValueByLabel(label: string, page: Page) {
    let xpath1 = `//label[normalize-space()='${label}']/following::input[1]`;
    let xpath2 = `//label[normalize-space()='${label}']/following::textarea[1]`;
    let locator = page.locator(`(${xpath1} | ${xpath2})[1]`);
    return await locator.textContent();
}