// File path: app/api/dashboard/route.js
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const url = `https://ttsapi.fineshare.com/v1/voices?category=all&page=1&limit=10&gender=all&language=en-US`;
    console.log(`Attempting to fetch from: ${url}`);

    // Log the headers we're sending
    const headers = {
      "x-api-key": process.env.FINESHARE_API_KEY || "API_KEY_NOT_SET",
    };
    console.log(
      "Using headers:",
      JSON.stringify({
        "x-api-key": headers["x-api-key"]
          ? "PRESENT (first few chars: " +
            headers["x-api-key"].substring(0, 3) +
            "...)"
          : "MISSING",
      })
    );

    const response = await fetch(url, { headers });

    // Log response status
    console.log(`Response status: ${response.status} ${response.statusText}`);

    // Check content type to see if we're getting HTML instead of JSON
    const contentType = response.headers.get("content-type");
    console.log(`Content-Type: ${contentType}`);

    if (contentType && contentType.includes("text/html")) {
      // If we got HTML, try to get the text to debug
      const htmlText = await response.text();
      console.error(
        "Received HTML instead of JSON:",
        htmlText.substring(0, 200) + "..."
      );
      throw new Error("Received HTML response instead of JSON");
    }

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in fetching voices:", error.message);

    // Create a more informative error response
    return NextResponse.json(
      {
        error: "Error in fetching",
        message: error.message,
        // If it's a fetch error, add more details
        details:
          error.name === "FetchError"
            ? {
                type: error.type,
                code: error.code,
              }
            : undefined,
      },
      { status: 500 }
    );
  }
}
