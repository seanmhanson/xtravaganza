import { Browser, Page } from 'playwright';
import PageModel from './PageModel';

type Bills = Record<string, Array<string>>;
class AcluPage extends PageModel {
  static rowSelector = '#map table > tbody > tr';
  protected baseUrl = 'https://www.aclu.org/legislative-attacks-on-lgbtq-rights';
  protected selectors = { row: AcluPage.rowSelector };
  protected page!: Page;
  protected url;

  private bills: Bills;

  constructor(browser: Browser) {
    super(browser);
    this.bills = {};
    this.url = this.baseUrl;
  }

  async scrape() {
    await this.connect();
    await this.billsByState();
    await this.disconnect();
    return this.data();
  }

  async billsByState() {
    const rows = this.page.locator(this.selectors.row);
    for (const row of await rows.all()) {
      const state = await row.locator('.bill-state').textContent();
      const bill = await row.locator('td:nth-child(2) > a, td:nth-child(2) > span').textContent();

      if (!state || !bill) {
        return;
      }

      const formattedState = state.trim().replace(' ', '-').toLowerCase();
      const formattedBill = bill.trim().replace(' ', '').toLowerCase();
      if (this.bills[formattedState] == null) {
        this.bills[formattedState] = [];
      }

      this.bills[formattedState].push(formattedBill);
    }
  }

  data() {
    return this.bills;
  }
}

export default AcluPage;