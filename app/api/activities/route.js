import connectMongoDB from "../../../lib/mongodb";
import Activities from "../../../models/Activities";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {title, date, userId, activityId, quantity, option, kcal, } = await request.json();
  await connectMongoDB();
  await Activities.create({
    title,
    date,
    userId,
    activityId,
    quantity,
    option,
    kcal,
  });
  return NextResponse.json({ message: "Activities Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const Activity = await Activities.find();
  return NextResponse.json({ Activity });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Activities.findByIdAndDelete(id);
  return NextResponse.json({ message: "Activities deleted" }, { status: 200 });
}

export async function PUT(request) {
  const id = request.nextUrl.searchParams.get("id");
  const { title, date, userId, activityId, quantity, option, kcal } =
    await request.json();
  await connectMongoDB();
  await Activities.findByIdAndUpdate(id, {
    title,
    date,
    userId,
    activityId,
    quantity,
    option,
    kcal,
  });
  return NextResponse.json({ message: "Activities updated" }, { status: 200 });
}

