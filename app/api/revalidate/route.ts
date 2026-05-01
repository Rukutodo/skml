import { revalidateTag, revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Sanity Webhook → On-Demand Revalidation
 *
 * Sanity POSTs to this endpoint when content changes.
 * We invalidate the relevant Next.js cache tags so pages
 * rebuild with fresh data on the next request.
 *
 * Setup in Sanity Dashboard:
 *   Manage → API → Webhooks → Create Webhook
 *   URL:    https://skmlmotionpictures.com/api/revalidate
 *   Secret: (same as SANITY_REVALIDATE_SECRET env var on Vercel)
 *   Trigger on: Create, Update, Delete
 *   Filter: (leave empty to catch all types)
 *   Projection: { _type }
 */

// Map Sanity document types to cache tags
const TYPE_TAG_MAP: Record<string, string[]> = {
  film: ["films"],
  about: ["about"],
  producer: ["producer"],
};

export async function POST(req: NextRequest) {
  try {
    // ── Verify webhook secret ──
    const secret = req.headers.get("x-sanity-webhook-secret") 
      || req.nextUrl.searchParams.get("secret");
    
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json(
        { message: "Invalid secret" },
        { status: 401 }
      );
    }

    // ── Parse the webhook body ──
    const body = await req.json().catch(() => null);
    const type = body?._type as string | undefined;

    // ── Revalidate matching cache tags ──
    const tags = type && TYPE_TAG_MAP[type] ? TYPE_TAG_MAP[type] : Object.values(TYPE_TAG_MAP).flat();
    
    for (const tag of tags) {
      revalidateTag(tag);
    }

    // Also revalidate the main paths to be safe
    revalidatePath("/", "layout");
    revalidatePath("/movies", "page");

    return NextResponse.json({
      revalidated: true,
      tags,
      type: type || "all",
      now: Date.now(),
    });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json(
      { message: "Error revalidating", error: String(err) },
      { status: 500 }
    );
  }
}
