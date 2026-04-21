import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-reference
export const structure: StructureResolver = (S) =>
  S.list()
    .title("SKML Dashboard")
    .items([
      // ── SINGLETONS (Open directly to the editor, no list view) ──
      S.listItem()
        .title("About Banner")
        .child(
          S.document()
            .title("About Banner Settings")
            .schemaType("about")
            .documentId("aboutSettings")
        ),
      S.listItem()
        .title("Founder Profile")
        .child(
          S.document()
            .title("Founder Settings")
            .schemaType("producer")
            .documentId("founderSettings")
        ),

      S.divider(),

      // ── FILMS (Organized by categories) ──
      S.listItem()
        .title("Produced Films")
        .child(
          S.documentList()
            .title("Produced by SKML")
            .filter('_type == "film" && category == "produced"')
        ),
      S.listItem()
        .title("Distributed Films")
        .child(
          S.documentList()
            .title("Distributed by SKML")
            .filter('_type == "film" && category == "distributed"')
        ),

      S.divider(),

      // Keep the default "All Films" list just in case
      S.documentTypeListItem("film").title("All Films Database"),
    ]);
