module.exports = class OhioPage {
  static baseUrl = 'https://www.legislature.ohio.gov/legislation/135';
  static bodySelector = `.legislation .content-area-1 > section:first-child`;
  static sidebarSelector = `.legislation .content-area-2`;
  static statusTableBody = '.legislation-status-table tbody';
  static selectors = {
    title: `${OhioPage.bodySelector} > section:first-child > h2`,
    pdf: `${OhioPage.bodySelector} > section:nth-child(2) > p > a:first-child`,
    sponsors: `${OhioPage.sidebarSelector} .media-overlay-caption-text-line-1`,
    latestRow: `${OhioPage.statusTableBody} tr:first-child`,
    earliestRow: `${OhioPage.statusTableBody} tr:last-child`,
    longTitle: '#long-title',
  }

  /** @private */
  browser;
  /** @private */
  page;

  url;
  billId;
  title;
  longTitle;
  sponsors;
  pdfLink;
  lastUpdated;
  lastChamber;
  lastAction;
  introducedDate;

  constructor(billId, browser) {
    this.browser = browser;
    this.billId = billId;
    this.url = `${OhioPage.baseUrl}/${this.billId}`;
  }

  async scrape() {
    this.page = await this.browser.newPage();
    await this.summary();
    await this.status();
    await this.page.close();
    return this.data();
  }

  async summary() {
    await this.page.goto(this.url);
    
    const [
      longTitle,
      title,
      sponsors,
      pdfLink,
    ] = await Promise.all([
      this.page.locator(OhioPage.selectors.title).textContent(),
      this.page.locator(OhioPage.selectors.longTitle).textContent(),
      this.page.locator(OhioPage.selectors.sponsors).allTextContents(),
      this.page.locator(OhioPage.selectors.pdf).getAttribute('href'),
    ]);

    this.title = title;
    this.longTitle = longTitle;
    this.sponsors = sponsors;
    this.pdfLink = pdfLink;
  }

  async status() {
    await this.page.goto(`${this.url}/status`);
    
    const latestRow = await this.page.locator(OhioPage.selectors.latestRow);
    const earliestRow = await this.page.locator(OhioPage.selectors.earliestRow);
    const [lastUpdated, lastChamber, lastAction, introducedDate] = await Promise.all([
      latestRow.locator('.date-cell').textContent(),
      latestRow.locator('.chamber-cell').textContent(),
      latestRow.locator('.action-cell').textContent(),
      earliestRow.locator('.date-cell').textContent(),
    ]).then(results => results.map(text => text.trim()));

    this.lastUpdated = lastUpdated;
    this.lastChamber = lastChamber;
    this.lastAction = lastAction;
    this.introducedDate = introducedDate;
  }

  data() {
    return {
      billId: this.billId,
      title: this.title,
      longTitle: this.longTitle,
      sponsors: this.sponsors,
      pdfLink: this.pdfLink,
      lastUpdated: this.lastUpdated,
      lastChamber: this.lastChamber,
      lastAction: this.lastAction,
      introducedDate: this.introducedDate,
    }
  }
}
