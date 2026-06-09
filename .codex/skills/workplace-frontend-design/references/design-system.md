# Workplace Frontend Design System

## Product Character

Workplace is a practical full-stack job board demo with two audiences:

- Job seekers: browse jobs, search/filter, inspect job details, manage profile, sign in to apply.
- Employers: operate job posts, requests, and hiring pipeline activity from a console.

The UI should feel commercial, quiet, and operational. It should not feel like a generic template landing page.

## Visual Foundation

### Color Roles

- Page background: `bg-gray-50` for public/auth pages, `bg-gray-100` for operational dashboard shells.
- Main panel: `bg-white border border-gray-200 shadow-sm`.
- Strong dark surface: `bg-gray-950 text-white` for employer sidebar and auth/about support panels.
- Brand primary: `blue-700` for primary buttons, section labels, icons, and active UI.
- Brand hover: `blue-800` or `blue-900`.
- Subtle selected state: `bg-blue-50 border-blue-500 text-blue-700`.
- Muted text: `text-gray-500` or `text-gray-600`.
- Primary text: `text-gray-950` for headings, `text-gray-800` for labels.
- Error: `bg-red-50 text-red-700` or `text-red-600`.
- Success: `bg-green-50 text-green-700`.

Avoid blue-purple gradients, decorative blobs, bokeh/orbs, and beige/brown palettes.

### Typography

- Body font: current app default sans-serif.
- Brand text: `text-2xl font-bold text-blue-600`.
- Page eyebrow: `text-sm font-semibold uppercase tracking-wider text-blue-700`.
- Dark-surface eyebrow: `text-sm font-semibold uppercase tracking-wider text-blue-200`.
- Page H1/H2: `text-3xl font-extrabold text-gray-950`; use `text-4xl` or `text-5xl` only for true public hero/about headers.
- Panel title: `text-xl font-extrabold text-gray-950`.
- Labels: `text-sm font-semibold text-gray-800`.
- Body/help text: `text-sm leading-6 text-gray-600`; dark surfaces use `text-gray-300`.

Letter spacing should be normal except uppercase eyebrows.

### Shape And Elevation

- Standard radius: `rounded-md`.
- Larger panels: `rounded-lg`.
- Avoid `rounded-xl` unless preserving existing legacy UI; new work should use 6-8px radius.
- Panel shadow: `shadow-sm`.
- Primary public job cards may use `shadow-md hover:shadow-lg`.
- Avoid nested cards. Put repeated rows/items in panels, not cards inside cards.

## Layout Patterns

### Public App Shell

- Use `EmployeeLayout` with navbar + outlet + footer.
- Navbar is white, 64px tall, with blue `Workplace` brand and gray nav links.
- Keep public pages centered with `max-w-6xl` or `max-w-7xl`, `px-4 sm:px-6 lg:px-8`.

### Auth Pages

Use a two-column shell:

```jsx
<div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
  <div className="mx-auto grid max-w-5xl overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl lg:grid-cols-[...]" />
</div>
```

One side is the form. The other is a dark or blue support panel hidden on mobile:

- Blue support panel for login: `bg-blue-700 text-white`.
- Dark support panel for signup/forgot password: `bg-gray-950 text-white`.
- Form section padding: `p-6 sm:p-10`.
- Inputs: `min-h-12 rounded-md border border-gray-300 px-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100`.

### Employer Console

Use a two-region operational layout:

- Left sidebar: `bg-gray-950 text-white lg:sticky lg:top-0 lg:h-screen lg:w-72`.
- Content region: `min-w-0 flex-1`.
- Header band: `border-b border-gray-200 bg-white`.
- Content max width: `max-w-7xl px-4 py-6 sm:px-6 lg:px-8`.

Sidebar:

- Brand card: `rounded-lg border border-white/10 bg-white/5 p-4`.
- Navigation item: `flex min-h-11 items-center gap-3 rounded-md px-3 text-sm font-semibold`.
- Selected nav: `bg-blue-600 text-white shadow-sm`.
- Unselected nav: `text-gray-300 hover:bg-white/10 hover:text-white`.
- Logout: bottom aligned, full-width, dark subtle button with red hover accent.

Dashboard content:

- KPI cards: 4-column on desktop, `rounded-lg border border-gray-200 bg-white p-5 shadow-sm`.
- Tables: `min-w-full divide-y divide-gray-200`, uppercase small headers, row padding `py-4`.
- Status chips: rounded-full, small bold text, subtle colored background + ring.

### Public Job Lists

- Use `grid auto-rows-fr grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3`.
- Job cards should have equal height within rows: `flex h-full min-h-80 w-full flex-col`.
- Job card primary CTA should sit at bottom using `flex-1` on body content.
- Search fields should route through URL query params where possible.

## Components

### Buttons

Primary:

```jsx
className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md bg-blue-700 px-4 text-sm font-semibold text-white transition hover:bg-blue-800"
```

Secondary:

```jsx
className="inline-flex min-h-10 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-800 transition hover:border-blue-300 hover:text-blue-700"
```

Danger:

```jsx
className="inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-red-200 px-3 text-sm font-semibold text-red-700 transition hover:bg-red-50"
```

Icon use:

- Prefer `react-icons/md` for workflow/product icons.
- Buttons with operational meaning should include icons where available.
- Do not hand-draw SVG icons when a library icon exists.

### Forms

- Use controlled state.
- Clear errors before submit.
- Use disabled state while submitting.
- Labels above inputs.
- Error text below affected input.
- Form success/error messages use tinted rectangular bands.
- Keep role/account choices as bordered selectable blocks, not tiny radio-only controls.

### Panels

Panel wrapper:

```jsx
<section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
  <div className="mb-5 flex ... border-b border-gray-100 pb-4">
    <h3 className="text-xl font-extrabold text-gray-950" />
    <p className="mt-1 text-sm text-gray-500" />
  </div>
</section>
```

Use panels for dashboards, tables, forms, and grouped content. Do not make entire page sections look like floating cards.

### Status Chips

Use semantic, subtle colors:

- New: `bg-blue-50 text-blue-700 ring-blue-100`
- Reviewing: `bg-amber-50 text-amber-700 ring-amber-100`
- Interview: `bg-purple-50 text-purple-700 ring-purple-100`
- Shortlisted: `bg-green-50 text-green-700 ring-green-100`

Base:

```jsx
className="inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1"
```

## Interaction Rules

- Keep search and filter state visible in inputs.
- Use URL query params for user-facing search state.
- Preserve existing API/provider hooks where possible: `useJobs`, `api`, auth contexts.
- For protected content, show a purposeful overlay with sign-in and create-account actions.
- After adding UI, verify the route in the in-app browser and check text does not overflow.

## Do Not

- Do not add marketing-style split hero layouts to operational screens.
- Do not use decorative gradient blobs/orbs.
- Do not use oversized rounded cards for compact dashboard/admin content.
- Do not use negative letter spacing.
- Do not create new color themes for individual pages.
- Do not add new component libraries unless the user asks.
- Do not change API behavior just to style a screen.
