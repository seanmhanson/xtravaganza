// data
import Metadata from "@/data/billMetadata/ohioSB83";

// components
import BillHeader from "@/components/BillHeader";

const OhioSB83 = () => {
  const renderHeader = () => {
    return <BillHeader metadata={Metadata} />;
  };

  return <div>{renderHeader()}</div>;
};

export default OhioSB83;
