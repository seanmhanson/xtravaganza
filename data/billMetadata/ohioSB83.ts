// data
import BillMetadata from "@/data/models/BillMetadata";
import State from "@/data/types/usStates";
import JerryCirino from "../legislators/jerryCirino";

const Metadata = new BillMetadata({
  prefix: "SB",
  number: 83,
  state: State.OHIO,
  sponsor: JerryCirino,
  name: "Enact Ohio Higher Education Enhancement Act",
  longName:
    "To amend sections 3345.45, 4117.14, and 4117.15 and to enact sections 1713.57, 3333.0419," +
    " 3345.029, 3345.0216, 3345.0217, 3345.0219, 3345.382, 3345.451, 3345.452, 3345.453, 3345.591," + 
    " 3345.80, and 3345.87 of the Revised Code to enact the Ohio Higher Education Enhancement Act" + 
    " regarding the operation of state institutions of higher education.",
  status: "Introduced",
  billHref: "https://www.legislature.ohio.gov/legislation/135/sb83",
  pdfHref:
    "https://search-prod.lis.state.oh.us/solarapi/v1/general_assembly_135/bills/sb83/IN/00/sb83_00_IN?format=pdf",
});

export default Metadata;