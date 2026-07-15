import { NextRequest, NextResponse } from "next/server";
import { updateFilmsOrder } from "@/lib/sanity/mutations";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data.updates || !Array.isArray(data.updates)) {
      return NextResponse.json(
        { error: "Updates array is required" },
        { status: 400 }
      );
    }
    
    await updateFilmsOrder(data.updates);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to reorder films" },
      { status: 500 }
    );
  }
}
