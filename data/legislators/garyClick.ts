// models
import Legislator from "@/data/models/Legislator";

// types
import State from "@/data/types/usStates";
import Party from "@/data/types/politicalParties";
import Title from "@/data/types/legislatorTitles";


const GaryClick = new Legislator({
  name: "Gary Click",
  title: Title.REPRESENTATIVE,
  party: Party.REPUBLICAN,
  state: State.OHIO,
  district: 88,
  href: "https://ohiohouse.gov/members/gary-click"
});

export default GaryClick;
