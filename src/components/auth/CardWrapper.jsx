import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CardWrapper = ({
  title,
  description,
  formChange,
  footerText,

  children,
}) => {
  return (
    <Card className="bg-amber-300 shadow-2xl text-white  w-[300px] sm:w-[500px] mt-10">
      <CardHeader>
        <CardTitle className="text-4xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <p
          onClick={formChange}
          className="cursor-pointer font-medium text-blue-900"
        >
          {footerText}
        </p>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
