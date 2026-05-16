# FocusFreq Sprint 7: UI Polish & Launch Readiness

## 1. Current UI Audit

The current FocusFreq UI has successfully implemented all foundational features, but it currently suffers from "Developer MVP Syndrome". 

**Issues to address:**
* **Cluttered Workspace (`/app`)**: The workspace feels heavy and dashboard-like rather than a calm, focused environment. The task list and audio controls compete for attention with the timer.
* **Timer Hierarchy**: The timer is not the undeniable center of the screen.
* **Audio Controls**: The audio panel is functional but exposes too many sliders and options at once, creating cognitive overload.
* **Visual Weight**: Too many heavy borders, overly saturated colors, and dense cards.
* **Mobile Experience**: The layout stacks everything vertically, making the user scroll past tasks and audio settings just to see the timer or vice versa.
* **Public Pages**: SEO pages are functional but lack the "premium SaaS" polish needed to convert organic traffic into workspace users.

## 2. Proposed Design Direction

**Core Philosophy:** *Pomofocus-like simplicity, but with a distinct FocusFreq identity.*

*   **Layout Direction (Timer-First)**: The Timer is the hero. It should sit dead-center in the workspace, large and unambiguous. Everything else supports the timer.
*   **Color & Typography**: 
    *   *Calm & Premium*: Shift towards a slightly darker, more ambient, "deep work" aesthetic. Use deep slate or charcoal backgrounds instead of stark blacks or bright whites.
    *   *Typography*: Clean, modern sans-serif (Inter/Outfit). Large, legible numbers for the timer.
*   **Component Style**:
    *   Reduce borders. Use **soft surfaces**, not heavy glassmorphism. Avoid excessive blur effects.
    *   Use deep slate/charcoal backgrounds, subtle card surfaces, soft shadows, and clean typography for high readability.
    *   Soften corners (rounded-xl or 2xl).
*   **Mobile Direction**: Ensure the timer and primary controls (Start/Pause/Stop) are always visible in the initial viewport. Tasks and audio should be collapsible or cleanly tucked below the fold.

## 3. Pages/Components to Polish

### The Workspace (`/app`)
*   **Layout**: Center the timer. Make it massive. 
*   **Active Focus Mode**: When the timer is running, the full task list may collapse or become secondary, but the **current active task must remain visible**. Do not hide the current task completely.
*   **AudioPanel & AudioSummary**: 
    *   Default state: A clean, single-line summary (e.g., `🎵 432 Hz · Sine · 20% | 🌧️ Brown Noise`).
    *   Expanded state: A sleek, collapsible drawer or panel. **Avoid disruptive full-screen modals**. Desktop can use a compact side/bottom panel; Mobile can use a collapsible section or bottom sheet that does not aggressively cover the timer.
*   **TaskList**: Make it compact. Remove heavy card backgrounds. Just a simple list with an active state indicator and a minimal "Add Task" input.
*   **SessionRecap**: Make the post-session summary feel rewarding but not disruptive.

### Prioritization
**P0 (Highest Priority)**:
*   `/app` workspace
*   mobile `/app`
*   AudioPanel / AudioSummary
*   Task list
*   SessionRecap
*   homepage
*   leaderboard

**P1 (Secondary Priority)**:
*   Detailed SEO page polish (using shared components to improve many pages at once)
*   Legal pages
*   Consent banner
*   Ad placeholder styling

### Public & Community Pages
*   **Homepage (`/`)**: Enhance the hero section. Make the value proposition clearer with a premium, focused aesthetic.
*   **SEO Pages (`/pomodoro-timer`, `/frequency-generator`, etc.)**: Ensure the embedded widgets look identical to the premium app workspace. Polish the typography of the SEO content.
*   **History (`/app/history`)**: Clean up the overview cards and list. Make the empty state motivating.
*   **Leaderboard (`/leaderboard`)**: Upgrade the table design. Make the ranks (especially top 3) look distinct and rewarding. Ensure the empty/loading states are polished.

### Compliance & Ads
*   **Consent Banner**: Ensure the bottom bar is sleek, uses brand colors, and doesn't obstruct mobile navigation.
*   **AdSlots**: Ensure the reserved space for ads blends nicely into the page structure and doesn't look like a broken element when empty.

## 4. Out of Scope

*   **NO** new product features.
*   **NO** changes to backend logic, Supabase schema, or RLS.
*   **NO** changes to leaderboard calculation rules.
*   **NO** changes to ad rendering logic or compliance infrastructure.
*   **NO** premium tiers, AI features, social feeds, or complex charting.

## 5. Acceptance Criteria

*   [ ] The Timer is the absolute visual center of the `/app` workspace.
*   [ ] The workspace feels calmer, lighter, and less dashboard-heavy.
*   [ ] Active task remains visible during active focus mode.
*   [ ] Full task list may collapse during active focus, but current task is never hidden.
*   [ ] Audio settings do not cover or push the timer out of primary view.
*   [ ] Audio controls are accessible but visually secondary to the timer.
*   [ ] The task list is compact, elegant, and easy to interact with.
*   [ ] Mobile layout is optimized (timer always in viewport on load).
*   [ ] Use soft surfaces, not heavy glassmorphism.
*   [ ] Public pages look polished, trustworthy, and ready for organic traffic.
*   [ ] Leaderboard looks clean and credible.
*   [ ] Zero ads or consent banners appear in `/app` or `/app/history`.
*   [ ] No major layout change breaks SEO pages or ad placement safety.
*   [ ] No ad/consent logic is modified except visual styling.
*   [ ] No new dependencies unless necessary.
*   [ ] Existing functionality (timer logic, audio generation, data saving) remains 100% intact.
*   [ ] `npm run build` passes with zero errors.
