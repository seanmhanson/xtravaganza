// models
import Legislator from "@/data/models/Legislator";

// types
import State from "@/data/types/usStates";
import Party from "@/data/types/politicalParties";
import Title from "@/data/types/legislatorTitles";

const DJSwearingen = new Legislator({
  name: "D.J. Swearingen",
  title: Title.REPRESENTATIVE,
  party: Party.REPUBLICAN,
  state: State.OHIO,
  district: 89,
  href: "https://ohiohouse.gov/members/d-j-swearingen"
});

export default DJSwearingen;
