# SKML Design System

## Register
brand

## Colors (OKLCH)
- **Background (Deep Night):** `oklch(12% 0.01 280)` - A deep, slightly blue-tinted black to avoid #000 flatness.
- **Surface (Moonlit Stone):** `oklch(18% 0.01 280)` - For depth layers.
- **Accent (Gilded Screen):** `oklch(82% 0.12 85)` - A refined, cinematic gold/brass, used sparingly (<5%).
- **Text (Faded Script):** `oklch(95% 0.01 280)` - Soft white to reduce eye strain and feel analog.

## Typography
- **Headings:** Playfair Display (Serif) - Large, bold, and editorial.
- **Body:** Inter (Sans) - Clean, legible, with generous line height (1.75).
- **Metadata:** Space Grotesk (Mono-ish) - For labels, years, and technical details.

## Layout & Rhythm
- **Cinematic Spacing:** Use large vertical gaps (`20vh` to `30vh`) to let content breathe.
- **Asymmetry:** Avoid perfect 50/50 splits. Use 60/40 or 70/30 ratios for a more dynamic, film-poster feel.
- **Layering:** Use absolute positioning and negative margins to overlap elements (text over images) like a title sequence.

## Motion
- **Parallax:** Subtle background image movement.
- **Reveal:** Slow, cinematic fades (`1.2s`) and upward drifts.
- **No Bounce:** Smooth exponential easing only.
