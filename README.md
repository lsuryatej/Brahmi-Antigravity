# Brahmi Website

A modern, interactive website showcasing cultural artifacts and craftsmanship, built with Next.js 14+ and advanced motion design.

[![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)](https://tailwindcss.com/)

## ✨ Features

- **Scroll-Driven Animations**: Pinned video reveals and parallax effects using GSAP ScrollTrigger
- **Smooth Scrolling**: Lenis integration for buttery-smooth scroll experience
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Responsive Design**: Mobile-first approach with elegant layouts
- **Framer Motion**: Rich animations and micro-interactions
- **Contact Form**: Client-side validation with beautiful UX

## 🚀 Quick Start

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (routes)/
│   │   ├── about/         # About page
│   │   ├── catalogue/     # Catalogue page
│   │   └── contact/       # Contact page
│   ├── layout.tsx         # Root layout with navbar & footer
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles & theme
├── components/
│   ├── hero/              # Hero section with video reveal
│   ├── landing/           # Landing page sections
│   ├── layout/            # Navbar, Footer
│   ├── contact/           # Contact form
│   └── ui/                # shadcn/ui components
└── lib/
    └── motion/            # Animation utilities (GSAP, Framer Motion)
```

## 🎨 Tech Stack

**Framework & Build**
- Next.js 16.0.3 (App Router + Turbopack)
- TypeScript 5
- React 19

**Styling**
- Tailwind CSS 4.1
- shadcn/ui
- Host Grotesk & Space Mono fonts

**Animation**
- Framer Motion
- GSAP + ScrollTrigger
- Lenis (smooth scroll)

**UI Components**
- Radix UI primitives
- Lucide React icons
- Custom motion primitives

## 🛠️ Development

```bash
# Lint code
npm run lint

# Type check
npm run build

# Run development server with turbo
npm run dev
```

## 🎬 Key Features

### Hero Sequence
Scroll-driven video reveal with:
- Pinned section that locks during scroll
- Video scrubbing based on scroll progress
- Logo zoom animation
- Multi-layer parallax backgrounds

### Collections
Staggered reveal animations showcasing product categories.

### Contact Form
Fully validated contact form with:
- Name, Email, Phone validation
- Subject dropdown (General, Partnerships, Orders, Feedback)
- Real-time error feedback
- Success animations

## 🌐 Pages

- `/` - Landing page with hero, video, and collections
- `/about` - About page with mission and values
- `/catalogue` - Product catalogue (coming soon)
- `/contact` - Contact form

## 📝 License

Private project

## 🤝 Contact

For inquiries: hello@brahmi.com
