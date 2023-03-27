// models
import Legislator from "@/data/models/Legislator";

// types
import State from "@/data/types/usStates";
import Party from "@/data/types/politicalParties";
import Title from "@/data/types/legislatorTitles";


const JerryCirino = new Legislator({
  name: "Jerry C. Cirino",
  title: Title.SENATOR,
  party: Party.REPUBLICAN,
  state: State.OHIO,
  district: 18,
  href: "https://ohiosenate.gov/members/jerry-c-cirino"
});

export default JerryCirino;
