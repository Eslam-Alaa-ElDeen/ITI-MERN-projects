# Pato Place — Restaurant Landing Page

A responsive, single-page restaurant website built with plain HTML, CSS, and vanilla JavaScript. It showcases the restaurant's story, menu highlights, gallery, upcoming events, customer reviews, and includes a validated table reservation form.

## Features

- **Hero / Welcome section** — full-width intro banner with call-to-action
- **About ("Italian Restaurant")** — brand story with supporting image
- **Discover** — section header introducing the restaurant
- **Menu highlights** — featured food categories/images
- **Events** — upcoming restaurant events with imagery
- **Reservation form** — client-side validated booking form (name, phone, email, date, time, party size)
- **Reviews** — customer testimonials with avatars
- **Video section** — background video/cover section
- **Newsletter signup** — email capture section
- **Scroll-to-top button** — appears after scrolling and smoothly returns to the top
- **Responsive layout** using a shared CSS reset

## Tech Stack

| Layer      | Details                                              |
|------------|-------------------------------------------------------|
| Markup     | HTML5                                                 |
| Styling    | CSS3 (`reset.css` + `final_task.css`)                 |
| Scripting  | Vanilla JavaScript (`task.js`)                        |
| Fonts      | Google Fonts — Courgette, Poppins                     |
| Icons      | Font Awesome 6.5.0 (via CDN)                          |

## Project Structure

```
pato-place-landing-page/
├── final_task.html      # Main page markup
├── final_task.css       # Page-specific styles
├── reset.css            # Browser style reset/normalization
├── task.js              # Scroll-to-top button + reservation form validation
├── photos/              # All images, icons, and GIFs used across the page
└── README.md
```

## Reservation Form Validation

Handled entirely client-side in `task.js`, with inline error messages and `valid`/`invalid` styling classes:

- **Name** — must be at least 3 characters
- **Date** — required
- **Time** — required
- **Phone** — must be 10–11 digits
- **Party size** — required
- **Email** — must match a standard email pattern

On success, a confirmation alert is shown (`"Reservation submitted successfully!"`). Replace this with a real API/backend call to actually store or send reservations.

## Getting Started

1. Download or clone this folder.
2. Keep the folder structure intact (the HTML references `photos/`, `reset.css`, and `final_task.css` with relative paths).
3. Open `final_task.html` directly in your browser, or serve it with a simple local server, e.g.:
   ```bash
   npx serve .
   # or
   python3 -m http.server
   ```

## Known Issues / Suggested Improvements

- Navigation links (Home, Menu, Reservation, etc.) currently point to placeholder `http://` URLs — wire these up to real sections/pages.
- Image paths use backslashes in a couple of places (`photos\logo.jpg`), which only works on Windows-style path resolution in some setups — consider switching all paths to forward slashes for cross-platform consistency.
- The mobile menu icon (hamburger) has no toggle behavior yet — add JS to open/close a mobile nav.
- Some placeholder body copy (Lorem ipsum-style text) should be replaced with real content.
- Consider connecting the reservation form to a real backend or third-party booking service instead of a JS-only `alert()`.

## Credits

Images and icons are placeholder assets used for template/demo purposes. Replace with licensed or original photography before using this in production.
