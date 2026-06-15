const CART_API = "/api/cart";
 
document.addEventListener("DOMContentLoaded", () => {
    wireAddToCartButtons();
    loadBagCount();

    if (document.getElementById("bag-content")) {
        loadCart();
    }
});
 
// ---- Fetch + render (only used on /bag) ----
async function loadCart() {
    try {
        const res = await fetch(CART_API);
        const data = await res.json();
        renderBag(data);
    } catch (err) {
        console.error("Error loading cart:", err);
    }
}
 
function renderBag({ cart, subtotal }) {
    const container = document.getElementById("bag-content");

    if (!cart || cart.length === 0) {
        container.innerHTML = `
            <div class="bag-empty">
                <p class="bag-empty-message">Your bag is empty.</p>
                <p class="bag-empty-sub">Add a piece to begin.</p>
                <a href="/products" class="btn-shop">Shop the Collection</a>
            </div>
        `;
        return;
    }

    const itemsHTML = cart.map(item => `
        <div class="bag-item" data-id="${item.id}">
            <div class="bag-item-image-wrap">
                <img src="${item.image_url}" alt="${item.name}" class="bag-item-image">
            </div>

            <div class="bag-item-details">
                <div class="bag-item-meta">
                    <span class="bag-item-category">${item.category}</span>
                    <h2 class="bag-item-name">${item.name}</h2>
                    <p class="bag-item-price">$${item.price.toFixed(2)}</p>
                </div>

                <div class="bag-qty-controls">
                    <button class="bag-qty-minus" data-id="${item.id}">-</button>
                    <span class="bag-qty-value">${item.quantity}</span>
                    <button class="bag-qty-plus" data-id="${item.id}">+</button>
                </div>

                <button class="bag-remove-btn" data-id="${item.id}">Remove</button>
            </div>
        </div>
    `).join("");

    container.innerHTML = `
        <div class="bag-layout">
            <div class="bag-items">${itemsHTML}</div>
            <aside class="bag-summary">
                <h2 class="bag-summary-heading">Order Summary</h2>
                <div class="bag-summary-row bag-summary-total">
                    <span>Total</span>
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
                <a href="/products" class="bag-continue-link">← Continue Shopping</a>
            </aside>
        </div>
    `;

    attachBagListeners(container);
}

function attachBagListeners(container) {
    container.querySelectorAll(".bag-remove-btn").forEach(btn => {
        btn.addEventListener("click", () => removeFromCart(btn.dataset.id));
    });

    container.querySelectorAll(".bag-qty-plus").forEach(btn => {
        btn.addEventListener("click", () => updateQuantity(btn.dataset.id, 1));
    });

    container.querySelectorAll(".bag-qty-minus").forEach(btn => {
        btn.addEventListener("click", () => updateQuantity(btn.dataset.id, -1));
    });
}

 
// ---- Mutations ----
async function addToCart(productId) {
    console.log("Adding product:", productId);

    try {
        const res = await fetch(`${CART_API}/items`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId }),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error(data.error);
            return;
        }

        updateBagCount(data.cart);
        showCartMessage(data.message || "Added to cart!");

        if (document.getElementById("bag-content")) {
            loadCart();
        }
    } catch (err) {
        console.error("Error adding to cart:", err);
    }
}
 
async function removeFromCart(productId) {
    try {
        const res = await fetch(`${CART_API}/items/${productId}`, {
            method: "DELETE",
        });

        const data = await res.json();
 
         if (!res.ok) {
            console.error(data.error);
            return;
        }

        updateBagCount(data.cart);
        showCartMessage(data.message || "Item removed");
 
        loadCart();
    } catch (err) {
        console.error("Error removing item:", err);
    }
}

async function updateQuantity(productId, change) {
    try {
        const res = await fetch(`${CART_API}/items/${productId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ change }),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error(data.error);
            return;
        }

        renderBag(data);
        updateBagCount(data.cart);
        showCartMessage(data.message || "Quantity updated");
    } catch (err) {
        console.error("Error updating quantity:", err);
    }
}
 
// ---- Helpers ----
function wireAddToCartButtons() {
    document.querySelectorAll(".btn-add-cart").forEach(btn => {
        btn.addEventListener("click", () => addToCart(btn.dataset.productId));
    });
}

function updateBagCount(cart) {
    const bagCount = document.getElementById("bag-count");

    if (!bagCount) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    bagCount.textContent = totalItems;
}

function showCartMessage(message) {
    let toast = document.getElementById("cart-toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "cart-toast";
        toast.className = "cart-toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message || "Added to cart!";
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

async function loadBagCount() {
    try {
        const res = await fetch(CART_API);
        const data = await res.json();

        updateBagCount(data.cart || []);
    } catch (err) {
        console.error("Error loading bag count:", err);
    }
}

