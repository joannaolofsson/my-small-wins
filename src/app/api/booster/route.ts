import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const count = Number(searchParams.get("count") || 0);

  const dataByCount = [
    {
      icon: "FaSeedling",
      encouragement: "You're just getting started!",
      color: "border-blue-400",
    },
    {
      icon: "FaFire",
      encouragement: "You're on fire!",
      color: "border-red-400",
    },
    {
      icon: "FaCrown",
      encouragement: "Royal win vibes 👑",
      color: "border-yellow-400",
    },
  ];

  const index = count % dataByCount.length;
  const booster = dataByCount[index];

  return NextResponse.json(booster);
}
