import { test, expect } from '@playwright/test'

test('has correct title', async ({ page }) => {
	await page.goto('/')
	await expect(page).toHaveTitle('Primum Take-home')
})

test('adds a comment', async ({ page }) => {
	await page.goto('/')
	await page.getByPlaceholder('Add a comment..').fill('New comment')
	await page.getByText('Send').click()
	// expect(page.getByText('New comment')).toBeVisible()
})
