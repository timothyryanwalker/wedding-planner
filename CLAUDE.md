# Wedding Planner — Project Context

## What this is
A wedding planning app for tracking tasks, vendors, budget, and goals.
Built web-first (React + Vite), with iOS (Expo) planned for the future.

## Stack
- Frontend: React (Vite)
- Backend: Supabase (PostgreSQL, auth, real-time)
- Routing: react-router-dom
- Hosting: Netlify (planned)

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
- **Dashboard** — page header with days-to-go countdown, TaskSummary, BudgetSnapshot, GoalProgress widgets
- **Tasks page** — full task list with inline add/edit/delete, filter by status/owner, sort by due date/priority/owner/category, priority color borders, owner badges, overdue highlighting
- **Routing** — react-router-dom wired in App.jsx; placeholder pages for Vendors, Budget, Goals, Guests

## Current phase
Dashboard and Tasks are complete with hardcoded local state.
Next step: Supabase auth, then wire real data to replace sample data.
