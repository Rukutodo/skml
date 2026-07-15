import { defineField, defineType } from "sanity";

export const producer = defineType({
  name: "producer",
  title: "Producer",
  type: "document",
  fields: [
    defineField({
      name: "firstName",
      title: "First Name",
      type: "string",
      initialValue: "Kandregula",
    }),
    defineField({
      name: "lastName",
      title: "Last Name",
      type: "string",
      initialValue: "Adhinarayana",
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      initialValue: "Founder & Producer",
    }),
    defineField({
      name: "portrait",
      title: "Portrait Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Crucial for SEO and accessibility.",
        },
        {
          name: "caption",
          title: "Caption",
          type: "string",
          description: "Image credit or short description.",
        },
      ],
    }),
    defineField({
      name: "bio",
      title: "Bio Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      description: "Each item is a paragraph in the Producer section.",
    }),
    defineField({
      name: "quote",
      title: "Signature Quote",
      type: "string",
      initialValue: "Every story deserves its screen.",
    }),
  ],
  preview: {
    select: { title: "firstName", subtitle: "role" },
  },
});
