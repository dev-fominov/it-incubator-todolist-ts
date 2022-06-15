describe('App', ()=> {
	it('base example', async () => {
		await page.goto('http://localhost:6006/iframe.html?id=app--task-base-example&viewMode=story');
		const image = await page.screenshot();

		expect(image).toMatchImageSnapshot();
	})
})