import { products } from "../data/products.js";
import { getCart, getCartTotals, removeCartItem } from "../modules/cart-storage.js";

// ── Debounce utility ───────────────────────────────────────────────
function debounce(fn, delay = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// ── Template: builds one <tr> per product ─────────────────────────
function createRowTemplate(product, cartItem) {
  return `
    <tr data-id="${product.id}">
      <td class="product-thumb">
        <a href="#" class="item-thumb">
          <img src="images/${product.image}" alt="${product.name}" />
        </a>
      </td>
      <td class="product-detail" data-title="Product Detail">
        <div>
          <a href="#">${product.name}</a>
          <span>$</span>
          <span>${product.price}</span>
        </div>
      </td>
      <td class="product-quantity" data-title="Quantity">
        <div class="quantity">
          <span class="plus">+</span>
          <input type="number" class="input-text qty text"
            step="1" min="0" max="99"
            value="${cartItem.qty}"
            pattern="[0-9]*" inputmode="numeric" />
          <span class="minus">-</span>
        </div>
      </td>
      <td class="total-price" data-title="Total Price">
        <span class="woocommerce-Price-amount amount">
          <span class="woocommerce-Price-currencySymbol">$</span>
          ${cartItem.totalPrice.toFixed(2)}
        </span>
      </td>
      <td class="product-remove">
        <a href="#"><i class="zmdi zmdi-close-circle-o"></i></a>
      </td>
    </tr>
  `;
}

// ── Render: reads from sessionStorage, rebuilds tbody ─────────────
$(function () {
  const renderCartRows = () => {
    const cartItems = getCart();
    const $tbody = $("#shop_table tbody").empty();

    products.forEach((product) => {
      const cartItem = cartItems.find((item) => item.id === product.id);
      $tbody.append(createRowTemplate(product, cartItem));
    });
  };

  const renderTotals = () => {
    const { subtotal, serviceFee, shippingCost, grandTotal } = getCartTotals();

    // Update subtotal
    $(".cart-subtotal:not(.shipping) td .woocommerce-Price-amount").html(
      `<span class="woocommerce-Price-currencySymbol">$</span> ${subtotal.toFixed(2)}`,
    );

    // Update service fee
    $(".service-fee td .woocommerce-Price-amount").html(
      `<span class="woocommerce-Price-currencySymbol">$</span> ${serviceFee.toFixed(2)}`,
    );

    // Update grand total
    $(".order-total td .woocommerce-Price-amount").html(
      `<span class="woocommerce-Price-currencySymbol">$</span> ${grandTotal.toFixed(2)}`,
    );
  };

  // Combined render function
  const render = () => {
    renderCartRows();
    renderTotals();
  };

  render();

  // Handle remove item button click
  $(document).on("click", ".product-remove a", function (e) {
    e.preventDefault();
    const id = $(this).closest("tr").data("id");
    removeCartItem(id);
    $(document).trigger("cart:updated");
  });

  // Handle shipping method change
  $(document).on("change", 'input[name="shipping"]', function () {
    renderTotals();
  });

  // Re-render whenever any module signals the cart changed
  $(document).on("cart:updated", render);
});