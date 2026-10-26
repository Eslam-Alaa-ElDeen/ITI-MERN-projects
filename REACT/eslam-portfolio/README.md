# 🚀 Eslam Alaa — Developer Portfolio

A premium, production-ready developer portfolio built with React + Vite, Tailwind CSS, and Framer Motion.

## ✨ Features

- **Dark futuristic theme** with glassmorphism and neon accents
- **Interactive particle background** with canvas-based animation
- **Custom cursor** with smooth ring tracking
- **Animated typing effect** in the hero section
- **Scroll-based reveal animations** with Framer Motion
- **Filter system** for projects (All / Web / Apps / Design)
- **Animated timeline** for experience & education
- **Contact form** with validation (EmailJS-ready)
- **Responsive design** — mobile, tablet, desktop
- **Loading screen** with progress indicator
- **Scroll-to-top** button
- **Theme toggle** (dark/light)
- **SEO meta tags**

## 🛠️ Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3**
- **Framer Motion 11**
- **React Intersection Observer**

## 📦 Installation

```bash
# 1. Navigate to project
cd portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📧 EmailJS Setup (Contact Form)

1. Go to [emailjs.com](https://emailjs.com) and create a free account
2. Create an Email Service and Email Template
3. Get your **Service ID**, **Template ID**, and **Public Key**
4. In `src/components/Contact.jsx`, replace the `handleSubmit` function:

```javascript
import emailjs from 'emailjs-com';

const handleSubmit = async (e) => {
  e.preventDefault();
  const errs = validate();
  if (Object.keys(errs).length) { setErrors(errs); return; }
  setErrors({});
  setStatus('sending');
  
  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      { from_name: form.name, from_email: form.email, message: form.message },
      'YOUR_PUBLIC_KEY'
    );
    setStatus('success');
    setForm({ name: '', email: '', message: '' });
  } catch {
    setStatus('error');
  }
  setTimeout(() => setStatus('idle'), 4000);
};
```

## 🎨 Customization

All content is in `src/data/portfolio.js`:
- `personalInfo` — name, bio, contact, social links
- `skills` — skill levels for progress bars
- `skillCategories` — categorized skills with icons
- `projects` — project cards
- `experience` — timeline items
- `services` — service cards

## 🏗️ Build for Production

```bash
npm run build
```

Output goes to `dist/` folder.

## 🚀 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect your GitHub repo at vercel.com
```

## 🌐 Deploy to Netlify

```bash
# Build first
npm run build

# Drag and drop the dist/ folder to netlify.com/drop
# Or use Netlify CLI:
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

## 📁 Project Structure

```
portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Sticky animated navbar
│   │   ├── Hero.jsx          # Full-screen hero with particles
│   │   ├── About.jsx         # About + animated skill bars
│   │   ├── Skills.jsx        # Categorized skills grid
│   │   ├── Projects.jsx      # Filterable project cards
│   │   ├── Experience.jsx    # Timeline layout
│   │   ├── Services.jsx      # Services cards
│   │   ├── Contact.jsx       # Contact form
│   │   ├── Footer.jsx        # Clean footer
│   │   ├── CustomCursor.jsx  # Custom cursor effect
│   │   └── UI.jsx            # ScrollToTop + LoadingScreen
│   ├── data/
│   │   └── portfolio.js      # All content data
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css             # Global styles + utilities
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

Built with 💙 by Eslam Alaa
