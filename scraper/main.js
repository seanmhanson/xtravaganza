const fs = require('fs/promises');
const playwright = require('playwright');

const AcluPage = require('./pages/aclu');
const OhioLegislationPage = require('./pages/ohio');
const KentuckyLegislationPage = require('./pages/kentucky');

async function main() {
  const browser = await playwright.chromium.launch({ headless: true });
  const content = {};

  const aclu = new AcluPage(browser);
  const bills = await aclu.scrape();

  content.ohio = await Promise.all(bills.ohio.map(id => scrapeOhioBill(id, browser)));
  content.kentucky = await Promise.all(bills.kentucky.map(id => scrapeKentuckyBill(id, browser)));
  await browser.close();
  await fs.writeFile('./scraper/output.json', JSON.stringify(content, null, 2));
}

async function scrapeOhioBill(id, browser) {
  const ohio = new OhioLegislationPage(id, browser);
  return ohio.scrape();
}

async function scrapeKentuckyBill(id, browser) {
  const ky = new KentuckyLegislationPage(id, browser);
  return ky.scrape();
}

main();
