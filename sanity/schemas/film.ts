import { defineField, defineType } from "sanity";

export const film = defineType({
  name: "film",
  title: "Film",
  type: "document",
  groups: [
    { name: "basic", title: "Basic Info", default: true },
    { name: "release", title: "Release Details" },
    { name: "media", title: "Media" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Film Title",
      type: "string",
      group: "basic",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basic",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "genre",
      title: "Genre",
      type: "string",
      group: "basic",
      description: 'e.g. "Horror / Thriller", "Romance / Drama"',
    }),
    defineField({
      name: "poster",
      title: "Poster Image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Release Year",
      type: "string",
      group: "release",
      description: 'e.g. "2023"',
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "release",
      options: {
        list: [
          { title: "Produced", value: "produced" },
          { title: "Distributed", value: "distributed" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ottPlatform",
      title: "OTT Platform",
      type: "string",
      group: "release",
      description: 'Leave empty if not on OTT. e.g. "Amazon Prime", "Aha"',
    }),
    defineField({
      name: "releaseType",
      title: "Release Type",
      type: "string",
      group: "release",
      options: {
        list: [
          { title: "Theatrical", value: "theatrical" },
          { title: "OTT", value: "ott" },
          { title: "Both", value: "both" },
        ],
      },
      initialValue: "ott",
    }),
    defineField({
      name: "order",
      title: "Display Order (Sorting)",
      type: "number",
      group: "basic",
      description: "Lower numbers appear first.",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Year (Newest)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "poster",
    },
  },
});

