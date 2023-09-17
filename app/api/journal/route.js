import connectMongoDB from "../../../lib/mongodb";
import Journal from "../../../models/Journal";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { theme,
        journal,
        problem,
        result,
        date,
        userId, } = await request.json();
  await connectMongoDB();
  await Journal.create({
    theme,
    journal,
    problem,
    result,
    date,
    userId,
  });
  return NextResponse.json({ message: "Journal Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const Journals = await Journal.find();
  return NextResponse.json({ Journals });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Journal.findByIdAndDelete(id);
  return NextResponse.json({ message: "Journal deleted" }, { status: 200 });
}

export async function PUT(request) {
  const id = request.nextUrl.searchParams.get("id");
  const { theme,
        journal,
        problem,
        result,
        date,
        userId, } = await request.json();
  await connectMongoDB();
  await Journal.findByIdAndUpdate(id, {
    theme,
    journal,
    problem,
    result,
    date,
    userId,
  });
  return NextResponse.json({ message: "Journal updated" }, { status: 200 });
}