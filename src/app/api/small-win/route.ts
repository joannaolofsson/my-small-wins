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
    const messages = messagesByType[type] || messagesByType.habit;
  
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  
    return NextResponse.json({
      icon: randomIcon,
      encouragement: randomMessage,
    });
  }