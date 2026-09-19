# AETHER — Intelligence Without Boundaries

A cinematic, interactive website for **AETHER**, a fictional AI company built around one idea:

> **One intelligence. Infinite possibilities.**

AETHER is a frontend portfolio project exploring how a premium AI brand could feel when motion, typography, particles, and product storytelling work as one system. The experience is built from scratch with React, Three.js, GLSL, GSAP, and Framer Motion. It does not copy an existing AI company or depend on a background video.

[View the live experience](https://aether-intelligence-evolve.hrsshhh17shukla06.chatgpt.site/)

## Project Overview

The site presents AETHER as a complete fictional product ecosystem. Its central visual is a custom WebGL particle system that reacts to the cursor and transforms as the visitor scrolls:

```text
Particle sphere → Neural network → Dispersed particles
                → “One intelligence. Infinite possibilities.”
                → AETHER symbol and wordmark
```

The visual transformation connects the whole page instead of acting as an isolated hero animation. Each stage supports the story being told in the corresponding section.

## Experience

### Hero

- Original AETHER identity and geometric brand mark
- “Intelligence without boundaries” headline
- Interactive particle sphere rendered with Three.js and GLSL
- Cursor movement distorts nearby particles in real time
- GSAP-powered entrance sequence and responsive composition

### Product

Three fictional product concepts establish how the AETHER ecosystem could work:

- **Aether Canvas** — a workspace for turning questions, notes, and rough drafts into connected ideas
- **Aether Studio** — a creative space for language, visual directions, and new perspectives
- **Aether Relay** — an integration layer for bringing AETHER models into other applications

### Intelligence

The main scroll-driven sequence changes the particle geometry from a sphere into a connected network, disperses it, and then assembles thousands of points into the statement:

> **One intelligence. Infinite possibilities.**

The final transformation forms the AETHER mark and wordmark.

### Model Family

The fictional model family contains three models with separate visual identities, use cases, capabilities, and example prompts:

| Model | Focus | Example uses |
| --- | --- | --- |
| **Aether Spark** | Everyday intelligence | Conversation, writing, quick problem-solving |
| **Aether Atlas** | Deeper connections | Research, long-context analysis, structured reasoning |
| **Aether Prism** | Creative exploration | Multimodal concepts, visual direction, creative variation |

Selecting **Explore model** opens a model-specific detail view instead of repeating the card description.

### API Concept

- JavaScript and Python examples
- Interactive language tabs
- Clipboard copy feedback
- Responsive code presentation
- Clear labelling that the SDK and API are illustrative concepts

### Pricing and Checkout

The pricing section includes three fictional plans:

- **Explorer** — free personal workspace concept
- **Pioneer** — paid individual plan concept
- **Collective** — custom team plan concept

Visitors can select a plan and continue through a plan-specific onboarding flow:

```text
Choose plan → Create account → Workspace / Payment / Team setup
            → Review details → Confirm prototype order
```

The checkout includes password matching, required-field validation, a fixed test-card flow for Pioneer, a workspace setup for Explorer, and a team inquiry flow for Collective. It is a frontend prototype: form values remain in the browser and no account, payment, or subscription is created.

## Technology

| Technology | Purpose |
| --- | --- |
| **Vite** | Development server and optimized production build |
| **React** | Component structure and interactive state |
| **Three.js** | WebGL scene, particle geometry, and rendering |
| **GLSL** | Particle movement, distortion, color, and point rendering |
| **GSAP** | Hero entrance motion and timeline-based animation |
| **Framer Motion** | Scroll reveals and UI transitions |
| **CSS** | Responsive layout, visual system, and interaction states |

Typography uses **DM Sans**, **Manrope**, and Georgia for the editorial italic accents.

## Project Structure

```text
aether/
├── public/
│   ├── assets/               # AETHER logo assets
│   └── fonts/                # Local display-font fallback
├── src/
│   ├── Ecosystem.jsx         # Models, API, pricing, and checkout flows
│   ├── ParticleField.jsx     # Three.js scene, GLSL shaders, and morph logic
│   ├── main.jsx              # Page structure and primary sections
│   └── styles.css            # Complete responsive visual system
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Run Locally

Requirements:

- Node.js 18 or newer
- npm

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Vite will print the local development URL in the terminal, usually `http://localhost:5173`.

## Production Build

Create and preview an optimized build:

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`.

## Responsive and Accessible Behaviour

- Desktop and mobile navigation patterns
- Fluid type and layouts across viewport sizes
- Keyboard-accessible links, buttons, tabs, forms, and dialogs
- Visible focus states
- Semantic headings and labelled controls
- Reduced-motion support through `prefers-reduced-motion`
- Checkout validation and screen-reader status messaging

## Performance Notes

- Particle count and device pixel ratio are capped to control GPU load
- Heavy libraries are split into separate production chunks
- The WebGL loop pauses its expensive updates when the particle canvas is hidden
- Particle geometry is updated in-place instead of recreated on every frame
- No background video or large photographic assets are required

## Important Disclaimer

AETHER is a **fictional company and frontend portfolio concept**. Canvas, Studio, Relay, Spark, Atlas, Prism, the API, pricing, accounts, and checkout flows are product-design concepts.

The project does not provide:

- A live AI service or inference endpoint
- Real customer accounts or authentication
- Real payments or subscriptions
- Verified performance benchmarks
- Customer endorsements or enterprise claims

Never enter real payment information in the prototype checkout. The displayed test-card flow exists only to demonstrate frontend interaction design.

## License

Add a license before distributing or accepting external contributions. Until then, all project rights remain with the repository owner.
