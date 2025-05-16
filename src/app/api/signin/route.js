
import User from "@/app/_lib/models/User";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/app/_lib/db";

export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();
    const { email, password } = body;

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        { message: "Incorrect email or password" },
        { status: 400 }
      );

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid)
      return NextResponse.json(
        { message: "Incorrect email or password" },
        { status: 400 }
      );
    const tokenData = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }
    const response = NextResponse.json({
      message: "User logged in successfully",
    });

    response.cookies.set("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
