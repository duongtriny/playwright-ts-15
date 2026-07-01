import { expect, Page } from "@playwright/test";
import path from "node:path";
import { CommonBehavior } from "./commonInterface";
import * as allure from "allure-js-commons";

export class CommonPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async inputTextByLabel(label: string, value: string) {
        await allure.step(`Input value "${value}" into field "${label}"`, async () => {
            let xpath1 = `//label[normalize-space()="${label}"]/following::input[1]`;
            let xpath2 = `//label[normalize-space()="${label}"]/following::textarea[1]`;
            let locator = this.page.locator(`(${xpath1} | ${xpath2})[1]`);
            await locator.click();
            await locator.clear();
            await locator.fill(value);
        });
    }
    async inputDateByLabel(label: string, value: string) {
        await allure.step(`Input date "${value}" into field "${label}"`, async () => {
            let xpath1 = `//label[normalize-space()="${label}"]/following::input[1]`;
            let xpath2 = `//label[normalize-space()="${label}"]/following::textarea[1]`;
            let locator = this.page.locator(`(${xpath1} | ${xpath2})[1]`);
            await locator.click();
            await this.page.keyboard.type(value);
        });
    }

    async clickButtonByLabel(label: string) {
        await allure.step(`Click button "${label}"`, async () => {
            let xpath = `//button[normalize-space()='${label}']`;
            await this.page.locator(xpath).click();
        });
    }

    async clickMenuByLabel(label: string) {
        await allure.step(`Select menu item "${label}"`, async () => {
            let xpath = `//div[contains(concat(' ',@class, ' '), ' admin-nav ')]//a[normalize-space()='${label}']`;
            await this.page.locator(xpath).click();
        });
    }

    async selectDropdownByLabel(label: string, value: string) {
        await allure.step(`Select option "${value}" in dropdown "${label}"`, async () => {
            let xpath1 = `//label[normalize-space()='${label}']/following::button[1]`;
            let xpath2 = `//td[normalize-space()='${label}']/following::button[1]`;
            let dropdownXpath = `(${xpath1} | ${xpath2})[1]`;
            await this.page.locator(dropdownXpath).click();
            let itemXpath = `//div[@role='option' and normalize-space()='${value}']`;
            await this.page.locator(itemXpath).click();
        });

    }

    async uploadImageByLabel(label: string, filePath: string) {
        await allure.step(`Upload image from file "${filePath}" to field "${label}"`, async () => {
            let uploadFileXpath = `//div[@data-slot = 'card-title' and normalize-space()='${label}']/following::input[1][@type='file']`;
            await this.page.locator(uploadFileXpath).setInputFiles(path.join(process.cwd(), filePath));
        });

    }

    async selectRadioOptionByLabel(label: string, option: string) {
        await allure.step(`Select option "${option}" in radio group "${label}"`, async () => {
            let xpath = `//div[@role='group' and .//label[normalize-space()='${label}']]//label[normalize-space()='${option}']/preceding::span[@role='radio'][1]`;
            await this.page.locator(xpath).click();
        });
    }

    async verifyNotification(message: string) {
        await allure.step(`Notification message should be "${message}"`, async () => {
            await expect(this.page.locator(`//div[@role='alert' and normalize-space()='${message}']`)).toBeVisible();
        });
    }

    async selectCheckboxByLabel(label: string, isCheck: 'check' | 'uncheck') {
        await allure.step(`${isCheck} checkbox "${label}"`, async () => {
            let xpath = `//label[normalize-space()='${label}']/preceding::span[@role='checkbox'][1]`;
            //get current value
            let currentValue = await this.page.locator(xpath).getAttribute('aria-checked');
            if ((isCheck == 'check' && currentValue == 'false') || (isCheck == 'uncheck' && currentValue == 'true')) {
                await this.page.locator(xpath).click();
            }
        });
    }

    async inputTextById(id: string, value: string) {
        await allure.step(`Input value "${value}" into field has id "${id}"`, async () => {
            let selector = `#${id}`;
            let locator = this.page.locator(selector);
            await locator.click();
            await locator.clear();
            await locator.fill(value);
        });
    }

    async getInputValueByLabel(label: string) {
        let xpath1 = `//label[normalize-space()='${label}']/following::input[1]`;
        let xpath2 = `//label[normalize-space()='${label}']/following::textarea[1]`;
        let locator = this.page.locator(`(${xpath1} | ${xpath2})[1]`);
        return await locator.getAttribute('value');
    }

    async getTextareaValueByLabel(label: string) {
        let xpath1 = `//label[normalize-space()='${label}']/following::input[1]`;
        let xpath2 = `//label[normalize-space()='${label}']/following::textarea[1]`;
        let locator = this.page.locator(`(${xpath1} | ${xpath2})[1]`);
        return await locator.textContent();
    }

    async getToken() {
        let cookies = await this.page.context().cookies();
        let asidObj = cookies.find(c => c.name == 'asid');
        let sidObj = cookies.find(c => c.name == 'sid');
        let cookiesString = `sid=${sidObj?.value};asid=${asidObj?.value}`;
        return cookiesString;
    }

}