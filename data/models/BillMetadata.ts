import State from "../types/usStates";
import Legislator from "./Legislator";

interface BillMetadataProps {
  prefix: string;
  number: number;
  state: State;
  sponsor: Legislator;
  name: string;
  longName?: string;
  status?: string;
  billHref: string;
  textHref?: string;
  pdfHref?: string;
}

class BillMetadata {
  private prefix: string;
  private number: number;
  private billSponsor: Legislator;
  public state: State;
  public name: string;
  public billHref: string;
  public longName?: string;
  public status?: string;
  public textHref?: string;
  public pdfHref?: string;

  constructor(props: BillMetadataProps) {
    this.prefix = props.prefix;
    this.number = props.number;
    this.billSponsor = props.sponsor;
    this.state = props.state;
    this.status = props.status;
    this.name = props.name;
    this.longName = props.longName;
    this.billHref = props.billHref;
    this.textHref = props.textHref;
    this.pdfHref = props.pdfHref;
  }

  get billNumber() {
    return `${this.prefix} ${this.number}`;
  }

  get sponsor() {
    return this.billSponsor.fullTitle;
  }
}

export default BillMetadata;