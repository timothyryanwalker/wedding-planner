# Wedding Planner — Project Context

## What this is
A wedding planning app for tracking tasks, vendors, budget, and goals.
Built web-first (React + Vite), with iOS (Expo) planned for the future.

## Stack
- Frontend: React (Vite)
- Backend: Supabase (PostgreSQL, auth, real-time)
- Routing: react-router-dom
- Hosting: Netlify (planned)

DOCUMENTATION:
When answering questions about React, Vite, Tailwind, or Supabase, 
always use context7 to fetch current docs before responding.

## Aesthetic
Warm romance palette. Thin-line icons. Gentle fade animations. Never flat white backgrounds.

**Font:** Helvetica Neue (system font — no Google Fonts import)

**Palette:**
- `#300e0f` — dark brown-burgundy (headings)
- `#7d0a2e` — burgundy (primary accent)
- `#8a7d10` / `#a89e1a` — olive (secondary accent)
- `#6fa898` / `#cdddd4` — sage teal (success/progress)
- `#d94f35` / `#f0896a` — terracotta / coral (warm accents, overdue)
- `#f9e8dc` / `#fdf9f0` — blush / ivory (backgrounds)

## Design rules
- Use CSS custom properties for all colors and tokens
- Never use purple gradients, Inter-only fonts, or generic layouts
- Every component gets a clear comment explaining what it does

## Data model
Tables in Supabase: users, tasks, vendors, goals, budget_items, guests

**tasks** fields include: id, title, completed, dueDate, owner (Taylor/Timothy/Both), category, priority (High/Medium/Low)

## Code rules
- Explain what you're going to do before making any changes
- One file at a time, one feature at a time
- No duplicate CSS selectors
- Commit after every working feature
- Never make changes to more than one file at a time without approval
- When I paste code or errors, diagnose before fixing

## What's been built
- **NavBar** — fixed top nav, all six routes, active link highlighting
- **Dashboard** — romantic editorial hero (couple name, date, countdown), TaskSummary, BudgetSnapshot, GoalProgress widgets
- **Tasks page** — full task list with filter by status/owner, sort by due date/priority/owner/category, priority color borders, owner badges, overdue highlighting; add/edit/delete via slide-in Drawer + TaskForm
- **Vendors page** — vendor cards in responsive grid, multi-select category/status filters, add/edit/delete via VendorModal
- **Budget page** — summary cards, progress bar, payment list grouped by category; add/edit/delete via slide-in Drawer + BudgetItemForm
- **Auth** — Supabase Google OAuth via AuthContext, ProtectedRoute, Login page
- **Routing** — react-router-dom wired in App.jsx

### Shared components
- **DiamondDivider** — reusable ◇ divider; `centered` prop for Dashboard hero variant; used on all pages
- **PageHeader** — reusable page title + summary + DiamondDivider; used by Tasks, Vendors, Budget
- **Drawer** — reusable slide-in drawer shell; props: isOpen, onClose, title, children
- **TaskForm** — add/edit task form, rendered inside Drawer
- **BudgetItemForm** — add/edit budget item form, rendered inside Drawer
- **TaskCard** — single task row (display-only; clicking opens Drawer)
- **TaskFilter** — status/owner/sort pill filter bar
- **VendorCard** — vendor summary card (clicking opens VendorModal)

## Current phase
Dashboard, Tasks, Goals are wired to Supabase with full CRUD.
Vendors page is being wired to Supabase (in progress).
Next step: complete vendor CRUD, then wire Budget page.

### Supabase tables live
- **goals** — full CRUD via AppDataContext
- **tasks** — full CRUD via AppDataContext
- **vendors** — migration created, CRUD being added to AppDataContext
- **vendor_payments** — migration created, managed as sub-records of vendors
