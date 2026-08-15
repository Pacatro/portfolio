# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People who want to understand Paco Algar Muñoz's expertise by browsing his projects.

## Product Purpose

Provide a simple portfolio page where visitors can see all of Paco's projects and understand the breadth of his expertise. Success means a visitor can quickly form an accurate picture of the work Paco does from the projects themselves.

## Positioning

The portfolio is a direct, project-led record of Paco's work across machine learning, AI research, systems programming, inference engines, and full-stack development. It favors showing the complete body of work over presenting a selective hiring funnel or a small set of case studies.

## Operating Context

Visitors arrive to browse Paco's work, scan the available projects, and follow individual projects to their source repositories. The experience is a single-page web portfolio.

## Capabilities and Constraints

- Show all projects rather than a curated subset.
- Make Paco's expertise understandable through the projects.
- Preserve a simple, low-friction single-page experience.
- Project data currently comes from Paco's public GitHub repositories.
- The implementation uses Astro and must remain suitable for static web delivery with deferred project loading.

## Brand Commitments

- Use the name Paco Algar Muñoz.
- Preserve an engineering-focused, direct voice.
- The existing terminal interaction is part of the incumbent interface, but whether it remains central is a surface-design decision rather than product truth.

## Evidence on Hand

- Public GitHub repositories for the `Pacatro` profile, including repository names, descriptions, languages, topics, star counts, and links.
- A résumé at `public/docs/resume_Paco.pdf`.
- Social links in `content.json`.
- No additional case-study copy, screenshots, project metrics, testimonials, or client claims have been provided; future work must not fabricate them.

## Product Principles

- Let the projects provide the primary evidence of expertise.
- Keep browsing simple and immediate.
- Represent the full body of work rather than ranking projects by popularity.
- Make expertise legible without requiring visitors to understand terminal commands.
- Never invent outcomes, metrics, or claims that are not supported by available evidence.

## Accessibility & Inclusion

The project already establishes semantic landmarks, visible keyboard focus, reduced-motion behavior, and responsive web support; future work should preserve these baselines.
