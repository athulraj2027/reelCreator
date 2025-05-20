"use client";
import React from "react";
import SignupForm from "../auth/SignupForm";
import SigninForm from "../auth/SigninForm";
import { useForm } from "@/app/context/form-context";

const HeroSection = ({ heading }) => {
  const { formType, setFormType } = useForm();
  if (!formType) return null;
  return (
    <div className="flex flex-col lg:flex-row justify-around items-center text-center w-full px-4 gap-3 font-bold">
      <div className="max-w-md lg:max-w-xl">
        {" "}
        <h1 className="text-5xl  bg-clip-text sm:text-[10rem] font-extrabold my-20 mt-20 lg:mt-0 text-amber-200 lg:my-0">
          REEL
          <br />
          IFY
        </h1>
      </div>
      {formType === "signup" ? <SignupForm /> : <SigninForm />}
    </div>
  );
};

export default HeroSection;
