import fs from 'fs/promises';
import playwright, { Browser } from 'playwright';

import AcluPage from './pages/ACLU';
import OhioPage from './pages/Ohio';
import KentuckyPage from './pages/Kentucky';
import { Data } from './pages/PageModel';

type BillContent = Record<string, Array<Data>>;

const outputPath = './scraper/output.json';

async function main() {
  const browser = await playwright.chromium.launch({ headless: true });
  const content: BillContent = {};

  const aclu = new AcluPage(browser);
  const bills = await aclu.scrape();

  content.ohio = await Promise.all(bills.ohio.map(id => scrapeOhioBill(id, browser)));
  content.kentucky = await Promise.all(bills.kentucky.map(id => scrapeKentuckyBill(id, browser)));

  await browser.close();
  await fs.writeFile(outputPath, JSON.stringify(content, null, 2));
}

async function scrapeOhioBill(id: string, browser: Browser) {
  const ohio = new OhioPage(id, browser);
  return ohio.scrape();
}

async function scrapeKentuckyBill(id: string, browser: Browser) {
  const ky = new KentuckyPage(id, browser);
  return ky.scrape();
}

main();
