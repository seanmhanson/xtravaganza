import State from "../types/usStates";
import Title from "../types/legislatorTitles";
import Party, { partyToAbbreviation } from "../types/politicalParties";

interface LegislatorProps {
  name: string;
  title?: Title;
  district: number;
  party: Party;
  href?: string;
  state: State;
}

class Legislator {
  private state: State;
  private title?: Title;
  private district: number;
  private party: Party;
  public name: string;
  public href?: string;

  constructor(props: LegislatorProps) {
    this.name = props.name;
    this.title = props.title;
    this.district = props.district;
    this.party = props.party;
    this.href = props.href;
    this.state = props.state;
  }

  get partyAbbr() {
    return partyToAbbreviation[this.party];
  }

  get suffix() {
    return `(${this.partyAbbr}-${this.district})`;
  }

  get fullTitle() {
    return `${this.state} ${this.title} ${this.name} ${this.suffix}`;
  }

  get linkText() {
    return `${this.state} Official Page for ${this.name}`;
  }
}

export default Legislator;
