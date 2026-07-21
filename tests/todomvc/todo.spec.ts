import { test, expect } from "@playwright/test";
import { TodoPage } from "../../src/pages/todoPage";

let todoPage: TodoPage;

test.beforeEach('Navigate to TodoMVC', async ({ page }) => {
    todoPage = new TodoPage(page);
    await page.goto('https://demo.playwright.dev/todomvc');
});

test('Verify user can add multiple todo items', async ({ page }) => {
    await todoPage.isOnPage();
    
    await todoPage.addTodoItem('Buy groceries');
    await todoPage.verifyTodoItemAdded('Buy groceries');
    
    await todoPage.addTodoItem('Walk the dog');
    await todoPage.verifyTodoItemAdded('Walk the dog');
    
    await todoPage.addTodoItem('Learn Playwright');
    await todoPage.verifyTodoItemAdded('Learn Playwright');
});
