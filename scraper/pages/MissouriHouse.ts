import { Browser, Page } from 'playwright';
import PageModel from './PageModel';

const GLOBAL_SELECTOR = '';

// ?SessionType=R&BillID=1452621
const senateListUrl = 'https://senate.mo.gov/23info/BTS_Web/BillList.aspx?SessionType=R';

class MissouriPage {

}


class MissouriHousePage extends PageModel {
  protected baseUrl = 'https://www.house.mo.gov/Bill.aspx?year=2023&code=R';
  protected page!: Page;
  protected readonly url: string;
  protected readonly selectors = {
    title: '.BillDescription',
    billRows: '#BillJunk > table > tbody > tr',
    sponsorFilter: '//th[text()=\'Sponsor:\']',
    lastUpdated: '#actionTable > tbody > tr:last-child() > td:first-child',
    lastAction: '#actionTable > tbody > tr:last-child() > td:nth-child(2)',
    introducedDate: '#actionTable > tbody > tr:first-child() > td:first-child',
    documentRow: '.DocRow:above(#DocRows > .DocHeaderRow:nth-child(2))',
    pdfLink: '.DocInfoCell a'
  }

  private readonly billId: string;
  private title?: string | null;
  private sponsors?: Array<string>;
  private pdfLink?: string | null;
  private lastUpdated?: string | null;
  private lastAction?: string | null;
  private introducedDate?: string | null;

  constructor(billId: string, browser: Browser) {
    super(browser);
    this.billId = billId;
    this.url = `${this.baseUrl}&bill=${billId.toUpperCase()}`;
  }

  async scrape() {
    await this.connect();
    await this.summary();
    await this.actions();
    await this.documents();
    await this.disconnect();
    return this.data();
  }

  async summary() {
    const [title, sponsor] = await Promise.all([
      this.page.locator(this.selectors.title).textContent(),
      this.page.locator(this.selectors.billRows)
        .filter({ has: this.page.locator(this.selectors.sponsorFilter) })
        .locator('td > a')
        .textContent(),
    ]);

    this.title = title;
    this.sponsors = sponsor ? [sponsor] : [];
  }

  async actions() {
    // iframe unfortunately
    const [lastUpdated, lastAction, introducedDate] = await Promise.all([
      this.page.locator(this.selectors.lastUpdated).textContent(),
      this.page.locator(this.selectors.lastAction).textContent(),
      this.page.locator(this.selectors.introducedDate).textContent(),
    ]);

    this.lastUpdated = lastUpdated;
    this.lastAction = lastAction;
    this.introducedDate = introducedDate;
  }

  async documents() {
    const pdfLink = await this.page.locator(this.selectors.documentRow)
      .first()
      .locator(this.selectors.pdfLink)
      .getAttribute('href');

    this.pdfLink = pdfLink;
  }

  data() {
    return {
      billId: this.billId,
      title: this.title,
      sponsors: this.sponsors,
      pdfLink: this.pdfLink,
      lastUpdated: this.lastUpdated,
      lastAction: this.lastAction,
      introducedDate: this.introducedDate,
    }
  }
}

export default MissouriPage;
