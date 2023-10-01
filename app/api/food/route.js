import connectMongoDB from "../../../lib/mongodb";
import Food from "../../../models/Food";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {title, date, userId, foodId, quantity, option, time,kcal,protein,carbs,fat,roughage } = await request.json();
  await connectMongoDB();
  await Food.create({
    title,
    date,
    userId,
    foodId,
    quantity,
    option,
    time,
    kcal,
    protein,
    carbs,
    fat,
    roughage,
  });
  return NextResponse.json({ message: "Food Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const Foods = await Food.find();
  return NextResponse.json({ Foods });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Food.findByIdAndDelete(id);
  return NextResponse.json({ message: "Food deleted" }, { status: 200 });
}

export async function PUT(request) {
  const id = request.nextUrl.searchParams.get("id");
  const {
    title,
    date,
    userId,
    foodId,
    quantity,
    option,
    time,
    kcal,
    protein,
    carbs,
    fat,
    roughage,
  } = await request.json();
  await connectMongoDB();
  await Food.findByIdAndUpdate(id, {
    title,
    date,
    userId,
    foodId,
    quantity,
    option,
    time,
    kcal,
    protein,
    carbs,
    fat,
    roughage,
  });
  return NextResponse.json({ message: "Food updated" }, { status: 200 });
}

