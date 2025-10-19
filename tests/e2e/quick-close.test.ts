import { ChatPage } from '../pages/chat';
import { test, expect } from '../fixtures';

test.describe('Quick Close Button', () => {
  let chatPage: ChatPage;

  test.beforeEach(async ({ page }) => {
    chatPage = new ChatPage(page);
    await chatPage.createNewChat();
  });

  test('Quick Close button navigates to Google', async ({ page, context }) => {
    // Find the Quick Close button by its accessible name
    const quickCloseButton = page.getByRole('button', {
      name: /Quick Close|Quick exit/i,
    });

    // Verify the button is visible
    await expect(quickCloseButton).toBeVisible();

    // Set up a listener for the new page/navigation before clicking
    const navigationPromise = page.waitForURL('https://www.google.com/', {
      timeout: 10000,
    });

    // Click the Quick Close button
    await quickCloseButton.click();

    // Wait for navigation to complete
    await navigationPromise;

    // Verify we've navigated to Google
    expect(page.url()).toContain('google.com');
  });

  test('Quick Close button has correct tooltip', async ({ page }) => {
    // Find the Quick Close button
    const quickCloseButton = page.getByRole('button', {
      name: /Quick Close|Quick exit/i,
    });

    // Hover over the button to show tooltip
    await quickCloseButton.hover();

    // Wait for tooltip to appear and verify its content
    const tooltip = page.getByText('This will navigate you to Google search');
    await expect(tooltip).toBeVisible();
  });
});
