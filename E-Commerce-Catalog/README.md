# 🛒 NexusCart - Modular Production-Grade Catalog Architecture

A high-performance, single-page application (SPA) E-Commerce Product Catalog engineered using strict native ES6+ JavaScript. This standalone architecture handles state persistence, object destructuring logic, and custom programmatic view routing.

---

## 🛠️ Performance Architecture Highlights

- **Framework-less Client Routing Engine:** Zero framework overrides. Relies entirely on explicit browser `History API` tracking loops to enable ultra-low latency transitions without network flashes.
- **Unified Reactive State Machine:** Centralized application records automatically write mutation snapshots straight into `window.localStorage`.
- **Global Event Delegation Loop:** Single listener hook on the body surface dynamically parses sub-events (`.add-to-cart-trigger`, `.remove-item-trigger`) eliminating memory leaks.

---

## 🚀 Live Platform Deployment Configuration

To ensure client routing paths (like `/cart`) refresh without triggering standard HTTP 404 server breaks on Netlify/Vercel, we have integrated SPA redirect overrides:

### For Deployment via Netlify:
Create a file named `_redirects` inside the root folder containing the following string:
```text
/* /index.html   200