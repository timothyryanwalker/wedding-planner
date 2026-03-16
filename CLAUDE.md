# Wedding Planner — Project Context

## What this is
A wedding planning app for tracking tasks, vendors, budget, and goals.
Built web-first (React + Vite), with iOS (Expo) planned for the future.
Currently in Phase 1 — building Dashboard + Tasks.

## Stack
- Frontend: React (Vite)
- Backend: Supabase (PostgreSQL, auth, real-time)
- Routing: react-router-dom
- Hosting: Netlify (planned)

## Aesthetic
Soft romance: warm ivory, dusty rose, sage green, champagne gold.
Fonts: Playfair Display (headings) + Jost (body) via Google Fonts.
Thin-line icons. Gentle fade animations. Never flat white backgrounds.

## Design rules
- Use CSS custom properties for all colors and tokens
- Never use purple gradients, Inter-only fonts, or generic layouts
- Every component gets a clear comment explaining what it does

## Data model
Tables in Supabase: users, tasks, vendors, goals, budget_items, guests

## Code rules
- Explain what you're going to do before making any changes
- One file at a time, one feature at a time
- No duplicate CSS selectors
- Commit after every working feature
- Never make changes to more than one file at a time without approval
- When I paste code or errors, diagnose before fixing

## Current focus
Building Dashboard + Tasks first.