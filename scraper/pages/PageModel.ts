import { Browser, Page } from 'playwright';

type Selectors = Record<string, string>;
type PrimitiveData = string | number | null | undefined;
export type Data = Record<string, Record<string, PrimitiveData> | Array<PrimitiveData> | PrimitiveData>;

abstract class PageModel {
  protected abstract baseUrl: string;
  protected abstract url: string;
  protected abstract selectors: Selectors;
  protected abstract page: Page;
  protected readonly browser: Browser;

  constructor(browser: Browser) {
    this.browser = browser;
  }

  abstract scrape(): Promise<Data>;

  abstract data(): Data;

  async connect() {
    this.page = await this.browser.newPage();
    await this.page.goto(this.url);
  }

  async disconnect() {
    await this.page.close();
    return this.data();
  }


}

export default PageModel;
