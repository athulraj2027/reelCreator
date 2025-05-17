"use client";

import { useEffect } from "react";

const CheckoutButton = ({ price, title }) => {
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
      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      onClick={handleCheckout}
    >
      Upgrade
    </button>
  );
};

export default CheckoutButton;
