# Full-stack portfolio repositioning

## Goal
Reframe the portfolio around React, React Native, Node.js, Laravel/PHP, and TypeScript without removing existing specialist services, projects, links, or chatbot features.

## Changes
- Reorder the stack matrix so React/TypeScript, React Native, Node.js, and Laravel/PHP are the primary product layers; retain AI, automation, infrastructure, and VoIP as supporting capabilities.
- Replace site-wide backend-only role copy with a consistent “Full-Stack Product Engineer” position across shared site data, the footer, booking page, blog metadata, project metadata, and relevant global copy.
- Update default and homepage SEO titles, descriptions, Open Graph/Twitter tags, structured data, keywords, and crawler fallback content.
- Update the chatbot’s system context so it accurately describes the expanded stack while preserving pricing, contact details, lead capture, and transcript delivery.
- Refresh `llms.txt` and `ai.txt` so answer engines see the same role, stack, services, and citation wording.
- Keep specialist Laravel, VoIP, automation, and AI service pages intact; only broaden global positioning.

## Validation
- Search for outdated Laravel-only/backend-only global wording.
- Run the project’s automated checks.
- Verify the homepage and key metadata in the browser at desktop and mobile widths.

## Technical details
- Use the existing semantic design tokens and current dark editorial presentation.
- Preserve canonical URLs, routes, JSON-LD validity, Formspree behavior, and Supabase chatbot limits.
- Deploy the updated chat edge function after its prompt changes.
