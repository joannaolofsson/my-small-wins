


import { NextRequest, NextResponse } from "next/server";
import { messagesByType, iconsByType, ValidType } from "@/lib/smallData";


export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type") as ValidType;

  const validTypes: ValidType[] = ["habit", "gift", "accomplishment", "manual"];
  if (!type || !validTypes.includes(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const icons = iconsByType[type] ?? [];
  const messages = messagesByType[type] ?? [];

  const icon = icons.length > 0
    ? icons[Math.floor(Math.random() * icons.length)]
    : "✨";

  const encouragement = messages.length > 0
    ? messages[Math.floor(Math.random() * messages.length)]
    : "Keep going!";

    console.log("messages:", messagesByType[type]);

  return NextResponse.json({
    icon,
    message: `This is a ${type} win!`,
    encouragement,
  });
}

