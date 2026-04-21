import { defineField, defineType } from "sanity";

export const film = defineType({
  name: "film",
  title: "Film",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Film Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "poster",
      title: "Poster Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "genre",
      title: "Genre",
      type: "string",
      description: 'e.g. "Horror / Thriller", "Romance / Drama"',
    }),
    defineField({
      name: "year",
      title: "Release Year",
      type: "string",
      description: 'e.g. "2023"',
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
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
      description: 'Leave empty if not on OTT. e.g. "Amazon Prime", "Aha"',
    }),
    defineField({
      name: "releaseType",
      title: "Release Type",
      type: "string",
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
      title: "Display Order",
      type: "number",
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
