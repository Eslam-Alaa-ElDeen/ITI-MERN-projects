# Feane — Fast Food Restaurant Website
 
A modern, responsive fast-food restaurant landing page built with **Bootstrap 5** and **Font Awesome**. It includes a hero carousel, promotional offers, a filterable menu grid, an about section, a table booking form with an embedded Google Map, and a customer testimonials carousel.
 
## Live Preview
 
Open `index.html` in any modern browser — no build tools or server required (an internet connection is needed for the Google Fonts, Font Awesome CDN fallback, and the embedded Google Map).
 
## Features
 
- **Responsive navbar** — collapsible mobile menu with brand logo, nav links, and account/cart/search icons
- **Hero carousel** — 3 auto-rotating slides with headline, description, and call-to-action button
- **Promo offer cards** — highlighted weekly deals (e.g., "Tasty Thursdays", "Pizza Days")
- **Menu section** — 9 menu item cards with image, description, price, and add-to-cart button, plus category filter buttons (All, Burger, Pizza, Pasta, Fries)
- **About section** — brand story with image and "Read More" button
- **Book a Table** — reservation form (name, phone, email, party size, date) alongside an embedded Google Maps location
- **Testimonials carousel** — customer reviews with photos, rotating between slides
- **Footer** — contact info, social links, and opening hours
## Tech Stack
 
| Layer      | Details                                                       |
|------------|----------------------------------------------------------------|
| Framework  | [Bootstrap 5.3.3](https://getbootstrap.com/) (local copy + CDN fallback) |
| Icons      | Font Awesome (local `all.min.css`/webfonts)                    |
| Fonts      | Google Fonts — Great Vibes, Dancing Script                     |
| Styling    | Custom CSS (`index.css`)                                       |
| Scripting  | Bootstrap's bundled JS (carousels, navbar toggle, etc.)         |
 
## Project Structure
 
```
feane-fast-food-restaurant/
├── index.html              # Main page markup
├── index.css                # Custom styles on top of Bootstrap
├── css/
│   ├── bootstrap.min.css
│   ├── bootstrap.min.css.map
│   └── all.min.css          # Font Awesome
├── js/
│   ├── bootstrap.bundle.min.js
│   └── all.min.js           # Font Awesome JS
├── image/                    # All page imagery (menu items, offers, about, testimonials, hero backgrounds)
│   ├── about-img.png
│   ├── bg-cover-video-02.jpg
│   ├── hero-bg (1).jpg
│   ├── client1.jpg, client2.jpg
│   ├── f1.png – f9.png       # Menu item photos
│   └── o1.jpg, o2.jpg        # Offer card photos
├── webfonts/                 # Font Awesome icon fonts (.woff2)
└── README.md
```
 
## Getting Started
 
1. Download or clone this folder, keeping the structure intact (relative paths depend on `css/`, `js/`, and `webfonts/`).
2. Open `index.html` directly in your browser, or serve it locally:
```bash
   npx serve .
   # or
   python3 -m http.server
```
 
## ⚠️ Known Issues / To Do
 
- **Duplicate Bootstrap/Font Awesome loading** — the page loads Bootstrap CSS/JS and Font Awesome CSS both locally *and* from a CDN. Pick one source (local files are safer for offline use) to avoid loading the library twice.
- **Placeholder links** — nav items, social icons, and buttons currently point to `#`; wire these up to real pages/anchors.
- **Menu filter buttons** (All, Burger, Pizza, Pasta, Fries) have no JavaScript behavior yet — currently decorative only.
- **Leftover training markup** — a `<!--this is for training-->` Bootstrap grid demo (`col-1`, `col-1`, `col-1`) sits right before the closing `</body>` tag; remove it for production.
- **Book a Table form** has no submit handler or validation — hook it up to a backend or add client-side validation (see the Pato Place project for a reference implementation).
- Replace placeholder Lorem Ipsum copy with real content.
## Credits
 
Based on a free HTML/Bootstrap restaurant template ("Feane") distributed via ThemeWagon, per the footer credit. Replace demo images and copy before using in production.
 