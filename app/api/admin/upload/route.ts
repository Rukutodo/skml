import { NextRequest, NextResponse } from "next/server";
import { uploadImage, updateFilmPoster, updateProducerPortrait } from "@/lib/sanity/mutations";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const target = formData.get("target") as string; // "film:<id>" or "producer"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const assetId = await uploadImage(buffer, file.name);

    // Link the uploaded image to the correct document, or just return the ID if passing unlinked
    if (target.startsWith("film:")) {
      const filmId = target.replace("film:", "");
      await updateFilmPoster(filmId, assetId);
    } else if (target === "producer") {
      await updateProducerPortrait(assetId);
    }

    return NextResponse.json({ success: true, assetId });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
