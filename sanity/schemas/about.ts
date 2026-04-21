import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "About Banner",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      description: 'Primary heading e.g. "Crafting Stories"',
      initialValue: "Crafting Stories",
    }),
    defineField({
      name: "headlineAccent",
      title: "Headline Accent",
      type: "string",
      description: 'Italic accent text e.g. "That Resonate"',
      initialValue: "That Resonate",
    }),
    defineField({
      name: "description",
      title: "Description Paragraphs",
      type: "array",
      of: [{ type: "text", rows: 4 }],
      description: "Each item is a paragraph in the About section.",
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
      initialValue: "View Our Films",
    }),
    defineField({
      name: "stats",
      title: "Statistics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
    }),
  ],
  // Singleton — only one document of this type
  preview: {
    prepare() {
      return { title: "About Banner" };
    },
  },
});
