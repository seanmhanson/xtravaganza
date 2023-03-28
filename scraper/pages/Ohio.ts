import { Browser, Page } from 'playwright';
import PageModel from './PageModel';

const BODY_SELECTOR = '.legislation .content-area-1 > section:first-child';
const SIDEBAR_SELECTOR = '.legislation .content-area-2';
const STATUS_SELECTOR = '.legislation-status-table tbody';

class OhioPage extends PageModel {
  static titleSelector = `${BODY_SELECTOR} > section:first-child > h2`;
  static pdfSelector = `${BODY_SELECTOR} > section:nth-child(2) > p > a:first-child`;
  static sponsorsSelector = `${SIDEBAR_SELECTOR} .media-overlay-caption-text-line-1`;
  static latestRowSelector = `${STATUS_SELECTOR} tr:first-child`;
  static earliestRowSelector = `${STATUS_SELECTOR} tr:last-child`;
  static longTitleSelector = '#long-title';

  protected baseUrl = 'https://www.legislature.ohio.gov/legislation/135';
  protected page!: Page;
  protected readonly url: string;
  protected readonly selectors = {
    title: OhioPage.titleSelector,
    pdf: OhioPage.pdfSelector,
    sponsors: OhioPage.sponsorsSelector,
    latestRow: OhioPage.latestRowSelector,
    earliestRow: OhioPage.earliestRowSelector,
    longTitle: OhioPage.longTitleSelector,
  }

  private readonly billId: string;
  private title?: string | null;
  private longTitle?: string | null;
  private sponsors?: Array<string>;
  private pdfLink?: string | null;
  private lastUpdated?: string | null;
  private lastChamber?: string | null;
  private lastAction?: string | null;
  private introducedDate?: string | null;

  constructor(billId: string, browser: Browser) {
    super(browser);
    this.billId = billId;
    this.url = `${this.baseUrl}/${billId}`;
  }

  async scrape() {
    this.connect();
    await this.summary();
    await this.status();
    this.disconnect();
    return this.data();
  }

  async summary() {
    const [
      title,
      longTitle,
      sponsors,
      pdfLink,
    ] = await Promise.all([
      this.page.locator(this.selectors.title).textContent(),
      this.page.locator(this.selectors.longTitle).textContent(),
      this.page.locator(this.selectors.sponsors).allTextContents(),
      this.page.locator(this.selectors.pdf).getAttribute('href'),
    ]);

    this.title = title;
    this.longTitle = longTitle;
    this.sponsors = sponsors;
    this.pdfLink = pdfLink;
  }

  async status() {
    await this.page.goto(`${this.url}/status`);
    const latestRow = this.page.locator(this.selectors.latestRow);
    const earliestRow = this.page.locator(this.selectors.earliestRow);

    const [lastUpdated, lastChamber, lastAction, introducedDate] = await Promise.all([
      latestRow.locator('.date-cell').textContent(),
      latestRow.locator('.chamber-cell').textContent(),
      latestRow.locator('.action-cell').textContent(),
      earliestRow.locator('.date-cell').textContent(),
    ]).then(results => results.map(text => text ? text.trim() : ''));

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

export default OhioPage;