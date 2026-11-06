
# Day 43 — Optimisation & Environment

## Project
Addis Eats — Next.js

## Baseline Lighthouse Results
- Performance: 22/24 reported checks
- Best Practices: 7/8 reported checks
- Total Blocking Time: 0 ms
- Cumulative Layout Shift: 0.676
- Interaction to Next Paint: 110 ms

## Changes
- Used Next.js Image for the homepage hero.
- Added priority to the hero image.
- Added a responsive sizes attribute.
- Used next/font for Geist and Geist Mono.
- Checked for raw HTML img elements.

## Latest Lighthouse Results
- Performance: 22/24 reported checks
- Best Practices: 7/8 reported checks
- Total Blocking Time: 0 ms
- Cumulative Layout Shift: 0.753
- Interaction to Next Paint: 60 ms

## Findings
INP improved in the latest run.
CLS remains above the target of 0.1 and needs further investigation.
The image changes have not yet demonstrated a CLS improvement.
