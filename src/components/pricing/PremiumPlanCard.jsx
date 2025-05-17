import React from "react";
import CardWrapper from "./CardWrapper";

const PremiumPlanCard = () => {
  const features = ["10 messages daily", "24*7 customer care"];
  return (
    <CardWrapper
      title="Premium"
      price={399.99}
      features={features}
      upGradeBtn={true}
    />
  );
};

export default PremiumPlanCard;
