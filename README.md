# E-Commerce-Catalog
A premium, Nykaa-inspired single-page E-Commerce product catalog built with raw ES6+ JS. Features custom client-side history routing, state persistence, and highly optimized asset delivery.
# 💄 NexusCart - Premium E-Commerce Catalog Architecture (Nykaa Inspired)

A high-performance, single-page application (SPA) E-Commerce Product Catalog engineered using strict native ES6+ JavaScript. The user interface draws heavy inspiration from premium beauty retail platforms like **Nykaa**, delivering a clean, minimalist layout with high-contrast typography, precise grid alignment, and vibrant pink accents.

---

## 🚀 Performance & System Architecture

- **Framework-less Client Routing Engine:** Zero external framework dependencies. Relies entirely on explicit browser `History API` tracking hooks to enable ultra-low latency view-switching without network flashes or page reloads.
- **Unified Reactive State Machine:** Centralized application data records automatically sync with `window.localStorage` to handle seamless state persistence for items added to the cart across browser lifecycles.
- **Global Event Delegation Loop:** Implements a single, highly efficient event listener bound to the global DOM surface to capture programmatic routing (`data-link`), dynamic item insertions (`Add to Bag`), and array mutations (`Remove Item`).
- **Nykaa-Inspired Retail Grid:** Built with a clean, fully responsive fluid grid structure that adapts beautifully from 320px mobile viewports up to large desktop monitors.

---

## 📂 Repository Layout

```text
E-Commerce-Catalog/
│
├── index.html       # Base HTML5 single-page application shell
├── style.css        # Nykaa aesthetic custom variables & responsive grids
├── app.js           # Core routing architecture, template engine & data states
└── README.md        # Complete deployment blueprints & instructions
