import { test, expect } from "@playwright/test";
import { adminTest } from "../../src/fixtures/admin-fixture";
import { DashboardPage } from "../../src/pages/dashboardPage";
import { CategoryPage } from "../../src/pages/categoryPage";

let dashboardPage: DashboardPage;
let categoryPage: CategoryPage;

adminTest.beforeEach('Initialize pages', async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    categoryPage = new CategoryPage(page);
});

adminTest('Create new category', async ({ page }) => {
    await dashboardPage.isOnPage();
    
    // Step 2: Click on Categories menu item
    await dashboardPage.clickMenuByLabel('Categories');
    await categoryPage.isOnPage();
    
    // Step 3: Click on "New Category" button
    await categoryPage.clickNewCategory();
    await categoryPage.isOnPage(); // H1 changes to Create a new category
    
    const random = new Date().getTime();
    const categoryName = `Test With Me ${random}`;
    const urlKey = `test-with-me-${random}`;
    const metaTitle = `meta title for testwithme`;
    const metaKeywords = `meta keywords for testwithme`;
    const metaDescription = `meta description for testwithme`;

    // Step 4: Fill in the category name
    await categoryPage.inputTextByLabel('Name', categoryName);
    
    // Step 5: Fill in Url key
    await categoryPage.inputTextByLabel('Url key', urlKey);
    
    // Step 6: Fill in Meta title
    await categoryPage.inputTextByLabel('Meta title', metaTitle);
    
    // Step 7: Fill in Meta keywords
    await categoryPage.inputTextByLabel('Meta keywords', metaKeywords);
    
    // Step 8: Fill in Meta Description
    await categoryPage.inputTextByLabel('Meta description', metaDescription);
    
    // Step 9: Click on "Save" button
    await categoryPage.clickButtonByLabel('Save');
    
    // Verify success
    await categoryPage.verifyCategoryCreated(categoryName);
});
