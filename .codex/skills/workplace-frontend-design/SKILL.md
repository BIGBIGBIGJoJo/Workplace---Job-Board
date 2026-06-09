---
name: workplace-frontend-design
description: Project-specific frontend design system for the Workplace Job Board React/Tailwind app. Use when creating, redesigning, or reviewing Workplace frontend pages, components, dashboards, forms, authentication screens, protected states, job cards, search flows, navigation, or any UI work that should match the existing commercial job-board style.
---

# Workplace Frontend Design

## Purpose

Use this skill to keep new Workplace frontend work visually and behaviorally consistent with the existing React/Tailwind application.

Before changing UI, inspect the nearest existing page or component and preserve its interaction model unless the user asks to change the workflow.

## Required Workflow

1. Read `references/design-system.md` before making UI changes.
2. Identify the surface type:
   - Public job-seeker surface: home, jobs, about, profile, job cards.
   - Auth surface: login, signup, forgot password, protected overlays.
   - Employer console surface: dashboard, post job, manage jobs, requests.
3. Reuse existing primitives and patterns first:
   - `rounded-md` or `rounded-lg`, not pill-heavy layouts except small badges.
   - Blue primary actions, white panels, gray page backgrounds.
   - `react-icons/md` for business/workflow icons and existing React icon imports when already used.
   - Controlled forms with visible error/success states.
4. Keep screens operational, not marketing-heavy:
   - Prefer dense, scannable information layouts.
   - Avoid decorative hero sections for admin/workflow screens.
   - Use full-width page bands or constrained layouts; avoid nested cards.
5. Validate with:
   - `npm run lint` in `frontend`.
   - `npm run build` in `frontend`.
   - Browser smoke test for changed routes.

## Key Rules

- Treat Workplace as a practical SaaS job board, not a portfolio landing page.
- Use `bg-gray-50` or `bg-gray-100` for page backgrounds and `bg-white border border-gray-200 shadow-sm` for panels.
- Use `bg-blue-700 hover:bg-blue-800 text-white` for primary actions.
- Use `border-gray-300 bg-white text-gray-800 hover:border-blue-300 hover:text-blue-700` for secondary actions.
- Use dark `bg-gray-950 text-white` blocks only for major sidebars or auth/about supporting panels.
- Keep forms aligned, labeled, and controlled. Use min heights around `min-h-11` or `min-h-12`.
- Keep dashboard/table UI compact and operational with clear hierarchy, status chips, and icon buttons.
- Avoid oversized cards, one-note gradients, decorative blobs, negative letter spacing, and page sections styled as floating cards.

## Reference

Read `references/design-system.md` for exact component patterns, color roles, spacing, typography, and page templates extracted from the current project.
