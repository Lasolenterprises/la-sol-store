/* Lā Sol Enterprises — cart logic
   Cart is stored in localStorage so it persists across pages/visits on this browser.
   NOTE: This is a front-end cart only. To accept real payments online, connect a
   payment processor (Stripe Checkout, Shopify Buy Button, PayPal, Square, etc.) —
   see README.md for the recommended next step. */

const CART_KEY = "lasol_cart";

const PRODUCTS = {
  "kona-12oz": {
    id: "kona-12oz",
    name: "100% Kona Coffee — Whole Bean",
    size: "12 oz bag",
    price: 38.99,
    desc: "Medium roast, single-origin 100% Kona coffee grown on the Big Island and roasted fresh in Hawaiʻi."
  }
};

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, qty) {
  const cart = getCart();
  cart[productId] = (cart[productId] || 0) + qty;
  saveCart(cart);
  showToast(`Added ${qty} × ${PRODUCTS[productId].name} to cart`);
}

function setQty(productId, qty) {
  const cart = getCart();
  if (qty <= 0) {
    delete cart[productId];
  } else {
    cart[productId] = qty;
  }
  saveCart(cart);
}

function removeFromCart(productId) {
  const cart = getCart();
  delete cart[productId];
  saveCart(cart);
  renderCartPage();
}

function cartTotalCount() {
  const cart = getCart();
  return Object.values(cart).reduce((sum, q) => sum + q, 0);
}

function cartSubtotal() {
  const cart = getCart();
  let subtotal = 0;
  for (const id in cart) {
    if (PRODUCTS[id]) subtotal += PRODUCTS[id].price * cart[id];
  }
  return subtotal;
}

function updateCartCount() {
  document.querySelectorAll(".cart-count").forEach(el => {
    el.textContent = cartTotalCount();
  });
}

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function renderCartPage() {
  const cart = getCart();
  const tableBody = document.getElementById("cart-body");
  const emptyState = document.getElementById("cart-empty");
  const tableWrap = document.getElementById("cart-table-wrap");
  if (!tableBody) return;

  const ids = Object.keys(cart);
  if (ids.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    if (tableWrap) tableWrap.style.display = "none";
    return;
  }
  if (emptyState) emptyState.style.display = "none";
  if (tableWrap) tableWrap.style.display = "block";

  tableBody.innerHTML = "";
  ids.forEach(id => {
    const p = PRODUCTS[id];
    if (!p) return;
    const qty = cart[id];
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><div class="cart-item-name">${p.name}</div><div style="color:var(--brown-light);font-size:13px;">${p.size}</div></td>
      <td>
        <div class="qty-control">
          <button type="button" onclick="setQty('${id}', ${qty - 1}); renderCartPage();">−</button>
          <input type="text" readonly value="${qty}">
          <button type="button" onclick="setQty('${id}', ${qty + 1}); renderCartPage();">+</button>
        </div>
      </td>
      <td>$${p.price.toFixed(2)}</td>
      <td>$${(p.price * qty).toFixed(2)}</td>
      <td><span class="remove-link" onclick="removeFromCart('${id}')">Remove</span></td>
    `;
    tableBody.appendChild(row);
  });

  const subtotal = cartSubtotal();
  const shipping = subtotal > 0 ? 6.5 : 0;
  const total = subtotal + shipping;
  const subtotalEl = document.getElementById("cart-subtotal");
  const shippingEl = document.getElementById("cart-shipping");
  const totalEl = document.getElementById("cart-total");
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (shippingEl) shippingEl.textContent = `$${shipping.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

function handleCheckoutSubmit(event) {
  event.preventDefault();
  const cart = getCart();
  if (Object.keys(cart).length === 0) {
    showToast("Your cart is empty");
    return false;
  }
  localStorage.removeItem(CART_KEY);
  document.getElementById("checkout-form-wrap").style.display = "none";
  document.getElementById("checkout-confirm").style.display = "block";
  updateCartCount();
  return false;
}

function toggleMobileNav() {
  const nav = document.getElementById("main-nav");
  if (nav) nav.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCartPage();
});
