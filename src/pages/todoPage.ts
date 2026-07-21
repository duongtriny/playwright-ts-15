import { expect, Page } from "@playwright/test";
import { CommonPage } from "./commonPage";
import { CommonBehavior } from "./commonInterface";
import * as allure from "allure-js-commons";

export class TodoPage extends CommonPage implements CommonBehavior {
    constructor(page: Page) {
        super(page);
    }

    async isOnPage() {
        await allure.step("It should be on TodoMVC page", async () => {
            await expect(this.page.locator("//h1[normalize-space()='todos']")).toBeVisible();
        });
    }

    async addTodoItem(text: string) {
        await allure.step(`Add todo item "${text}"`, async () => {
            // Using placeholder as the anchor because it's the visible text label for the input
            const inputXpath = "//input[@placeholder='What needs to be done?']";
            const locator = this.page.locator(inputXpath);
            await locator.fill(text);
            await locator.press('Enter');
        });
    }

    async verifyTodoItemAdded(text: string) {
        await allure.step(`Verify todo item "${text}" is added`, async () => {
            // Using label text as anchor following the project rules
            const itemXpath = `//ul[contains(concat(' ', @class, ' '), ' todo-list ')]//label[normalize-space()="${text}"]`;
            await expect(this.page.locator(itemXpath)).toBeVisible();
        });
    }
}
