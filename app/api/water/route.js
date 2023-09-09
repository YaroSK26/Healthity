import connectMongoDB from "../../../lib/mongodb";
import Water from "../../../models/Water";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { water, date, userId } = await request.json();
  await connectMongoDB();
  await Water.create({ water, date, userId });
  return NextResponse.json({ message: "Water Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const Waters = await Water.find();
  return NextResponse.json({ Waters });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Water.findByIdAndDelete(id);
  return NextResponse.json({ message: "Water deleted" }, { status: 200 });
}

export async function PUT(request) {
  const id = request.nextUrl.searchParams.get("id");
  const { water, date, userId } = await request.json();
  await connectMongoDB();
  await Water.findByIdAndUpdate(id, { water, date, userId });
  return NextResponse.json({ message: "Water updated" }, { status: 200 });
}