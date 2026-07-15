import { writeClient } from "./writeClient";

// ── About Mutations ────────────────────────────────────

export async function updateAbout(data: {
  headline?: string;
  headlineAccent?: string;
  description?: string[];
  ctaText?: string;
  stats?: { value: string; label: string }[];
}) {
  // Check if singleton exists
  const existing = await writeClient.fetch(
    `*[_type == "about" && _id == "aboutSettings"][0]._id`
  );

  if (existing) {
    return writeClient.patch("aboutSettings").set(data).commit();
  } else {
    return writeClient.create({
      _type: "about",
      _id: "aboutSettings",
      ...data,
    });
  }
}

// ── Producer Mutations ─────────────────────────────────

export async function updateProducer(data: {
  firstName?: string;
  lastName?: string;
  role?: string;
  bio?: string[];
  quote?: string;
}) {
  const existing = await writeClient.fetch(
    `*[_type == "producer" && _id == "founderSettings"][0]._id`
  );

  if (existing) {
    return writeClient.patch("founderSettings").set(data).commit();
  } else {
    return writeClient.create({
      _type: "producer",
      _id: "founderSettings",
      ...data,
    });
  }
}

export async function updateProducerPortrait(imageAssetId: string) {
  return writeClient
    .patch("founderSettings")
    .set({
      portrait: {
        _type: "image",
        asset: { _type: "reference", _ref: imageAssetId },
      },
    })
    .commit();
}

// ── Film Mutations ─────────────────────────────────────

export async function createFilm(data: {
  title: string;
  genre?: string;
  year?: string;
  category: "produced" | "distributed";
  ottPlatform?: string;
  releaseType?: string;
  order?: number;
}) {
  return writeClient.create({
    _type: "film",
    ...data,
    slug: {
      _type: "slug",
      current: data.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    },
  });
}

export async function updateFilm(
  id: string,
  data: {
    title?: string;
    genre?: string;
    year?: string;
    category?: "produced" | "distributed";
    ottPlatform?: string;
    releaseType?: string;
    order?: number;
  }
) {
  const patch = writeClient.patch(id).set(data);
  if (data.title) {
    patch.set({
      ...data,
      slug: {
        _type: "slug",
        current: data.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      },
    });
  }
  return patch.commit();
}

export async function updateFilmPoster(filmId: string, imageAssetId: string) {
  return writeClient
    .patch(filmId)
    .set({
      poster: {
        _type: "image",
        asset: { _type: "reference", _ref: imageAssetId },
      },
    })
    .commit();
}

export async function updateFilmsOrder(updates: { id: string; order: number }[]) {
  const transaction = writeClient.transaction();
  for (const update of updates) {
    transaction.patch(update.id, (p) => p.set({ order: update.order }));
  }
  return transaction.commit();
}

export async function deleteFilm(id: string) {
  // Find the film's poster asset ID before deleting the film
  const film = await writeClient.fetch(
    `*[_type == "film" && _id == $id][0]{"posterId": poster.asset->_id}`, 
    { id }
  );
  
  // Delete the film document
  await writeClient.delete(id);
  
  // If it had a poster, permanently delete the actual image asset to free up storage
  if (film?.posterId) {
    await writeClient.delete(film.posterId);
  }
}

export async function removeFilmPoster(filmId: string) {
  // Find the film's poster asset ID before unsetting it
  const film = await writeClient.fetch(
    `*[_type == "film" && _id == $id][0]{"posterId": poster.asset->_id}`, 
    { id: filmId }
  );
  
  // Unset the poster reference from the film document
  await writeClient.patch(filmId).unset(["poster"]).commit();
  
  // Permanently delete the actual image asset to free up storage
  if (film?.posterId) {
    await writeClient.delete(film.posterId);
  }
}

// ── Image Upload ───────────────────────────────────────

export async function uploadImage(
  file: Buffer,
  filename: string
): Promise<string> {
  const asset = await writeClient.assets.upload("image", file, {
    filename,
  });
  return asset._id;
}
