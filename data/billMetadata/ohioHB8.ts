// data
import BillMetadata from "@/data/models/BillMetadata";
import DJSwearingen from "../legislators/djSwearingen";
import State from "@/data/types/usStates";

const Metadata = new BillMetadata({
  prefix: "HB",
  number: 8,
  state: State.OHIO,
  sponsor: DJSwearingen,
  name: "Enact the Parents' Bill of Rights",
  longName:
    "To amend sections 3314.03 and 3326.11 and to enact section 3313.473 of the Revised Code" +
    ' to enact the "Parents\' Bill of Rights" to require public schools to adopt a policy' +
    " on parental notification on student health and well-being and instructional materials" +
    " with sexually explicit content.",
  status: "In Committee",
  billHref: "https://www.legislature.ohio.gov/legislation/135/hb8",
  pdfHref:
    "https://search-prod.lis.state.oh.us/solarapi/v1/general_assembly_135/bills/hb8/IN/00/hb8_00_IN?format=pdf",
});

export default Metadata;