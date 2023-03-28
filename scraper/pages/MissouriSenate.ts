import { Browser, Page } from 'playwright';
import PageModel from './PageModel';

class MissouriSenate extends PageModel {
  protected baseUrl = 'https://senate.mo.gov/23info/BTS_Web';
  protected url = `${this.baseUrl}/BillList.aspx?SessionType=R`;
  protected page!: Page;
  protected selectors = {
    description: '#lblBriefDesc',
    sponsor: '#hlSponsor',
    summary: '#lblSummary',
    pdfLink: '#form1 table a:last-child',
    lastUpdated: '#Table5 > tbody > tr:nth-child(3) table tbody tr:last-child > td:first-child',
    lastAction: '#Table5 > tbody > tr:nth-child(3) table tbody tr:last-child > td:nth-child(2)',
    introducedDate: '#Table5 > tbody > tr:nth-child(3) table tbody tr:first-child > td:first-child',
  }

  private readonly billId: string;
  private internalId!: string;
  private title?: string | null;
  private summary?: string | null;
  private sponsors?: Array<string>;
  private pdfLink?: string | null;
  private lastUpdated?: string | null;
  private lastAction?: string | null;
  private introducedDate?: string | null;

  get billUrl() {
    return `${this.baseUrl}/Bill.aspx?SessionType=R&BillID=${this.internalId}`;
  }
  get documentsUrl() {
    return `${this.baseUrl}/BillText.aspx?SessionType=R&BillID=${this.internalId}`;
  }
  get actionsUrl() {
    return `${this.baseUrl}/Actions.aspx?SessionType=R&BillID=${this.internalId}`;
  }

  constructor(billId: string, browser: Browser) {
    super(browser);
    this.billId = billId;
  }

  async scrape() {
    await this.connect();
    await this.getInternalBillId();
    await this.overview();
    await this.documents();
    await this.actions();
    await this.disconnect();
    return this.data();
  }

  async getInternalBillId() {
    const selector = `//a[text()=\'SB ${this.billId.slice(2)}:\']`;
    const href = await this.page.locator(selector).getAttribute('href') || '';
    this.internalId = href.slice(href.indexOf('BillID=') + 7);
  }

  async overview() {
    await this.page.goto(this.billUrl);
    const [title, sponsor, summary] = await Promise.all([
      this.page.locator(this.selectors.description).textContent(),
      this.page.locator(this.selectors.sponsor).textContent(),
      this.page.locator(this.selectors.summary).textContent(),
    ]);

    this.title = title;
    this.sponsors = sponsor ? [sponsor] : [];
    this.summary = summary;
  }

  async documents() {
    await this.page.goto(this.documentsUrl);
    const pdfLink = await this.page.locator(this.selectors.pdfLink).getAttribute('href');

    this.pdfLink = pdfLink;
  }

  async actions() {
    await this.page.goto(this.actionsUrl);
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
      summary: this.summary,
      sponsors: this.sponsors,
      pdfLink: this.pdfLink,
      lastUpdated: this.lastUpdated,
      lastAction: this.lastAction,
      introducedDate: this.introducedDate,
    };
  }

}

export default MissouriSenate;