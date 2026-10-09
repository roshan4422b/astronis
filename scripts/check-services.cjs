const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(process.env.SERVICES_BASE_URL || 'http://localhost:3000/services', { waitUntil: 'networkidle', timeout: 120000 });
    fs.mkdirSync('artifacts/services', { recursive: true });
    const cards = page.locator('article[class*=card]');
    const serviceLinks = await cards.locator('a').evaluateAll(links => links.map(link => link.href));
    assert.equal(serviceLinks.length, 21);
    for (const width of [1920, 1440, 1280, 1024, 768, 430, 390, 360]) {
      await page.setViewportSize({ width, height: 950 });
      const result = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth, h1: document.querySelectorAll('h1').length, columns: getComputedStyle(document.querySelector('[class*=grid]')).gridTemplateColumns.split(' ').length }));
      assert.equal(result.overflow, false, `Horizontal overflow at ${width}`);
      assert.equal(result.h1, 1);
      assert.equal(await cards.count(), 21);
      assert.equal(result.columns, width >= 1024 ? 3 : width >= 640 ? 2 : 1);
      await page.screenshot({ path: `artifacts/services/${width}.png`, fullPage: width === 390 });
      console.log('Responsive PASS', width, result);
    }
    assert.equal(await page.getByText('THE VALUE OF CONNECTION', { exact: true }).count(), 0);
    assert.equal(await cards.locator('li').count(), 0);
    await page.locator('#hub-service-search').fill('DPDP');
    assert.equal(await cards.count(), 1);
    await page.locator('#hub-service-search').fill('M&A');
    await page.getByRole('button', {name:'Transactions', exact:true}).click();
    assert(await cards.filter({hasText:'Corporate & Commercial Advisory'}).count());
    await page.locator('#hub-service-search').fill('zzzzzz');
    assert.equal(await page.getByText('No matching practices').count(), 1);
    await page.getByRole('button', {name:'Clear filters'}).click();
    assert.equal(await cards.count(), 21);
    await page.locator('#service-select').selectOption({label:'Corporate & Commercial Advisory'});
    await page.locator('#service-requirement').selectOption({label:'Entity Formation & Business Setup'});
    assert.equal(await page.locator('#service-detail option').count(), 13);
    await page.locator('#service-detail').selectOption({label:'LLP Formation'});
    await page.locator('#service-select').selectOption({label:'Intellectual Property Rights'});
    assert.equal(await page.locator('#service-requirement').inputValue(), '');
    assert.equal(await page.locator('#service-detail').count(), 0);
    await page.locator('#service-requirement').selectOption({label:'Trademark'});
    await page.locator('#service-detail').selectOption({label:'Trademark Search'});
    let payload;
    await page.route('**/api/enquiry', async route => {
      payload = route.request().postDataJSON();
      await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({success:true})});
    });
    await page.locator('#service-full-name').fill('Service Form Test');
    await page.locator('#service-business-email').fill('test@example.com');
    await page.locator('#service-phone').fill('+919876543210');
    await page.locator('#service-requirement-description').fill('Browser validation of selected service hierarchy.');
    await page.locator('#service-consent').check();
    await page.getByRole('button',{name:'Discuss My Requirement',exact:true}).click();
    await page.getByText('Thank you for contacting Astronis Global.', {exact:false}).waitFor();
    assert.equal(payload.service, 'Intellectual Property Rights');
    assert.equal(payload.requirement, 'Trademark');
    assert.equal(payload.detailAnswer, 'Trademark Search');
    // Read-only requests: verify every main service destination and article link.
    const hrefs = [...new Set([...serviceLinks, ...await page.locator('main a[href^="/insights/"]').evaluateAll(links => links.map(link => link.href))])];
    for (const href of hrefs) {
      const response = await page.request.get(href);
      assert.equal(response.status(), 200, href);
    }
    await page.setViewportSize({width:1440,height:950});
    await page.locator('#all-services').scrollIntoViewIfNeeded();
    await page.screenshot({path:'artifacts/services/directory.png'});
    await page.emulateMedia({reducedMotion:'reduce'});
    assert.equal(await cards.first().evaluate(element=>getComputedStyle(element).animationName),'none');
    assert.deepEqual(errors, []);
    console.log(`PASS: search, category intersection, reset, cascading form, mocked submission, ${hrefs.length} destinations, reduced motion; no runtime errors.`);
  } finally { await browser.close(); }
})().catch(error => {console.error(error);process.exitCode=1;});
