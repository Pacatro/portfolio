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

### Primary
- `#1e2030` — Dark base background (body, sections)
- `#363a4f` — Card/panel border and accents
- `#c6a0f6` — Primary accent (link text, project names)
- `#494d64` — Hover state border/background

### Secondary
- `#24273a` — Hover background for project cards
- `#a5adcb` — Secondary text/navigation inactive state
- `#cad3f5` — Secondary text/navigation hover state
- `#8bd5ca` — GitHub link accent
- `#eed49f` — Star rating accent

### Neutral
- `#939ab7` — Muted text, subtle dividers

## Typography

**Font Family:** Mononoki Nerd Font (monospace)
- Display/headline: `'"Mononoki Nerd Font"', monospace`
- Body text inherits the base stack

**Hierarchy:**
- Project names: `text-lg font-bold leading-6 tracking-[-0.02em] text-[#c6a0f6] sm:text-xl`
- Project descriptions: `text-sm leading-6 text-[#a5adcb] sm:text-base sm:leading-7`
- Section navigation: `text-sm font-semibold capitalize text-[#a5adcb] no-underline`
- Header name: `text-lg font-bold tracking-[-0.02em] text-[#c6a0f6] sm:text-xl`

## Layout

**Page Shell:** Centered max-width `w-full max-w-5xl` with `mx-auto`
**Header:** Fixed border-bottom, flex wrap with gap, responsive to `sm:flex-nowrap`
**Project Grid:** CSS Grid, `grid w-full gap-4 md:grid-cols-2`
**Navigation:** Grid of section links, `grid w-full grid-cols-3 items-center gap-1 sm:flex sm:w-auto`

## Elevation

**Card/Panel:** `border border-[#363a4f] bg-[#1e2030]` with `rounded-xl`
**Hover States:** `transition-colors hover:border-[#494d64] hover:bg-[#24273a]`
**Active States:** `active:border-[#8aadf4] active:text-[#cad3f5]`

## Components

**Header Button:** Grid layout `grid h-11 w-11 shrink-0 place-items-center sm:h-10 sm:w-10`, SVG terminal icon, opacity transition on hover
**Navigation Links:** `flex min-h-11 items-center justify-center border-b-2 border-transparent px-2 py-2`, text color transitions on hover/active
**Project List Item:** Rounded border `rounded-xl`, background `bg-[#1e2030]`, border `border border-[#363a4f]`, transition `transition-colors`
**Language Tag:** Rounded background `rounded bg-[#363a4f] px-2 py-1 text-[#b8c0e0]`
**Topic Tags:** `break-all #{topic}`
**Star Rating:** `tabular-nums text-[#eed49f]` with aria-label of star count

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