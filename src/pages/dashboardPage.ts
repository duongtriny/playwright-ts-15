import { expect, Page } from "@playwright/test";
import { CommonPage } from "./commonPage";
import { CommonBehavior } from "./commonInterface";
import * as allure from "allure-js-commons";

export class DashboardPage extends CommonPage implements CommonBehavior {
    constructor(page: Page) {
        super(page);
    }

    async isOnPage() {
        await allure.step("It should be on Dashboard page", async () => {
            await expect(this.page.locator("//h1[text()='Dashboard']")).toBeVisible();
        })
    }
}