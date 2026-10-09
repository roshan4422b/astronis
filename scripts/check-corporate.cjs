const assert=require('node:assert/strict');
const fs=require('node:fs');
const ts=require('typescript');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
require.extensions['.ts']=(module,filename)=>module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText,filename);
const {corporateCommercial:practice}=require('../src/data/service-practices.ts');
const base=process.env.SERVICES_BASE_URL||'http://localhost:3000';
const main=`${base}/services/${practice.slug}`;
(async()=>{const browser=await chromium.launch();try{
 const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',error=>errors.push(error.message));fs.mkdirSync('artifacts/corporate',{recursive:true});
 await page.goto(main,{waitUntil:'networkidle',timeout:120000});assert.equal(await page.locator('h1').count(),1);
 const links=page.locator('a[href^="/services/corporate-commercial-advisory/"][href*="#"]');assert.equal(await links.count(),59);
 await page.locator('a[href$="entity-formation-business-setup#llp-formation"]').click();
 await page.waitForURL('**/entity-formation-business-setup#llp-formation');
 await page.waitForFunction(()=>document.querySelector('[aria-current="location"]')?.getAttribute('href')==='#llp-formation');
 assert.equal(await page.locator('#service-select').inputValue(),practice.title);assert.equal(await page.locator('#service-requirement').inputValue(),practice.groups[0].title);
 await page.waitForFunction(()=>{const r=document.querySelector('#llp-formation').getBoundingClientRect();return r.top>document.querySelector('.site-header').getBoundingClientRect().bottom&&r.top<250});
 await page.screenshot({path:'artifacts/corporate/llp-desktop.png'});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.locator('nav[aria-label="Services in this category"] a[href="#project-office"]').click();
 await page.waitForFunction(()=>document.querySelector('[aria-current="location"]')?.getAttribute('href')==='#project-office');
 await page.goBack();await page.waitForFunction(()=>document.querySelector('[aria-current="location"]')?.getAttribute('href')==='#llp-formation');
 await page.goForward();await page.waitForFunction(()=>document.querySelector('[aria-current="location"]')?.getAttribute('href')==='#project-office');
 await page.reload({waitUntil:'networkidle'});await page.waitForFunction(()=>document.querySelector('[aria-current="location"]')?.getAttribute('href')==='#project-office');
 // Passive scrolling, rather than a navigation click, updates the active service.
 await page.locator('#public-limited-company').evaluate(element=>window.scrollTo(0,scrollY+element.getBoundingClientRect().top-165));
 await page.waitForFunction(()=>document.querySelector('[aria-current="location"]')?.getAttribute('href')==='#public-limited-company');
 for(const [name,url] of [['main',main],['formation',main+'/'+practice.groups[0].slug]]) {
  await page.goto(url,{waitUntil:'networkidle'});
  for(const width of [1920,1440,1280,1024,768,430,390,360]) {
   await page.setViewportSize({width,height:1000});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${name} overflow at ${width}`);
   assert.equal(await page.locator('h1').count(),1);
   await page.screenshot({path:`artifacts/corporate/${name}-${width}.png`});
   console.log('Responsive PASS',name,width);
  }
 }
 // Mobile direct hash entry and select-to-jump leave the heading below both sticky elements.
 await page.setViewportSize({width:390,height:900});await page.goto(main+'/'+practice.groups[0].slug+'#llp-formation',{waitUntil:'networkidle'});
 const mobileSelect=page.getByLabel('Jump to a service');assert.equal(await mobileSelect.inputValue(),'llp-formation');
 const assertUncovered=async id=>assert(await page.locator('#'+id).evaluate(element=>element.getBoundingClientRect().top>=document.querySelector('aside nav').getBoundingClientRect().bottom),`Mobile anchor hidden: ${id}`);
 await assertUncovered('llp-formation');await mobileSelect.selectOption('branch-office');await assertUncovered('branch-office');
 await page.screenshot({path:'artifacts/corporate/mobile-anchor.png'});
 // All group routes contain every child anchor, use the shared form default, and emit valid breadcrumbs.
 for(const group of practice.groups) {
  const response=await page.goto(main+'/'+group.slug,{waitUntil:'networkidle'});assert.equal(response.status(),200);
  assert.equal(await page.locator('#service-requirement').inputValue(),group.title);
  for(const child of group.children) assert.equal(await page.locator(`section[id="${child.slug}"]`).count(),1,child.title);
  assert.equal(await page.locator('h1').innerText(),group.title);
  const breadcrumb=JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());assert.equal(breadcrumb.itemListElement.length,4);
  console.log('Route/anchors/form PASS',group.slug,group.children.length);
 }
 for(const alias of practice.aliases) {await page.goto(base+'/services/'+alias,{waitUntil:'networkidle'});assert.equal(page.url(),main);}
 assert.equal((await page.request.get(main+'/unknown-group')).status(),404);
 assert.equal((await page.request.get(main+'/'+practice.groups[0].slug+'/llp-formation')).status(),404);
 assert.equal((await page.request.get(base+'/services/corporate-advisory/corporate-structuring')).status(),200);
 assert.deepEqual(errors,[]);
 console.log('PASS: 59 anchor links, six group pages, deep link/reload/history/scroll spy, mobile jump visibility, form defaults, aliases, 404 boundaries, legacy child route, no runtime errors.');
}finally{await browser.close()}})().catch(error=>{console.error(error);process.exitCode=1});
