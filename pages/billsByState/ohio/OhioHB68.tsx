// data
import Metadata from "@/data/billMetadata/ohioHB68";

// components
import BillHeader from "@/components/BillHeader";

const OhioHB68 = () => {
  const renderHeader = () => {
    return <BillHeader metadata={Metadata} />;
  };

  return <div>{renderHeader()}</div>;
};

export default OhioHB68;
