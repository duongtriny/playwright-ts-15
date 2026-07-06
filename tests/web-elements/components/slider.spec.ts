import { test, expect, Page } from '@playwright/test';

test("Verify select value on slider", async ({ page }) => {
    await page.goto('https://test-with-me-app.vercel.app/learning/web-elements/components/slider');
    await slideToValueOnSliderByLabel(100, 'Slider', page);
    await expect(page.getByText('Current Value: 100')).toBeVisible();
});

async function slideToValueOnSliderByLabel(input: number, label: string, page: Page) {
    let sliderXpath = `//span[contains(concat(' ', @class, ' '), 'ant-divider-inner-text') and normalize-space()='${label}']/following::div[contains(concat(' ', @class, ' '), 'ant-slider-rail')]`;
    let sliderLocator = page.locator(sliderXpath);
    let sliderBox = await sliderLocator.boundingBox();
    let x = sliderBox?.x ?? 0;
    let y = sliderBox?.y ?? 0;
    let width = sliderBox?.width ?? 0;
    let height = sliderBox?.height ?? 0;
    let beClickedX = x + width / 100 * input;
    if (input == 100) {
        beClickedX -= 2;
    }
    let beClickedY = y + height / 2;
    await page.mouse.click(beClickedX, beClickedY);
}