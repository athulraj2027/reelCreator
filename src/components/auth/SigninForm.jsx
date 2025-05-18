"use client";
import React, { useState } from "react";
import CardWrapper from "./CardWrapper";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useForm } from "@/app/context/form-context";
import { useAuth } from "@/app/context/auth-context";

const SigninForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { showSignup } = useForm();
  const { login } = useAuth();

  const validateForm = () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return false;
    }
    return true;
  };

  const submitHandler = async () => {
    const isValid = validateForm();
    if (!isValid) return;
    const toastId = toast.loading("Logging you in");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "/api/signin",
        { email, password },
        config
      );
      if (response.status === 200) {
        toast.success("User logged in successfully", { id: toastId });
        // setIsLoggedIn(true);
        login();
        router.replace(`/dashboard/${response.data.id}`);
      } else {
        toast.error(response.data.message, { id: toastId });
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong";
      console.log(errorMessage);
      toast.error(errorMessage, { id: toastId });
    } finally {
    }
  };
  return (
    <CardWrapper
      title="Sign in"
      footerText="First time here? Sign up"
      formChange={showSignup}
    >
      <div className="flex justify-start flex-col gap-1.5">
        <label className="text-xs">Email address</label>
        <Input
          type="email"
          placeholder="email"
          className="bg-white text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="text-xs">Password</label>
        <Input
          type="password"
          placeholder="password"
          className="bg-white text-black"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="mt-6 rounded-sm bg-blue-900" onClick={submitHandler}>
          Sign in
        </Button>
      </div>
    </CardWrapper>
  );
};

export default SigninForm;
