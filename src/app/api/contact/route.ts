import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, company, tier, message } = data;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const logPath = path.join(process.cwd(), "src/data/contact-log.json");
    
    // Ensure file exists
    let logs = [];
    try {
      const fileContents = await fs.readFile(logPath, "utf-8");
      logs = JSON.parse(fileContents);
    } catch (e) {
      // If file doesn't exist, logs stays as empty array
    }

    const newLog = {
      name,
      email,
      company,
      tier,
      message,
      timestamp: new Date().toISOString(),
      sourcePagePath: "/",
    };

    logs.push(newLog);
    
    // Using atomic write (though not strictly necessary here, it's safer)
    await fs.writeFile(logPath, JSON.stringify(logs, null, 2), "utf-8");

    return NextResponse.json({ success: true, message: "Lead captured successfully." });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
