import { Browser, Page } from 'playwright';
import PageModel from './PageModel';

const ACTION_SELECTOR = 'body > .container > .bill-table:nth-child(5) > table > tbody';

class KentuckyPage extends PageModel {
  static rowSelector = 'body > .container > .bill-table:nth-child(2) > table > tbody > tr';
  static lastActionCellSelector = '//th[text()=\'Last Action\']';
  static titleSelector = '//th[text()=\'Title\']';
  static pdfSelector = '//th[text()=\'Bill Documents\']';
  static sponsorsSelector = '//th[text()=\'Sponsors\']';
  static descriptionSelector = '//th[text()=\'Summary of Original Version\']';
  static introducedDateSelector = `${ACTION_SELECTOR} > tr:first-child > th`;
  static lastUpdateSelector = `${ACTION_SELECTOR} > tr:last-child > th`;
  static lastActionSelector = `${ACTION_SELECTOR} > tr:last-child > td > ul > li:last-child`;

  protected baseUrl = 'https://apps.legislature.ky.gov/record/23RS';
  protected page!: Page;
  protected readonly url: string;
  protected readonly selectors = {
    rows: KentuckyPage.rowSelector,
    lastActionFilter: KentuckyPage.lastActionCellSelector,
    titleFilter: KentuckyPage.titleSelector,
    pdfFilter: KentuckyPage.pdfSelector,
    sponsorsFilter: KentuckyPage.sponsorsSelector,
    descriptionFilter: KentuckyPage.descriptionSelector,
    introducedDate: KentuckyPage.introducedDateSelector,
    lastUpdate: KentuckyPage.lastUpdateSelector,
    lastAction: KentuckyPage.lastActionSelector,
  }

  private readonly billId: string;
  private title?: string | null;
  private description?: string | null;
  private sponsors?: Array<string>;
  private pdfLink?: string | null;
  private lastUpdated?: string | null;
  private lastAction?: string | null;
  private introducedDate?: string | null;

  constructor(billId: string, browser: Browser) {
    super(browser);
    this.billId = billId;
    this.url = `${this.baseUrl}/${billId}.html`;
  }

  async scrape() {
    await this.connect();

    const isWithdrawn = await this.checkWithdrawnStatus();
    if (isWithdrawn) {
      await this.disconnect();
      return {
        billId: this.billId,
        lastAction: 'Withdrawn',
      }
    }

    await this.summary();
    await this.actions();
    await this.disconnect();
    return this.data();
  }

  async checkWithdrawnStatus() {
    const lastAction = await this.page
      .locator(this.selectors.rows)
      .filter({ has: this.page.locator(this.selectors.lastAction) })
      .textContent();
    return lastAction?.includes('WITHDRAWN');
  }

  async summary() {
    const rows = this.page.locator(this.selectors.rows);
    const titleLocator = rows
      .filter({ has: this.page.locator(this.selectors.titleFilter) })
      .locator('td')
      .textContent();
    const pdfLinkLocator = rows
      .filter({ has: this.page.locator(this.selectors.pdfFilter) })
      .locator('a:first-child')
      .getAttribute('href');
    const sponsorsLocator = rows
      .filter({ has: this.page.locator(this.selectors.sponsorsFilter) })
      .locator('td > span > a')
      .allTextContents();
    const descriptionLocator = rows
      .filter({ has: this.page.locator(this.selectors.descriptionFilter) })
      .locator('td')
      .textContent();

    const [title, pdfLink, sponsors, description] = await Promise.all([
      titleLocator,
      pdfLinkLocator,
      sponsorsLocator,
      descriptionLocator,
    ]);

    this.title = title;
    this.pdfLink = pdfLink;
    this.description = description;
    this.sponsors = sponsors;
  }

  async actions() {
    const [lastUpdated, lastAction, introducedDate] = await Promise.all([
      this.page.locator(this.selectors.lastUpdate).textContent(),
      this.page.locator(this.selectors.lastAction).textContent(),
      this.page.locator(this.selectors.introducedDate).textContent(),
    ]);

    this.lastUpdated = lastUpdated;
    this.lastAction = lastAction
    this.introducedDate = introducedDate;
  }

  data() {
    return {
      billId: this.billId,
      title: this.title,
      summary: this.description,
      sponsors: this.sponsors,
      pdfLink: this.pdfLink,
      lastUpdated: this.lastUpdated,
      lastAction: this.lastAction,
      introducedDate: this.introducedDate,
    };
  }
}

export default KentuckyPage;