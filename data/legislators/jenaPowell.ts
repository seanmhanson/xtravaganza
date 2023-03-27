// models
import Legislator from "@/data/models/Legislator";

// types
import State from "@/data/types/usStates";
import Party from "@/data/types/politicalParties";
import Title from "@/data/types/legislatorTitles";

const JenaPowell = new Legislator({
  name: "Jena Powell",
  title: Title.REPRESENTATIVE,
  party: Party.REPUBLICAN,
  state: State.OHIO,
  district: 80,
  href: "https://ohiohouse.gov/members/jena-powell"
});

export default JenaPowell;
