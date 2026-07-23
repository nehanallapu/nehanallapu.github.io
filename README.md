# Neha Nallapu — Portfolio

Personal portfolio for Neha Nallapu, Compliance & Patient Safety Specialist.
Static HTML/CSS/JS — no build step, no frameworks. Designed to be hosted free on GitHub Pages.

Theme: **vCard** (dark charcoal + gold gradient, Poppins), a fixed sidebar with tabbed content
(About · Resume · Projects · Contact), plus a full case-study page for the featured Tableau
project with the live dashboard embedded via the Tableau Embedding API v3.

## Structure
```
index.html                     # homepage (sidebar + About/Resume/Projects/Contact tabs)
nursing-home-compliance.html   # Tableau case study (live embedded dashboard)
assets/
  css/styles.css               # single stylesheet, CSS custom properties
  js/main.js                   # tab nav, mobile contacts toggle, count-up, contact form
  img/avatar.svg               # placeholder headshot — replace with a real photo
# linked by the "Download résumé" button
favicon.svg
.nojekyll                      # serve files as-is (skip Jekyll processing)
```

## Things to personalize
- **Headshot** — replace `assets/img/avatar.svg` with a real photo (e.g. `assets/img/neha.jpg`)
  and update the `<img src>` in `index.html`.
- **Social links** — set the `href="#"` placeholders in the sidebar (LinkedIn, GitHub).
  Tableau Public is already wired.
- **Contact form** — submits via the visitor's email app by default (works on GitHub Pages).
  To collect submissions server-side, create a [Formspree](https://formspree.io) form and set
  the `<form action="…">` in `index.html` to your endpoint.

## Run locally
```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages
1. Create a repo (for the cleanest URL, name it `<username>.github.io`).
2. Push these files to the repo root on the `main` branch.
3. Repo → Settings → Pages → Source: `main` / `/ (root)`.
4. The site publishes at `https://<username>.github.io/` (or `/<repo>` for a project repo).
