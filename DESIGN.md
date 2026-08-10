---
version: alpha
name: David Ojeda
description: A direct, readable personal notebook with one playful green accent.
colors:
  primary: "oklch(50.8% 0.118 165.612)"
  canvas: "#FFFFFF"
  ink: "oklch(21% 0.034 264.665)"
  body: "oklch(37.3% 0.034 259.733)"
typography:
  display:
    fontFamily: "Rubik, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 800
    lineHeight: 1
  heading:
    fontFamily: "Rubik, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 800
    lineHeight: 1
  body:
    fontFamily: "Rubik, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.8
rounded:
  none: "0px"
spacing:
  page-gutter: "1rem"
  stack: "1.5rem"
  section-gap: "5rem"
components:
  brand-link:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display}"
    rounded: "{rounded.none}"
    padding: "0px"
  content-link:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.primary}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0px"
  reading-copy:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.body}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "0px"
---

# Design System: David Ojeda

## Overview

**Creative North Star: "The Open Notebook"**

The site should feel like a personal notebook left open on a clean desk: direct, unguarded, and easy to read. The design stays out of the way of David's writing, while oversized headings and a single green accent give it a recognizable voice.

The tone is informal but deliberate. Generous vertical space gives each thought room to breathe. The wavy link underline is the one expressive gesture; its rarity makes the otherwise quiet interface feel human rather than generic.

**Key Characteristics:**

- Reading comes before decoration.
- One green accent carries every interactive cue.
- Large Rubik headings establish confidence without formality.
- Flat, borderless surfaces keep the site lightweight.
- Wavy underlines add a small, consistent note of playfulness.

## Colors

The palette is monochrome editorial text on a white canvas, with green reserved for links and interaction.

### Primary

- **Notebook Green:** The only accent. Use it for links, hover underlines, and other interactive cues.

### Neutral

- **Clean Canvas:** The page background and the neutral ground behind all content.
- **Headline Ink:** The darkest neutral, reserved for the site name and major headings.
- **Reading Graphite:** A softer neutral for long-form text, lists, and supporting content.

### Named Rules

**The One Green Rule.** Do not introduce a second accent color. Interaction should read as one coherent system.

**The Quiet Canvas Rule.** Keep the main reading surface white and untextured unless a future redesign explicitly replaces this visual world.

## Typography

**Display Font:** Rubik with a generic sans-serif fallback  
**Body Font:** Rubik with a generic sans-serif fallback

**Character:** Rubik makes the site friendly and contemporary without losing readability. Weight and scale—not multiple typefaces—create hierarchy.

### Hierarchy

- **Display:** Extra-bold and tightly set. Use for the site name only.
- **Heading:** Extra-bold and tightly set. Use for primary page and section headings.
- **Body:** Regular weight with an open line height. Use for prose, lists, metadata, and navigation links.

### Named Rules

**The Single Voice Rule.** Use Rubik throughout. Create contrast with scale, weight, and whitespace rather than a second font family.

**The Reading Measure Rule.** Keep long-form content within the existing prose measure; do not stretch copy across the viewport.

## Layout

Use a single-column reading layout anchored to the left. The page uses the `page-gutter` token at the viewport edge, `stack` for related vertical groups, and `section-gap` to separate the header from the main reading flow.

The desktop body scale is intentionally spacious. Preserve Tailwind Typography's smaller default on narrow screens and its larger prose treatment from the medium breakpoint upward. Avoid dashboard grids, centered marketing sections, or full-bleed panels unless the product direction changes.

## Elevation & Depth

The system is flat. It uses whitespace, typography, and color—not shadows, gradients, overlays, or raised cards—to create hierarchy.

**The Flat-by-Default Rule.** Do not add shadows to ordinary content or navigation. A new elevation treatment requires a functional reason, not decoration.

## Shapes

The current interface is borderless and square. Links and text do not sit inside pills, rounded cards, or decorative containers.

## Components

### Brand Link

The site name is the visual anchor: extra-bold Rubik at display scale in Headline Ink. It has no underline at rest. On hover, show the same thin green wavy underline used by the rest of the site. Keep the browser's native keyboard focus indicator.

### Content Links

Content links use Notebook Green and no underline at rest. On hover, reveal a thin wavy underline with a clear offset. Preserve the text color so the state change does not cause visual noise, and keep the browser's native keyboard focus indicator.

### Navigation

Navigation is textual and contextual. Keep labels short, place them in the normal reading flow, and use the same link behavior as content links rather than introducing button chrome.

## Do's and Don'ts

### Do:

- **Do** make reading order and heading hierarchy obvious before adding visual effects.
- **Do** use generous vertical whitespace between unrelated groups.
- **Do** apply the green wavy underline consistently to interactive text.
- **Do** preserve native focus visibility and adequate text contrast.

### Don't:

- **Don't** add generic cards, pills, gradients, glass effects, or decorative shadows.
- **Don't** use green as a large background fill; it is an interaction accent.
- **Don't** center long-form content or expand it beyond a comfortable reading measure.
- **Don't** add a second font or accent color without revisiting this design system.
