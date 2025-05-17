import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

console.log("ID : ", process.env.RAZORPAY_ID);
console.log("SECRET : ", process.env.RAZORPAY_SECRET);
export async function POST(req) {
  const body = await req.json();
  console.log(body);
  const { price } = body;
  try {
    const options = {
      amount: price * 100, // ₹499 in paise
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating order : ", error);
    return NextResponse.json(
      { error: "Error creating order : ", error },
      { status: 500 }
    );
  }
}
