import connectMongoDB from "../../../lib/mongodb";
import BloodPressure from "../../../models/BloodPressure";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { bloodPressureUp ,bloodPressureDown, date, userId } = await request.json();
  await connectMongoDB();
  await BloodPressure.create({ bloodPressureUp, bloodPressureDown, date, userId });
  return NextResponse.json({ message: "Blood Pressure Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const BloodPressures = await BloodPressure.find();
  return NextResponse.json({ BloodPressures });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await BloodPressure.findByIdAndDelete(id);
  return NextResponse.json({ message: "Blood Pressure deleted" }, { status: 200 });
}

export async function PUT(request) {
  const id = request.nextUrl.searchParams.get("id");
  const { bloodPressureUp, bloodPressureDown, date, userId } = await request.json();
  await connectMongoDB();
  await BloodPressure.findByIdAndUpdate(id, {
    bloodPressureUp,
    bloodPressureDown,
    date,
    userId,
  });
  return NextResponse.json({ message: "Blood Pressure updated" }, { status: 200 });
}