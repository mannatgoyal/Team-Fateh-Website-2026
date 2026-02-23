---
title: "Precision Engineering on the Web: Building the New Team Fateh Experience"
date: "2026-02-22"
author: "Mannat Goyal"
excerpt: "A look under the hood of our new high-performance website, the engineering philosophy behind it, and a guide to finding its hidden features."
tags: ["Engineering", "Web", "Easter Eggs"]
---

## The Philosophy: The Site IS the Car

When we set out to build the new digital home for Team Fateh, we didn’t just want a corporate brochure. We wanted a platform that reflected the same ethos we bring to the track: high-performance, precision engineering, and an obsession with speed.

Out went the bloated templates. In came a custom **Next.js**, **React**, and **TailwindCSS** application, orchestrated with **Framer Motion** for physics-based animations. Just like our EV powertrain, every component on this site is optimized for efficiency and immediate response.

We adhered to a strict aesthetic: **Matte Black** and our signature **Racing Orange**, with a default monochrome treatment for images that only saturates when you interact with them. It’s a disciplined, no-nonsense look—until you discover what’s hidden beneath the surface.

*Special Note: The development of this new digital experience was generously funded by Harnoor Singh, a proud Team Fateh alumnus from the Batch of 2018.*

## Easter Eggs: Engineering the Fun

Formula Student is serious business, but we are also huge motorsport geeks at heart. We decided to gamify the site by hiding a series of Easter eggs across the platform. If you know where to look (or what to type), you can unlock some serious performance modes.

Here’s your official cheat sheet to the Team Fateh digital garage:

### 1. The Global F1 Driver Overrides
We’ve wired up a global keystroke listener that runs silently in the background of every page on the site. If you type the name of a driver from the 2025 F1 Grid, the entire website’s UI temporarily overrides to match their team’s livery and iconic radio messages:
*   Type **`leclerc`**, **`hamilton`**, or **`ferrari`** to engage Rosso Corsa mode.
*   Type **`russell`** or **`mercedes`** to engage Petronas Teal mode.
*   Type **`sainz`**, **`albon`**, or **`williams`** to engage Williams Blue mode.
*   Type **`max`** or **`redbull`** to engage Red Bull Racing mode.

*(Hint: Make sure you aren't currently typing inside a form or search bar when you do this!)*

### 2. Redline Mode: `F A T E H`
Want to push the site to its absolute limits? Type our name—`F A T E H`—anywhere on your keyboard. 

This triggers a global "Redline Mode," bathing the entire site in a critical, pulsing crimson overlay. If you have your audio up, you might even catch a familiar sound. Your telemetry HUD in the corner will also switch to a critical warning state.

### 3. The Endurance Simulator Mini-Game
If you navigate to the **Cars** page, hover just below the phrase "Scroll to Explore" on the hero screen. A hidden, glitching `[SYS_OVERRIDE]` button will reveal itself.

Clicking it launches the **Endurance Simulator**. It’s a physics-based mini-game where you manage the throttle (Power Request) of our EV to try and survive the grueling 22km Formula Student Endurance event without entirely draining the High-Voltage Accumulator. It’s harder than it looks!

### 4. The 5-Light Reaction Test
Are your reflexes quick enough for the grid? Click the **Team Fateh Logo** in the primary navigation bar **3 times quickly**. 

The screen will dim, and a standard F1 five-light start sequence will begin. Wait for the lights to go out and click as fast as humanly possible. The site will benchmark your reaction time in milliseconds and rank you against the entire paddock—from Max Verstappen down to a grandma driving a Prius.

### 5. Departmental "Auras" on the Roster
Head over to the **Team** page and slowly hover your mouse over the various engineering leads. You’ll notice their portraits react differently depending on their discipline:
*   **Aerodynamics:** Look closely, and you'll see horizontal wind tunnel flow-lines moving across their portrait.
*   **Powertrain/Electronics:** Sparking animations and PCB grid traces mapping across the image.
*   **Vehicle Dynamics:** A jittery, red-dot G-Force reticle locking onto their card.
*   **Management:** A stamped *CLASSIFIED* clearance warning overlaying their photo.

## Join the Grid

We didn't just build these features to show off—we built them because we are obsessed with creating things that perform exactly as intended, whether it's on a physical race track or a digital canvas.

If you inspected this page, played the hidden games, and thought, *"I could build something faster"*—then you belong on our team. 

[**Head to the Contact Page and join the roster.**](/contact)
