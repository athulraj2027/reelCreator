"use client";
import CardWrapper from "./CardWrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useForm } from "@/app/context/form-context";

const SignupForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { showSignin } = useForm();

  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return false;
    }
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!usernameRegex.test(username)) {
      toast.error(
        "Username must be 3–20 characters and contain only letters, numbers, or underscores."
      );
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters, including uppercase, lowercase, number, and special character."
      );
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const submitHandler = async () => {
    const isValid = validateForm();
    if (!isValid) return;
    const toastId = toast.loading("Creating new user");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "/api/signup",
        { username, email, password },
        config
      );
      if (response.status === 200) {
        toast.success("User created successfully", { id: toastId });

        showSignin();
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
      title="Sign up form"
      footerText="Already have an account? Sign in"
      formChange={showSignin}
    >
      <div className="flex justify-start flex-col gap-1.5">
        <label className="text-xs">Name</label>
        <Input
          type="text"
          placeholder="name"
          className="bg-white text-black"
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <label className="text-xs">Confirm Password</label>
        <Input
          type="password"
          placeholder="Confirm password"
          className="bg-white text-black"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button className="mt-6 rounded-sm bg-blue-900" onClick={submitHandler}>
          Sign up
        </Button>
      </div>
    </CardWrapper>
  );
};

export default SignupForm;
