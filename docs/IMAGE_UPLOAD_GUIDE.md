# Team Fateh Website - Image Upload Guide

Since the `public` folder had to be reconstructed, here is the exact list of all image files required by the website code, and the specific folder they must be uploaded into. 

> **Important:** The filenames must match exactly (case-sensitive) for the website to load them successfully. Next.js will serve these automatically from the `/images/` path.

## 1. Root Images Folder
**Path:** `public/images/`

This folder contains the general website assets (logo, hero image, and gallery shots).

| Filename | Description / Component Usage |
|---|---|
| `logoW.png` | The white version of the Team Fateh logo used in the Navigation Bar. |
| `pic01.jpg` | The main hero background image shown at the very top of the homepage. |
| `grid.png` | The faint technical grid overlay pattern used on the `Cars` page and `TeamCard` components. |

---

## 2. History Folder
**Path:** `public/images/History/`

This folder powers the "Evolution Wall" horizontal scroll timeline on the `/cars` page. 

| Filename | Description / Usage |
|---|---|
| `tuff_1.png` | TUFF 01 (2008) |
| `tuff_2.png` | TUFF 02 (2009) |
| `Falcon.png` | FALCON (2010) |
| `tarkshya.png` | TARKSHYA (2011) |
| `astra.png` | ASTRA (2012) |
| `Garuda.png` | GARUDA (2013) |
| `jaeger.png` | JAEGER (2014) |
| `tuff_8.png` | TUFF 08 (2015) |
| `tuff_10.png` | TUFF 10 (2017) |
| `tuff_11.png` | TUFF 11 (2018) |
| `tuff_12.png` | TUFF 12 (2019) |
| `tuff_14.png` | TUFF 14 (2022) |
| `tuff_15.png` | TUFF 15 (2023) |
| `tuff_16.png` | TUFF 16 (2024) |
| `tuff_17.png` | TUFF 17 (2025) |
| `tuff_18.png` | TUFF 18 (2026) |

## 3. Gallery Folder
**Path:** `public/images/Gallery/`

This folder powers the masonry image grid on the `/gallery` page. 

| Filename | Description / Component Usage |
|---|---|
| `action_1.jpg` | Placeholder for an "Action" category photo. |
| `design_1.jpg` | Placeholder for a "Design" category photo. |
| `testing_1.jpg` | Placeholder for a "Testing" category photo. |
| `design_2.jpg` | Placeholder for another "Design" category photo. |
| `team_1.jpg` | Placeholder for a "Team" category photo. |
| `team_2.jpg` | Placeholder for another "Team" category photo. |

*Note: You can easily add more categories and images by adding new lines to the `galleryImages` array in `src/app/gallery/page.tsx`!*

---

## 4. Current Team Folder
**Path:** `public/images/Team/`

This folder holds the headshots of the active roster (2025 onwards) displayed at the top of the `/team` page. The team structure is defined in `src/data/team_current.json`.

| Filename | Description / Component Usage |
|---|---|
| `captain_1.jpg` | Placeholder for the Team Captain. |
| `chief_1.jpg` | Placeholder for the Chief Engineer. |

*Note: You must define individual images inside the `team_current.json` database if you wish to use completely custom file names!*

---

## 5. Sponsors Folder
**Path:** `public/images/sponsors/`

This folder holds the logos for the various tiers of sponsors (Title, Platinum, Gold, Silver) displayed on the `/partners` page. Ensure these are PNGs with transparent backgrounds (if possible) or solid high-res JPEGs. The mapping is defined in `src/data/sponsors.json`.

| Filename | Description / Component Usage |
|---|---|
| `bhagel.png` | Title Sponsor Logo (Bhagel Solar Advisors) |
| `coficab.png` | Platinum Sponsor Logo (COFICAB) |
| `mme.png` | Platinum Sponsor Logo (MME) |
| `aboutenergy.png` | Gold Sponsor Logo (About:Energy) |
| `calspan.png` | Gold Sponsor Logo (Calspan) |
| `gabriel.png` | Gold Sponsor Logo (Gabriel India) |

*(See `src/data/sponsors.json` for the full list of expected filenames!)*

---

## How to Upload to GitHub
1. Copy your image files from your computer and paste them into the exact directories listed above inside your `teamfateh-website-master` project folder.
2. Open your terminal in the `teamfateh-website-master` folder.
3. Run the following git commands to push everything directly to your repository:
   ```bash
   git add public/images/
   git commit -m "chore: upload missing image assets"
   git push origin main
   ```
