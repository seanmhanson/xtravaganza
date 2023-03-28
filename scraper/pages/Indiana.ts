import { Browser, Page } from 'playwright';
import PageModel from './PageModel';

const NAV_SELECTOR = '#accordion-groups-container';
const ACTIONS_SELECTOR = '.document-actions-container table tbody';

class IndianaPage extends PageModel {
  static actionNavSelector = `${NAV_SELECTOR} div:nth-child(4) a`;
  static documentNavSelector = `${NAV_SELECTOR} div:nth-child(1) a`;
  static latestRowSelector = `${ACTIONS_SELECTOR} > tr:first-child > td > dl > dd`;
  static earliestRowSelector = `${ACTIONS_SELECTOR} table tbody > tr:last-child > td > dl > dd`;
  static membersSelector = '#document-members > .members > ul > a';
  static pdfSelector = '#pdfviewer-download-document';
  static digestSelector = '#bill-digest';

  protected baseUrl = 'https://iga.in.gov/legislative/2023/bills/';
  protected page!: Page;
  protected readonly url: string;
  protected readonly selectors = {
    actionNav: IndianaPage.actionNavSelector,
    documentNav: IndianaPage.documentNavSelector,
    latestRow: IndianaPage.latestRowSelector,
    earliestRow: IndianaPage.earliestRowSelector,
    members: IndianaPage.membersSelector,
    pdf: IndianaPage.pdfSelector,
    digest: IndianaPage.digestSelector,
  }

  private readonly billId: string;
  private chamber: 'senate' | 'house';
  private longTitle?: string | null;
  private authors?: Array<string>;
  private pdfLink?: string | null;
  private lastUpdated?: string | null;
  private lastAction?: string | null;
  private introducedDate?: string | null;

  constructor(billId: string, browser: Browser) {
    super(browser);
    this.billId = billId;
    this.chamber = billId.startsWith('sb') ? 'senate' : 'house';
    this.url = `${this.baseUrl}/${this.chamber}/${this.billId.slice(2)}`;
  }

  async scrape() {
    await this.connect();
    await this.summary();
    await this.actions();
    await this.document();
    await this.disconnect();
    return this.data();
  }

  async summary() { }

  async actions() { }

  async document() { }

  data() {
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

export default IndianaPage;