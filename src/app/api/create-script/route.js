import Reel from "@/app/_lib/models/Reel";
import { getToken } from "@/app/services/getToken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import OpenAI from "openai";
import { connectDB } from "@/app/_lib/db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  await connectDB();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return new NextResponse.json(
      { message: "No token found" },
      { status: 401 }
    );
  }
  try {
    const user = jwt.verify(token, SECRET);

    let body = await req.json();
    console.log(body);
    const { data, character } = body;

    if (!data)
      return NextResponse.json({ error: "Missing data " }, { status: 400 });

    const prompt = `Act as a comedy scriptwriter creating a viral 60-second monologue for ${character}, styled like a meme or reel.

Make the tone entertaining, exaggerated, and aligned with how this character speaks in real life or shows. Add humor, pop-culture references, and exaggerations.

Keep the sentences short and engaging for subtitles. Keep it under 150 words.

The topic is: ${data}
Example output style: punchy, meme-like, in-character voice, suitable for voiceover and meme reel.

Start the script with something catchy or iconic the character might say.
Output only the plain script, no intro or explanation. Do not wrap in code blocks.

 `;
    // const completion = await openai.chat.completions.create({
    //   model: "gpt-4o",
    //   messages: [{ role: "user", content: prompt }],
    // });

    // const text = completion.choices[0].message.content;
    // console.log(text);

    const text = `Siiuuu! Let me tell you something about JavaScript, bro!

At first, I thought JavaScript was like scoring a free kick — just aim and boom! But no, it’s more like dribbling past 10 defenders — full of surprises.

You write \`==\` and it works… then it doesn’t. Like the ref changing rules mid-game!

I tried \`null === undefined\` and got confused. Felt like missing an open goal.

Then there’s \`this\`. Bro, in JavaScript, “this” is not always “this”. It’s like passing to a teammate and the ball goes to the bench.

Async/await? That’s me waiting for a pass that never comes. You wait, and wait… and still offside.

But once it clicks, JavaScript is magic. Like scoring in the 90th minute — elegant, powerful, unforgettable.

So yeah, JavaScript may be weird, but once you master it… Siiuuu! You’re unstoppable.`;

    function splitLongLine(line, maxLen = 45) {
      const words = line.split(" ");
      let result = [];
      let currentLine = "";

      for (const word of words) {
        if ((currentLine + " " + word).trim().length <= maxLen) {
          currentLine = (currentLine + " " + word).trim();
        } else {
          if (currentLine) result.push(currentLine);
          currentLine = word;
        }
      }
      if (currentLine) result.push(currentLine);
      return result;
    }

    // Usage:
    const subtitle = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .flatMap((line) => splitLongLine(line))
      .map((line, index) => ({
        id: index + 1,
        text: line,
        duration: Math.max(2, line.length * 0.1),
      }));

    const reel = new Reel({
      character,
      topic: data,
      script: text,
      subtitle,
      userId: user.id,
    });

    await reel.save();
    console.log(reel);
    return NextResponse.json(
      { message: "Reel script and subtitles created successfully ", text },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in creating script : ", error);
    return NextResponse.json(
      { error: "Failed to create script" },
      { status: 500 }
    );
  }
}
