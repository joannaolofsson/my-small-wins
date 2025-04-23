
import { encouragements } from "@/app/data/encouragewins";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "habit";
  const count = Number(searchParams.get("count") || 0);

  const filtered = encouragements.filter((e) => e.category === category);
  const index = count % filtered.length;
  const booster = filtered[index] || encouragements[0];

  return NextResponse.json(booster);
}
