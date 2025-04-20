import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const count = Number(searchParams.get("count") || 0);

  const dataByCount = [
    {
      icon: "FaSeedling",
      encouragement: "You're just getting started!",
      color: "slate-500", 
    },
    {
      icon: "FaFire",
      encouragement: "You're on fire!",
      color: "slate-500",
    },
    {
      icon: "FaCrown",
      encouragement: "Royal win vibes",
      color: "slate-500",
    },
  ];

  const index = count % dataByCount.length;
  const booster = dataByCount[index];
  console.log("Returning booster:", booster);

  return NextResponse.json(booster);
}
