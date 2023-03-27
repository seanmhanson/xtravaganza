module.exports = class AcluPage {
  static url = 'https://www.aclu.org/legislative-attacks-on-lgbtq-rights';
  static selectors = {
    row: '#map table > tbody > tr',
  }
  browser;
  page;
  bills;

  constructor(browser) {
    this.browser = browser;
    this.bills = {};
  }

  async scrape() {
    this.page = await this.browser.newPage();
    await this.page.goto(AcluPage.url);
    await this.billsByState();
    await this.page.close();
    return this.data();
  }

  async billsByState() {
    const rows = await this.page.locator(AcluPage.selectors.row);
    for (const row of await rows.all()) {
      const state = await row.locator('.bill-state').textContent();
      const bill = await row.locator('td:nth-child(2) > a, td:nth-child(2) > span').textContent();

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
