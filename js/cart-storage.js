import { products } from "./data/products.js";

const CART_KEY = "cart";

// ── Build the initial cart from products ──────────────────────────
function buildInitialCart() {
  return products.map((product) => ({
    id: product.id,
    qty: 0,
    unitPrice: product.price,
    totalPrice: 0,
  }));
}

// ── Read ──────────────────────────────────────────────────────────
export function getCart() {
  const stored = sessionStorage.getItem(CART_KEY);
  if (!stored) return buildInitialCart();

  try {
    return JSON.parse(stored);
  } catch (e) {
    console.warn("Invalid cart data in sessionStorage, resetting:", e);
    return buildInitialCart();
  }
}

// ── Write ─────────────────────────────────────────────────────────
function saveCart(cartItems) {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cartItems));
}

// ── Update qty for one item, persist immediately ──────────────────
export function updateCartItemQty(id, newQty) {
  const cartItems = getCart();

  const updatedItems = cartItems.map((item) => {
    if (item.id !== id) return item; // leave others untouched
    return {
      ...item,
      qty: newQty,
      totalPrice: item.unitPrice * newQty,
    };
  });

  saveCart(updatedItems); // persist to sessionStorage
  return updatedItems; // return updated list
}

// ── Derived totals (computed from stored data) ────────────────────
export function getCartTotals() {
  const SERVICE_FEE = 5.6;
  const cartItems = getCart();
  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return {
    subtotal,
    grandTotal: subtotal + SERVICE_FEE,
  };
}

// ── Clear cart ────────────────────────────────────────────────────
export function clearCart() {
  sessionStorage.removeItem(CART_KEY);
}

// ── Check if cart has at least one item picked ─────────────────────
export function hasCartItems() {
  const cartItems = getCart();
  return cartItems.some((item) => item.qty > 0);
}
