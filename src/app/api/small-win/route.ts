
import { NextResponse } from "next/server";

const iconsByType = {
    habit: ["FaCalendarCheck", "GiMeditation", "BSFillHeartFill"],
    accomplishment: ["FaTrophy", "GiAchievement", "FaCalendarCheck"],
    gift: ["FaGift", "BSFillHeartFill"],
};

const messagesByType = {
    habit: [
      "You're building something amazing!",
      "Habits shape the future — nice work!",
      "Consistency is key and you're crushing it.",
    ],
    accomplishment: [
      "What a win!",
      "You’re making moves!",
      "Future you is proud!",
    ],
    gift: [
      "You deserve this!",
      "Such a sweet gift to yourself.",
      "Self-love for the win 💖",
    ],
  };

  export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") as keyof typeof iconsByType;
  
    const icons = iconsByType[type] || iconsByType.habit;

    console.log(icons)
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];

    const messages = messagesByType[type] || messagesByType.habit;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  
    return NextResponse.json({
      icon: randomIcon,
      encouragement: randomMessage,
    });
  }

  //function getRandomItem(arr) {

    // get random index value
    //const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    //const item = arr[randomIndex];

    //return item;
//}

//const array = [1, 'hello', 5, 8];

//const result = getRandomItem(array);
//console.log(result)
=======



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

