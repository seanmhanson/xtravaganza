module.exports = class IndianaPage {
  static baseUrl = 'https://iga.in.gov/legislative/2023/bills/';
  static billNav = '#accordion-groups-container';
  static actionsTable = '.document-actions-container table tbody';
  static selectors = {
    actionNav: `${IndianaPage.billNav} div:nth-child(4) a`,
    documentNav: `${IndianaPage.billNav} div:nth-child(1) a`,
    latestRow: `${IndianaPage.actionsTable} > tr:first-child > td > dl > dd`,
    earliestRow: `${IndianaPage.actionsTable} table tbody > tr:last-child > td > dl > dd`,
    members: '#document-members > .members > ul > a',
    pdf: '#pdfviewer-download-document',
    digest: '#bill-digest',
  }

  /** @private */
  browser;
  /** @private */
  page;

  url;
  billId;
  chamber;
  longTitle;
  authors;
  lastUpdated;
  lastAction;
  introducedDate;
  pdfLink;

  constructor(billId, browser) {
    this.browser = browser;
    this.billId = billId;
    this.chamber = billId.startsWith('sb') ? 'senate' : 'house';
    this.url =  `${IndianaPage.baseUrl}/${this.chamber}/${this.billId.slice(2)}`;
  }

  async scrape() {
    this.page = await this.browser.newPage();
    await this.page.goto(this.url);
    await this.summary();
    await this.actions();
    await this.document();
    await this.page.close();
    return this.data();
  }

  async summary() {}

  async actions() {}

  async document() {}

  async data() {
    return {
      billId: this.billId,
      longTitle: this.longTitle,
      authors: this.authors,
      pdfLink: this.pdfLink,
      lastUpdated: this.lastUpdated,
      lastAction: this.lastAction,
      introducedDate: this.introducedDate,
    }
  }

}