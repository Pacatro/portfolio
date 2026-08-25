# DESIGN.md

<!-- impeccable:design-schema v2 -->

## Overview

**Creative North Star:** A portfolio that makes Paco Algar Muñoz's engineering expertise legible and immediately understandable through his body of work, without requiring visitors to understand terminal commands or navigate a hiring funnel.

**Key Characteristics:**
- Show all projects rather than a curated subset
- Keep browsing simple and immediate
- Represent the full body of work rather than ranking by popularity
- Make expertise legible through project evidence
- Preserve a simple, low-friction single-page experience

## Colors

The source of truth is `src/styles/theme.css`. Components use the corresponding
semantic Tailwind names configured in `tailwind.config.mjs`, such as
`bg-panel`, `border-line`, `text-secondary`, `text-accent`, and `text-link`.
Opacity modifiers remain available (`bg-panel/90`, `border-accent/50`).

- Surfaces: `canvas`, `panel`, `panel-hover`
- Structure: `line`, `strong`
- Text: `primary`, `secondary`, `muted`, `quiet`, `faint`, `tag`
- Accents: `accent`, `accent-hover`, `link`, `link-hover`
- Status: `warning`, `danger`, `code`

## Typography

**Font Family:** Mononoki Nerd Font (monospace)
- Display/headline: `'"Mononoki Nerd Font"', monospace`
- Body text inherits the base stack

**Hierarchy:**
- Project names: `text-lg font-bold leading-6 tracking-[-0.02em] text-accent sm:text-xl`
- Project descriptions: `text-sm leading-6 text-secondary sm:text-base sm:leading-7`
- Section navigation: `text-sm font-semibold capitalize text-secondary no-underline`
- Header name: `text-lg font-bold tracking-[-0.02em] text-accent sm:text-xl`

## Layout

**Page Shell:** Centered max-width `w-full max-w-5xl` with `mx-auto`
**Header:** Fixed border-bottom, flex wrap with gap, responsive to `sm:flex-nowrap`
**Project Grid:** CSS Grid, `grid w-full gap-4 md:grid-cols-2`
**Navigation:** Grid of section links, `grid w-full grid-cols-3 items-center gap-1 sm:flex sm:w-auto`
**Section Rhythm:** Generous vertical spacing with terminal-path headings

## Elevation

**Card/Panel:** `border border-line bg-panel` with `rounded-xl`
**Hover States:** `transition-colors hover:border-strong hover:bg-panel-hover`
**Active States:** `active:border-strong active:text-primary`
**Atmosphere:** Fixed, low-contrast radial color fields over a four-rem baseline grid

## Components

**Header Button:** Grid layout `grid h-11 w-11 shrink-0 place-items-center sm:h-10 sm:w-10`, SVG terminal icon, opacity transition on hover
**Navigation Links:** `flex min-h-11 items-center justify-center border-b-2 border-transparent px-2 py-2`, text color transitions on hover/active
**Project List Item:** Rounded border `rounded-xl`, background `bg-panel`, border `border border-line`, transition `transition-colors`
**Language Tag:** Rounded background `rounded bg-line px-2 py-1 text-tag`
**Topic Tags:** `break-all #{topic}`
**Star Rating:** `tabular-nums text-warning` with aria-label of star count
**Project Index:** Two-digit repository order as a quiet scanning aid; it communicates listing position, not rank

## Do's and Don'ts

**Do:**
- Let projects provide primary evidence of expertise
- Keep browsing simple and immediate
- Represent the full body of work
- Make expertise legible without terminal commands
- Use real GitHub data for project listings

**Don't:**
- Invent outcomes, metrics, or claims not supported by evidence
- Rank projects by popularity
- Fabricate case studies or testimonials
- Require visitors to understand terminal commands

## States and Ranges

**Empty Projects State:** Displayed when `projects.length === 0` — centered message with "No public projects found" and GitHub profile link
**Rate Limit Error:** "GitHub is temporarily limiting requests."
**Timeout Error:** "GitHub took too long to respond."
**Unavailable Error:** "GitHub could not be reached right now."

## Interaction and Layout

**Primary Action:** Open command palette (`:`) via button in header
**Navigation:** Click section links to scroll to `#section-id`
**Project Links:** Open in new tab, link to GitHub repo
**Hover Feedback:** Border and background color transitions on project cards, navigation links, and buttons
**Focus Indicators:** Existing semantic landmarks and visible keyboard focus preserved

## Constraints

- Static web delivery with deferred project loading
- Astro framework — must remain suitable for static delivery
- Accessibility baselines: semantic landmarks, visible keyboard focus, reduced-motion behavior, responsive support
- Project data from public GitHub repositories only
- No fabricated claims, metrics, or testimonials
