// data
import BillMetadata from "@/data/models/BillMetadata";
import JenaPowell from "@/data/legislators/jenaPowell";
import State from "@/data/types/usStates";

const Metadata = new BillMetadata({
  prefix: "HB",
  number: 6,
  state: State.OHIO,
  sponsor: JenaPowell,
  name: "Enact the Save Women's Sports Act",
  longName:
    "To enact sections 3313.5319 and 3345.562 of the Revised Code to enact the Save Women's Sports Act to require schools, state institutions of higher education, and private colleges to designate separate single-sex teams and sports for each sex.",
  status: "In Committee",
  billHref: "https://www.legislature.ohio.gov/legislation/135/hb6",
  pdfHref:
    "https://search-prod.lis.state.oh.us/solarapi/v1/general_assembly_135/bills/hb6/IN/00/hb6_00_IN?format=pdf",
});

export default Metadata;