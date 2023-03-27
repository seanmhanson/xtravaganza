// data
import BillMetadata from "@/data/models/BillMetadata";
import GaryClick from "@/data/legislators/garyClick";
import State from "@/data/types/usStates";

const Metadata = new BillMetadata({
  prefix: "HB",
  number: 68,
  state: State.OHIO,
  sponsor: GaryClick,
  name: "Enact Ohio Saving Adolescents from Experimentation (SAFE) Act",
  longName:
    "To enact sections 3109.054, 3129.01, 3129.02, 3129.03, 3129.04, 3129.05," +
    " 3129.06, and 3129.07 of the Revised Code regarding gender transition services" +
    " for minors and to name this act the Ohio Saving Adolescents from Experimentation" +
    " (SAFE) Act.",
  status: "In Committee",
  billHref: "https://www.legislature.ohio.gov/legislation/135/hb68",
  pdfHref:
    "https://search-prod.lis.state.oh.us/solarapi/v1/general_assembly_135/bills/hb68/IN/00/hb68_00_IN?format=pdf",
});

export default Metadata;