import { Browser, Page } from 'playwright';
import PageModel from './PageModel';

const GLOBAL_SELECTOR = '';

class TemplatePage extends PageModel {
  static localSelector = `${GLOBAL_SELECTOR}`;

  protected baseUrl = '';
  protected page!: Page;
  protected readonly url: string;
  protected readonly selectors = {
    local: TemplatePage.localSelector,
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
    this.url = `${this.baseUrl}/${billId}`;
  }

  async scrape() {
    await this.connect();
    // scraping methods go here
    await this.disconnect();
    return this.data();
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

export default TemplatePage;
