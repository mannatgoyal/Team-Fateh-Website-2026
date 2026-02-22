# Team Fateh Website - Comprehensive Content Management Guide

This manual explains exactly how to change **every piece of text and every image** on the website. Because the site is custom-built with React (Next.js), content is distributed across specific component files. 

*Prerequisites*: You need a basic text editor (like VS Code) and an understanding of where files are located. All paths start from the `team-fateh-2026/src` directory.

---

## 📸 1. Managing Images & Media

All images, videos, and logos must be placed in the `public/` folder.

*   **Team Photos**: Place inside `public/images/team/`
*   **Sponsor Logos**: Place inside `public/images/sponsors/`
*   **Car/Action Shots**: Place inside `public/images/`
*   *Note: Next.js automatically optimizes images placed in the `public` folder.*

---

## 🚀 2. Updating Page Content (Text & Images)

To change the text or the images displayed on the website, you must edit the corresponding `.tsx` file for that page.

### 🏠 The Home Page (`/`)
*   **File Location**: `src/app/page.tsx`
*   **Hero Section Text**: Look at the top of the file inside the `<section id="hero">`.
    *   Change the massive `FATEH 2026` text here.
    *   Change the `"We don't just build cars..."` subheadline here.
*   **Hero Video/Image**: In the `Hero Section`, find `<video src="/videos/hero-loop.mp4" ...>`. Change the `src` to point to a different video or replace it with an `<Image>` tag.
*   **Mission/Stats Section**: Scroll down to the `"BY THE NUMBERS"` section to update the `2.8s`, `150kg`, etc., statistics.

### 📖 The About Page (`/about`)
*   **File Location**: `src/app/about/page.tsx`
*   **The Narrative Text**: The entire story ("The Origin", "The Shift to EV", "The Culture") is hardcoded in this file. Scroll through the file and replace the text paragraphs as needed.
*   **Images**: Find the `<Image src="/images/..." />` tags in this file and change the `src` attribute.

### 🏎️ The Cars / Evolution Wall (`/cars`)
*   **File Location**: `src/app/cars/page.tsx`
*   **How to Update**: At the very top of this file, there is an array called `const cars = [...]`.
    *   This array contains objects for `F19`, `F21`, `E-01`, and `F26`.
    *   To edit the text, specs, or images for the cars, simply modify the text strings and `/images/...` paths inside this `cars` array. Do NOT touch the rendering code below it.

### 🖼️ The Gallery (`/gallery`)
*   **File Location**: `src/app/gallery/page.tsx`
*   **How to Update**: At the top of the file, see the `const galleryImages = [...]` array.
    *   Add or remove rows in this array to add/remove photos from the masonry grid.
    *   Format: `{ src: "/images/your-photo.jpg", alt: "Description", width: 800, height: 600, category: "Action" }`

### 📞 Contact Page (`/contact`)
*   **File Location**: `src/app/contact/page.tsx`
*   **How to Update**: Edit the `<a href="mailto:...">` tags and address strings directly in the HTML structure of this file.

---

## 👥 3. Updating Dynamic Data (JSON)

For pages that change frequently (like the Team Roster or Sponsors), we separated the data into JSON files so you don't have to touch the UI code.

### 🧑‍🤝‍🧑 The Team Page (`/team`)
*   **File Location**: `src/data/team.json`
*   **How to Update**: Open the JSON file. It is organized by Season -> Department -> Member.
    *   Add new members by copying the format: `{"name": "...", "role": "...", "image": "/images/team/photo.jpg", "linkedin": "..."}`.
*   **Important**: The actual layout code is in `src/app/team/page.tsx`, but you should rarely need to edit it.

### 🤝 The Partners Page (`/partners`)
*   **File Location**: `src/data/sponsors.json`
*   **How to Update**: Open the JSON file. It is organized by Tiers (Platinum, Gold, Silver).
    *   Add new sponsors inside the appropriate array: `{"name": "...", "logo": "/images/sponsors/logo.png", "website": "..."}`.

---

## 📝 4. Writing Tech Briefs (Blog)

*   **File Locations**: Create Markdown files (`.md`) inside `src/content/blog/`
*   **How to Update**: The site automatically reads all `.md` files in this folder and turns them into blog posts.
*   **Required Header**: Every file must start with:
    ```yaml
    ---
    title: "Your Title"
    date: "2026-05-15"
    author: "Your Name"
    excerpt: "A short summary"
    tags: ["aero", "testing"]
    ---
    ```
    Write the actual article content below those dashes.

---

## 🌐 5. Global Elements (Nav & Footer)

### 🧭 Navbar
*   **File Location**: `src/components/layout/Navbar.tsx`
*   **How to Update**: At the top of the file, find the `const navLinks = [...]` array. Edit the names or URLs here to change the top menu.

### 🏁 Footer
*   **File Location**: `src/app/layout.tsx` (or a dedicated `Footer.tsx` if created).
*   **How to Update**: Scroll to the bottom of the Root Layout to find the footer text and social links.

---
**Golden Rule**: *If you break the site while editing text (e.g., deleting a critical `{` or `<`), look at the terminal where `npm run dev` is running. It will tell you exactly which file and line number caused the error.*
