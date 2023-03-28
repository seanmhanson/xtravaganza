import { Browser, Page } from 'playwright';
import PageModel from './PageModel';

const ACTIONS_SELECTOR = '#wrapper > table > tbody';

class TemplatePage extends PageModel {
  protected baseUrl = 'http://www.wvlegislature.gov/Bill_Status/Bills_history.cfm';
  protected page!: Page;
  protected readonly url: string;
  protected readonly selectors = {
    overviewRows: '#bhistcontent > table > tbody > tr',
    summaryFilter: '//td[text()=\'SUMMARY:\']',
    sponsorFilter: '//td[text()=\'LEAD SPONSOR:\']',
    cosponsorsFilter: '//td[text()=\'SPONSORS:\']',
    billTextFilter: '//td[text()=\'BILL TEXT:\']',
    pdfLinkFilter: '//a[text()=\' pdf\']',
    textLinkFilter: '//a[text()=\' html\']',
    summary: 'td:last-child',
    sponsor: 'td:last-child > a',
    cosponsors: 'td:last-child',
    billText: 'td:last-child',
    lastUpdated: `${ACTIONS_SELECTOR} > tr:nth-child(2) > td:nth-child(3)`,
    lastAction: `${ACTIONS_SELECTOR} > tr:nth-child(2) > td:nth-child(2)`,
    introducedDate: `${ACTIONS_SELECTOR} > tr:last-child  td:nth-child(3)`,
  }

  private readonly billId: string;
  private title?: string | null;
  private sponsors?: Array<string>;
  private pdfLink?: string | null;
  private textLink?: string | null;
  private lastUpdated?: string | null;
  private lastAction?: string | null;
  private introducedDate?: string | null;

  constructor(billId: string, browser: Browser) {
    super(browser);
    this.billId = billId.toLowerCase();
    this.url = `${this.baseUrl}?input=${billId.slice(2)}` +
      `&year=2023&sessiontype=RS&btype=bill`;
  }

  async scrape() {
    await this.connect();
    await this.overview();
    await this.actions();
    await this.disconnect();
    return this.data();
  }

  async overview() {
    const rows = this.page.locator(this.selectors.overviewRows);
    const [title, sponsor, cosponsors, pdfLink, textLink] = await Promise.all([
      rows.filter({ has: this.page.locator(this.selectors.summaryFilter) })
        .locator(this.selectors.summary)
        .textContent(),
      rows.filter({ has: this.page.locator(this.selectors.sponsorFilter) })
        .locator(this.selectors.sponsor)
        .textContent(),
      rows.filter({ has: this.page.locator(this.selectors.cosponsorsFilter) })
        .locator(this.selectors.cosponsors)
        .textContent(),
      rows.filter({ has: this.page.locator(this.selectors.billTextFilter) })
        .locator(this.selectors.pdfLinkFilter)
        .getAttribute('href'),
      rows.filter({ has: this.page.locator(this.selectors.billTextFilter) })
        .locator(this.selectors.textLinkFilter)
        .getAttribute('href'),
    ]);

    this.title = title;
    this.sponsors = `${sponsor}${cosponsors}`.split(', ');
    this.pdfLink = pdfLink;
    this.textLink = textLink;
  }

  async actions() {
    const [lastUpdated, lastAction, introducedDate] = await Promise.all([
      this.page.locator(this.selectors.lastUpdated).textContent(),
      this.page.locator(this.selectors.lastAction).textContent(),
      this.page.locator(this.selectors.introducedDate).textContent(),
    ]);

    this.lastUpdated = lastUpdated;
    this.lastAction = lastAction;
    this.introducedDate = introducedDate;
  }

  data() {
    return {
      billId: this.billId,
      title: this.title,
      sponsors: this.sponsors,
      pdfLink: this.pdfLink,
      textLink: this.textLink,
      lastUpdated: this.lastUpdated,
      lastAction: this.lastAction,
      introducedDate: this.introducedDate,
    }
  }
}

export default TemplatePage;
