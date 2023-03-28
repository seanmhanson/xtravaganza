import { Browser, Page } from 'playwright';
import PageModel from './PageModel';

class TenneeseePage extends PageModel {
  protected baseUrl = 'https://wapp.capitol.tn.gov/apps/BillInfo/default.aspx?BillNumber=';
  protected page!: Page;
  protected readonly url: string;
  protected readonly selectors = {
    pdf: '#lblBillNumber > a',
    sponsor: '#lblBillPrimeSponsor',
    cosponsors: '#lblBillCoPrimeSponsor',
    title: '#lblCaptionText',
    longTitle: '#lblAbstract',
    summary: '#lblSummary',
    lastUpdated: '#gvBillActionHistory tr:nth-child(2) td:last-child',
    lastAction: '#gvBillActionHistory tr:nth-child(2) td:first-child',
    introducedDate: '#gvBillActionHistory tr:last-child td:last-child',
    toggleCosponsors: '#lnkShowCoPrimes',
    toggleCaption: '#lnkShowCaptionText',
    summaryTab: '.tabs > li[data-tab="summary"]',
  }

  private readonly billId: string;
  private title?: string | null;
  private longTitle?: string | null;
  private summary?: string | null;
  private sponsors?: Array<string>;
  private pdfLink?: string | null;
  private lastUpdated?: string | null;
  private lastAction?: string | null;
  private introducedDate?: string | null;

  constructor(billId: string, browser: Browser) {
    super(browser);
    this.billId = billId;
    this.url = `${this.baseUrl}${billId.toUpperCase()}`;
  }

  async scrape() {
    await this.connect();
    await this.overview();
    await this.actionsData();
    await this.summaryData();
    await this.disconnect();
    return this.data();
  }

  async overview() {
    await this.page.locator(this.selectors.toggleCaption).click();
    await this.page.locator(this.selectors.toggleCosponsors).click();
    const [
      title,
      longTitle,
      sponsor,
      cosponsors,
      pdfLink,
    ] = await Promise.all([
      this.page.locator(this.selectors.title).textContent(),
      this.page.locator(this.selectors.longTitle).textContent(),
      this.page.locator(this.selectors.sponsor).textContent(),
      this.page.locator(this.selectors.cosponsors).textContent(),
      this.page.locator(this.selectors.pdf).getAttribute('href'),
    ]);

    this.title = title;
    this.longTitle = longTitle;
    this.sponsors = `${sponsor}${cosponsors}`.split(', ');
    this.pdfLink = pdfLink;
  }

  async actionsData() {
    const [
      lastUpdated,
      lastAction,
      introducedDate,
    ] = await Promise.all([
      this.page.locator(this.selectors.lastUpdated).textContent(),
      this.page.locator(this.selectors.lastAction).textContent(),
      this.page.locator(this.selectors.introducedDate).textContent(),
    ]);

    this.lastUpdated = lastUpdated;
    this.lastAction = lastAction;
    this.introducedDate = introducedDate;
  }

  async summaryData() {
    await this.page.locator(this.selectors.summaryTab).click();
    const summary = await this.page.locator(this.selectors.summary).textContent();
    this.summary = summary;
  }

  data() {
    return {
      billId: this.billId,
      title: this.title,
      longTitle: this.longTitle,
      summary: this.summary,
      sponsors: this.sponsors,
      pdfLink: this.pdfLink,
      lastUpdated: this.lastUpdated,
      lastAction: this.lastAction,
      introducedDate: this.introducedDate,
    }
  }
}

export default TenneeseePage;
