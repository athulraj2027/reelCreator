import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connectDB } from "@/app/_lib/db";
import User from "@/app/_lib/models/User";

export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();
    const { username, email, password } = body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return NextResponse.json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
