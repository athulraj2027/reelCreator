import React from "react";
import CardWrapper from "./CardWrapper";

const ProPlanCard = () => {
  const features = ["10 messages daily", "24*7 customer care"];
  return (
    <CardWrapper
      title="Pro"
      price={199.99}
      features={features}
      upGradeBtn={true}
    />
  );
};

export default ProPlanCard;
