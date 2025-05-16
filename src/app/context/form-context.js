"use client";

import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export function FormProvider({ children }) {
  const [formType, setFormType] = useState('signup');

  const showSignup = () => setFormType("signup");
  const showSignin = () => setFormType("signin");
  return (
    <FormContext.Provider value={{formType, showSignin, showSignup}}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (!context) throw new Error("useForm must be within provider");
  return context;
}
