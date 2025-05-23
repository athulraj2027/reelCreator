"use client";

import { useAuth } from "@/app/context/auth-context";
import { useEffect } from "react";
import toast from "react-hot-toast";

const CheckoutButton = ({ price, title }) => {
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }), // 👈 send your price here
      });

      const order = await res.json();
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_ID, // from .env
        amount: order.amount,
        currency: order.currency,
        name: process.env.COMPANY_NAME,
        description: `Upgrade to ${title}`,
        order_id: order.id,
        handler: async function (response) {
          console.log("Payment successful:", response);

          // Optional: verify and upgrade user
          // await fetch("/api/payment/verify", {
          //   method: "POST",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify(response),
          // });
        },
        theme: {
          color: "#6366F1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="px-4 py-2 bg-white text-green-300 rounded hover:bg-green-400 hover:text-white"
      onClick={
        isLoggedIn
          ? handleCheckout
          : () => toast.error("Please sign in to upgrade")
      }
    >
      Upgrade
    </button>
  );
};

export default CheckoutButton;
