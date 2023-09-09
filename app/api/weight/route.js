import connectMongoDB from "../../../lib/mongodb";
import Weight from "../../../models/Weight";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { weight, date, userId } = await request.json();
  await connectMongoDB();
  await Weight.create({ weight, date, userId });
  return NextResponse.json({ message: "Weight Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const Weights = await Weight.find();
  return NextResponse.json({ Weights });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Weight.findByIdAndDelete(id);
  return NextResponse.json({ message: "Weight deleted" }, { status: 200 });
}

export async function PUT(request) {
  const id = request.nextUrl.searchParams.get("id");
  const { weight, date, userId } = await request.json();
    console.log("Received ID:", id);
    console.log("Received Data:", { weight, date, userId });
  await connectMongoDB();
  await Weight.findByIdAndUpdate(id, { weight, date, userId });
  return NextResponse.json({ message: "Weight updated" }, { status: 200 });
}