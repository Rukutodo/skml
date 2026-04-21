import { NextRequest, NextResponse } from "next/server";
import { createFilm, updateFilmPoster } from "@/lib/sanity/mutations";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data.title || !data.category) {
      return NextResponse.json(
        { error: "Title and category are required" },
        { status: 400 }
      );
    }
    
    // Create the film
    const result = await createFilm(data);

    // If a poster was uploaded before saving, link it now
    if (data.posterAssetId && result._id) {
      await updateFilmPoster(result._id, data.posterAssetId);
    }

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create film" },
      { status: 500 }
    );
  }
}
