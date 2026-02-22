# Team Fateh Website - Features & Architecture Guide

This document details the advanced interactive features, Easter eggs, and the underlying architectural decisions of the Team Fateh "Motorsport Brand Platform" website.

## Architectural Philosophy
*   **The Site IS the Car**: The design language treats the UI as a piece of precision engineering.
*   **Matte Black & Precision Orange**: Strict adherence to a dark theme (`#0a0a0a` background) with high-contrast, intentional accent coloring (`#FFA51F`).
*   **Monochrome by Default**: Sponsor logos and team photos are desaturated until interacted with, establishing a unified, disciplined aesthetic.

## Easter Eggs & Interactives

We have implemented several hidden features to gamify the experience and reflect the engineering culture. State for these is globally managed by `EasterEggContext` (`src/lib/EasterEggContext.tsx`).

### 1. "Redline Mode" (Global Override)
*   **Type**: Aggressive Aesthetic Override.
*   **Trigger**: Type the sequence `F A T E H` anywhere on the site.
*   **Effect**: 
    *   Triggers an audio cue (if configured).
    *   Injects a global pulsing red overlay (`mix-blend-overlay`).
    *   The Telemetry HUD switches to a critical warning state (red text, aggressive borders).
*   **Architecture**: `window.addEventListener('keydown')` buffers keystrokes and checks against the target sequence. Toggles global state.

### 2. Endurance Simulator (Mini-Game)
*   **Type**: Interactive Physics Simulation.
*   **Location**: The Cars Page (`/cars`).
*   **Trigger**: Hover below the "Scroll to Explore" text on the first slide to reveal a hidden `[SYS_OVERRIDE]` button. Click it.
*   **Gameplay**: 
    *   Simulates the 22km Formula Student Endurance event.
    *   User controls a "Power Request" slider (0-100%).
    *   Higher power increases speed (`km/h`) but drains the High Voltage (HV) battery exponentially. 
    *   The goal is to finish 22km with >0% battery.
*   **Architecture**: Built in `EnduranceSimulator.tsx`. Uses a `setInterval` physics loop tied to Framer Motion values. Triggered via a `CustomEvent` dispatched from the Cars page and caught by the Root Layout.

### 3. F1 Reaction Time Game
*   **Type**: Overlay Mini-Game.
*   **Trigger**: Rapidly click the **Team Fateh Logo** (in the Navbar) **3 times**.
*   **Gameplay**: 
    *   An F1 5-light start sequence executes (Red lights turn on one by one).
    *   After a random delay (1-3s), the lights go out.
    *   User clicks as fast as possible to record their reaction time in milliseconds.
    *   Provides a tiered ranking (e.g., "Max Verstappen" vs "Grandma in a Prius").
*   **Architecture**: Built in `ReactionTimeGame.tsx`. State is managed via `EasterEggContext`.

### 4. Global F1 Driver Keystrokes
*   **Type**: Full-Screen UI State Override.
*   **Location**: Global across the entire application.
*   **Trigger**: Silently type specific driver names anywhere on the screen (when not focused on a form input).
*   **Active Triggers & Effects**: 
    *   `lando`, `piastri` or `mclaren` -> McLaren Papaya Orange overlay, dropping confetti, and "PIASTRI IS FASTER." text.
    *   `leclerc`, `hamilton` or `ferrari` -> Ferrari Rosso Corsa overlay, dropping confetti, and "WE ARE CHECKING..." text.
    *   `russell` or `mercedes` -> Mercedes Teal overlay, dropping confetti, and "BONO MY TYRES ARE GONE." text.
    *   `albon`, `sainz` or `williams` -> Williams Blue overlay, dropping confetti, and "ALBONO TO THE RESCUE." text.
    *   `max` or `redbull` -> Red Bull Deep Blue overlay, dropping confetti, and "MAX MAX MAX SUPER MAX." text.
*   **Architecture**: Built in `EasterEggController.tsx`. Uses a global `window.addEventListener('keydown')` to buffer the last 20 keystrokes and match substrings. Renders via Framer Motion's `AnimatePresence` mapped to `src/app/layout.tsx`.

### 5. Department-Specific "Aura" Effects
*   **Type**: Visual Hover Effects.
*   **Location**: The Team Page (`/team`).
*   **Effect**: Hovering over a team member's card triggers a specific visual effect based on their department string in `team.json`:
    *   **Powertrain/Electrical**: Blue high-voltage sparks (`lucide-react` Zap icon + CSS animation).
    *   **Aerodynamics/Dynamics**: Horizontal moving lines simulating a wind tunnel.
    *   **Accumulator/HV**: An orange/red thermal heatmap overlay.
    *   **Management/Core**: A stamped "CLASSIFIED" warning.
*   **Architecture**: Handled entirely inside `TeamCard.tsx` using conditional rendering based on substring matching of the `department` prop.

### 6. Advanced Telemetry HUD
*   **Type**: Persistent Floating UI.
*   **Location**: Bottom right corner, global.
*   **Effect**: Translates user scroll behavior into simulated vehicle telemetry.
    *   **RPM Bar**: Fills up based on scroll velocity (using Framer Motion's `useVelocity`).
    *   **Speed & Gear**: Calculated based on the "RPM".
    *   **G-Force**: A 2D dot that jitters and moves inside a circle, simulating lateral/longitudinal acceleration based on scroll intensity.

## Adding New Features
When adding new global features, inject the component in `src/app/layout.tsx` so it persists across page navigations without unmounting. Manage deep state using Context rather than prop drilling down from the layout tree.
