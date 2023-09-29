import connectMongoDB from "../../../lib/mongodb";
import FoodSettings from "../../../models/FoodSettings";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { sum, protein, fat, roughage, carbs, userId } = await request.json();
  await connectMongoDB();
  await FoodSettings.create({ sum, protein, fat, roughage, carbs, userId });
  return NextResponse.json(
    { message: "Food Settings Created" },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongoDB();
  const FoodSetting = await FoodSettings.find();
  return NextResponse.json({ FoodSetting });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await FoodSettings.findByIdAndDelete(id);
  return NextResponse.json(
    { message: "Food Settings deleted" },
    { status: 200 }
  );
}

export async function PUT(request) {
  const { sum, protein, fat, roughage, carbs, userId } = await request.json();
  await connectMongoDB();

  // Získajte záznam používateľa podľa userId
  const userRecord = await FoodSettings.findOne({ userId: userId });

  if (userRecord) {
    // Ak existuje záznam používateľa, aktualizujte ho
    await FoodSettings.findByIdAndUpdate(userRecord._id, {
      sum,
      protein,
      fat,
      roughage,
      carbs,
      userId,
    });
    return NextResponse.json(
      { message: "Food Settings updated", carbs, id: userRecord._id },
      { status: 200 }
    );
  } else {
    // Ak neexistuje záznam používateľa, vytvorte nový
    const newUserRecord = await FoodSettings.create({
      sum,
      protein,
      fat,
      roughage,
      carbs,
      userId,
    });
    return NextResponse.json(
      { message: "Food Settings created", carbs, id: newUserRecord._id },
      { status: 201 }
    );
  }
}