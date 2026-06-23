// ==========================================================================
// 1. SYSTEM APPLICATION GLOBAL STATE (NYKAA BEAUTY EDITION)
// ==========================================================================
const State = {
    products: [
        { id: "1", title: "Matte Ultra Lip Liquid", desc: "Long-lasting 12-hour high pigment finish.", price: 15, icon: "💄" },
        { id: "2", title: "Botanical Glow Face Serum", desc: "Enriched with Pure Vitamin C and Rose extracts.", price: 28, icon: "🧴" },
        { id: "3", title: "Argan Therapy Hair Oil", desc: "Nourishing non-sticky deep scalp repair formula.", price: 22, icon: "🌿" },
        { id: "4", title: "Parisian Night Luxury Perfume", desc: "Exotic floral blend with woody baseline undertones.", price: 65, icon: "🔮" }
    ],
    cart: JSON.parse(localStorage.getItem('nexus_cart')) || []
};

// ==========================================================================
// 2. MODULAR CLIENT-SIDE ROUTER ARCHITECTURE
// ==========================================================================
const viewEngine = {
    // A. Render Catalog Page
    "/": () => {
        let catalogHtml = `
            <section aria-labelledby="catalog-title">
                <h1 id="catalog-title" style="font-size: 1.5rem; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom:20px; font-weight:800; text-align:center; color:#222;">Trending Collections</h1>
                <div class="catalog-grid">
        `;
        
        State.products.forEach(prod => {
            catalogHtml += `
                <article class="product-card">
                    <div class="product-img-holder">${prod.icon}</div>
                    <h2 class="product-title">${prod.title}</h2>
                    <p class="product-desc">${prod.desc}</p>
                    <div class="product-footer">
                        <span class="product-price">$${prod.price}</span>
                        <button class="action-btn add-to-cart-trigger" data-id="${prod.id}">Add to Bag</button>
                    </div>
                </article>
            `;
        });

        catalogHtml += `</div></section>`;
        return catalogHtml;
    },

    // B. Render Shopping Cart Page
    "/cart": () => {
        if (State.cart.length === 0) {
            return `
                <div class="cart-layout" style="text-align:center; padding: 60px 20px;">
                    <div style="font-size: 4rem; margin-bottom: 15px;">🛍️</div>
                    <h2>Your Shopping Bag is Empty</h2>
                    <p style="color:var(--text-muted); margin: 15px 0 25px 0;">Fill it with your favorite cosmetics and styling trends.</p>
                    <button class="action-btn" id="go-shopping-btn" style="max-width: 200px;">Shop Now</button>
                </div>
            `;
        }

        let cartHtml = `<div class="cart-layout"><h1>Your Shopping Bag (${State.cart.length} Items)</h1>`;
        let grandTotal = 0;

        State.cart.forEach((item, index) => {
            grandTotal += item.price;
            cartHtml += `
                <div class="cart-item">
                    <div>
                        <h3>${item.title}</h3>
                        <p style="color:var(--text-muted); font-size: 0.85rem; margin-top: 4px;">Standard Verified Retail Unit</p>
                    </div>
                    <div style="display:flex; gap:25px; align-items:center;">
                        <span style="font-weight:700; color:var(--text-primary);">$${item.price}</span>
                        <button class="action-btn remove-item-trigger" data-index="${index}" style="background:#555; font-size: 0.75rem; padding: 6px 12px; width: auto;">Remove</button>
                    </div>
                </div>
            `;
        });

        cartHtml += `
            <div class="cart-summary">Total Payable: $${grandTotal}</div>
            <button class="action-btn" style="margin-top:25px; width:100%; background:#27ae60;">Proceed to Secure Checkout</button>
        </div>`;
        return cartHtml;
    }
};

// ==========================================================================
// 3. ROUTE CONTROLLER & VIEW INTERFACES
// ==========================================================================
function router() {
    const path = window.location.pathname;
    const viewRenderFunction = viewEngine[path] || viewEngine["/"];
    
    document.getElementById('app').innerHTML = viewRenderFunction();
    updateGlobalCounters();
}

function navigate(url) {
    window.history.pushState({}, "", url);
    router();
}

// ==========================================================================
// 4. ACTION INTERACTION LISTENERS (EVENT DELEGATION)
// ==========================================================================
document.body.addEventListener('click', e => {
    const target = e.target;

    if (target.matches('[data-link]')) {
        e.preventDefault();
        navigate(target.getAttribute('data-link'));
    }

    if (target.classList.contains('add-to-cart-trigger')) {
        const prodId = target.dataset.id;
        const targetProduct = State.products.find(p => p.id === prodId);
        if (targetProduct) {
            State.cart.push(targetProduct);
            syncStorageAndInterface();
        }
    }

    if (target.classList.contains('remove-item-trigger')) {
        const index = parseInt(target.dataset.index, 10);
        State.cart.splice(index, 1);
        syncStorageAndInterface();
    }

    if (target.id === 'go-shopping-btn') {
        navigate('/');
    }
});

function syncStorageAndInterface() {
    localStorage.setItem('nexus_cart', JSON.stringify(State.cart));
    updateGlobalCounters();
    router(); 
}

function updateGlobalCounters() {
    document.getElementById('cart-count').textContent = State.cart.length;
}

window.addEventListener('popstate', router);
document.addEventListener('DOMContentLoaded', router);