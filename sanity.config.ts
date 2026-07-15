"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { myTheme } from "./sanity/theme";
import { StudioLogo } from "./sanity/components/StudioLogo";
import { structure } from "./sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "skml-motion-pictures",
  title: "SKML Motion",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
  theme: myTheme,
  studio: {
    components: {
      logo: StudioLogo,
    },
  },
});
