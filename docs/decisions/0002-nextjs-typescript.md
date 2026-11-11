# 0002 — Next.js and TypeScript for the web app

Date: 2026-11-10
Status: Accepted
Decision: Build the site with Next.js (App Router) and TypeScript.
Context: The user needs a learning site that will grow with many courses and integrate a Claude Design canvas.
Rationale: Chosen by the user. Per-level routes, static generation, room for MDX content, and simple hosting.
Consequences: React 19 and Next.js 15; routes are statically generated; Node.js tooling.
Alternatives_Rejected: Vite + React (no static or server rendering per route). Plain HTML/CSS/JS (closest to the design, but hard to scale with lots of content).
