import { NextRequest, NextResponse } from "next/server";
import { updateProducer } from "@/lib/sanity/mutations";

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await updateProducer(data);
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update Producer" },
      { status: 500 }
    );
  }
}
