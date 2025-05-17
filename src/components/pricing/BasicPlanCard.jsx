import React from "react";
import CardWrapper from "./CardWrapper";

const BasicPlanCard = () => {
  const features = ["10 messages daily", "24*7 customer care"];
  return (
    <CardWrapper
      title="Basic"
      price={0}
      features={features}
      upGradBtn={false}
    />
  );
};

export default BasicPlanCard;
