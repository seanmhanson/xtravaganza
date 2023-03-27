// data
import Metadata from "@/data/billMetadata/ohioHB8";

// components
import BillHeader from "@/components/BillHeader";

const OhioHB6 = () => {
  const renderHeader = () => {
    return <BillHeader metadata={Metadata} />;
  };

  return <div>{renderHeader()}</div>;
};

export default OhioHB6;
