import { buildLegacyTheme } from "sanity";

const props = {
  "--my-white": "#ffffff",
  "--my-black": "#0A0A0F", // SKML Deep Cinematic Black
  "--my-blue": "#E5A93D", // Swapping "blue" accents for SKML Gold
  "--my-red": "#ff4d4d",
  "--my-yellow": "#f4b400",
  "--my-green": "#0f9d58",
};

export const myTheme = buildLegacyTheme({
  /* Base theme colors */
  "--black": props["--my-black"],
  "--white": props["--my-white"],

  "--gray": "#6A6A7A",
  "--gray-base": "#6A6A7A",

  "--component-bg": "#111118", // Slightly lighter black for panels
  "--component-text-color": props["--my-white"],

  /* Brand */
  "--brand-primary": props["--my-blue"],

  /* Default button */
  "--default-button-color": "#6A6A7A",
  "--default-button-primary-color": props["--my-blue"],
  "--default-button-success-color": props["--my-green"],
  "--default-button-warning-color": props["--my-yellow"],
  "--default-button-danger-color": props["--my-red"],

  /* State */
  "--state-info-color": props["--my-blue"],
  "--state-success-color": props["--my-green"],
  "--state-warning-color": props["--my-yellow"],
  "--state-danger-color": props["--my-red"],

  /* Navbar */
  "--main-navigation-color": props["--my-black"],
  "--main-navigation-color--inverted": props["--my-white"],

  /* Focus color */
  "--focus-color": props["--my-blue"], // Gold focus rings
});
