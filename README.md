# Team Fateh - Official Website

Welcome to the digital home of **Team Fateh**, Thapar Institute of Engineering and Technology's official Formula Student Electric team. 

This repository houses our custom-engineered "Motorsport Brand Platform" website, built from the ground up to reflect the same precision, performance, and obsession with speed as our race cars.

## 🏎️ Tech Stack

*   **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
*   **UI Library:** [React 19](https://react.dev/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Content:** Local JSON (Team Roster) & Markdown (Blog)
*   **Forms:** EmailJS

## 📂 Architecture & Folder Structure

We don't use a CMS. The site is statically generated and highly optimized. Here is where you can find everything to maintain and update the site:

```
├── src/
│   ├── app/              # Next.js App Router (Pages & Layouts)
│   ├── components/       # Reusable UI components (Nav, Footer, Cards)
│   ├── content/blog/     # .md files for Tech Briefs & Articles
│   ├── data/             # .json files (Team Rosters, Car Specs)
│   └── lib/              # Utility functions and React Context (Easter Eggs)
├── docs/                 # Detailed architectural guides
└── public/               # Static assets (Images, Logos, Fonts)
```

## 🛠️ Quick Start (Running Locally)

To take over development or test new features, you'll need Node.js installed on your machine.

1.  **Clone the repository:** `git clone [YOUR_GITHUB_URL]`
2.  **Install dependencies:** `npm install`
3.  **Start the development server:** `npm run dev`
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Essential Maintenance Guides

We have written detailed documentation for the two most common tasks future team members will need to perform:

### 1. Updating the Team Roster
If you need to add new members or transition leadership:
*   Add their cropped, compressed photo to `public/images/Team/`.
*   Update `src/data/team_current.json` with their `name`, `role`, and `image` path.
*   *(Note: If an image is missing, the site will automatically render a sleek Team Fateh helmet placeholder!)*

### 2. Publishing a Blog Post (Tech Brief)
To publish a new article to the site:
*   Create a new `.md` file inside `src/content/blog/` (use kebab-case for the filename, e.g., `my-new-post.md`).
*   Include the YAML Frontmatter at the top (Title, Date, Author, Excerpt, Tags).
*   The site uses standard Markdown and supports LaTeX equations for deep engineering briefs!

*(For detailed image upload instructions, see [docs/IMAGE_UPLOAD_GUIDE.md](./docs/IMAGE_UPLOAD_GUIDE.md))*

## ⚡ The Easter Eggs

This site isn't just a brochure; it's a massive interactive playground for motorsport geeks. We've hidden several F1-inspired Easter eggs and interaction models throughout the platform:

*   **Global Driver Overrides:** Type `lando`, `hamilton`, `sainz`, `russell`, or `max` anywhere on the site for a full-screen UI override.
*   **Endurance Simulator:** A hidden physics mini-game on the `/cars` page.
*   **Reaction Light Game:** A hidden 5-light F1 start sequence triggered from the Navbar logo.

*(For the complete technical breakdown of how these work, read [docs/FEATURES_GUIDE.md](./docs/FEATURES_GUIDE.md))*

---

**Built with sweat, late nights, and an uncompromising obsession with performance.**
*The Fateh Standard.*
