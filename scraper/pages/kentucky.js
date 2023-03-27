module.exports = class KentuckyPage {
  static baseUrl = 'https://apps.legislature.ky.gov/record/23RS';
  static actionTable = 'body > .container > .bill-table:nth-child(5) > table > tbody';
  static selectors = {
    billRows: 'body > .container > .bill-table:nth-child(2) > table > tbody > tr',
    lastActionRow: '//th[text()=\'Last Action\']',
    title: '//th[text()=\'Title\']',
    pdf: '//th[text()=\'Bill Documents\']',
    sponsors: '//th[text()=\'Sponsors\']',
    summary: '//th[text()=\'Summary of Original Version\']',
    introducedDate: `${KentuckyPage.actionTable} > tr:first-child > th`,
    lastUpdated: `${KentuckyPage.actionTable} > tr:last-child > th`,
    lastAction: `${KentuckyPage.actionTable} > tr:last-child > td > ul > li:last-child`,
  }

  /** @private */
  browser;
  /** @private */
  page;

  url;
  billId;
  title;
  summary;
  sponsors;
  pdfLink;
  lastUpdated;
  lastAction;
  introducedDate;

  constructor(billId, browser) {
    this.browser = browser;
    this.billId = billId;
    this.url = `${KentuckyPage.baseUrl}/${billId}.html`;
  }

  async scrape() {
    this.page = await this.browser.newPage();
    await this.page.goto(this.url);
    
    const isWithdrawn = await this.checkWithdrawnStatus();
    if (isWithdrawn) {
      await this.page.close();
      return {
        billId: this.billId,
        lastAction: 'Withdrawn',
      }
    }

    await this.summaryTable();
    await this.actionTable();
    await this.page.close();
    return this.data();
  }

  async checkWithdrawnStatus() {
    const lastActionHeader = this.page.locator(KentuckyPage.selectors.lastActionRow);
    const lastAction = await this.page
      .locator(KentuckyPage.selectors.billRows)
      .filter({ has: lastActionHeader })
      .textContent();
    return lastAction.includes('WITHDRAWN');
  }

  async summaryTable() {
    const rows = this.page.locator(KentuckyPage.selectors.billRows);
    const titleHeader = this.page.locator(KentuckyPage.selectors.title);
    const documentsHeader = this.page.locator(KentuckyPage.selectors.pdf);
    const sponsorsHeader = this.page.locator(KentuckyPage.selectors.sponsors);
    const summaryHeader = this.page.locator(KentuckyPage.selectors.summary);

    const titleLocator = rows
      .filter({ has: titleHeader })
      .locator('td')
      .textContent();
    const pdfLinkLocator = rows
      .filter({ has: documentsHeader })
      .locator('a:first-child')
      .getAttribute('href');
    const sponsorsLocator = rows
      .filter({ has: sponsorsHeader })
      .locator('td > span > a')
      .allTextContents();
    const summaryLocator = rows
      .filter({ has: summaryHeader })
      .locator('td')
      .textContent();

    const [title, pdfLink, sponsors, summary ] = await Promise.all([
      titleLocator,
      pdfLinkLocator,
      sponsorsLocator,
      summaryLocator,
    ]);

    this.title = title;
    this.pdfLink = pdfLink;
    this.summary = summary;
    this.sponsors = sponsors;
  }
  

  async actionTable() {
    const [ lastUpdated, lastAction, introducedDate ] = await Promise.all([
      this.page.locator(KentuckyPage.selectors.lastUpdated).textContent(),
      this.page.locator(KentuckyPage.selectors.lastAction).textContent(),
      this.page.locator(KentuckyPage.selectors.introducedDate).textContent(),
    ]);

    this.lastUpdated = lastUpdated;
    this.lastAction = lastAction
    this.introducedDate = introducedDate;
  }

  data() {
    return {
      billId: this.billId,
      title: this.title,
      summary: this.summary,
      sponsors: this.sponsors,
      pdfLink: this.pdfLink,
      lastUpdated: this.lastUpdated,
      lastAction: this.lastAction,
      introducedDate: this.introducedDate,
    };
  }
}
