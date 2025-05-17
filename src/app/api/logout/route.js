import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const response = NextResponse.json({
      message: "logout successful",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/", // Ensure the cookie is cleared for the entire domain
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    console.log(response);
    return response;
  } catch (error) {
    console.error("Backend error in logging out : ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
