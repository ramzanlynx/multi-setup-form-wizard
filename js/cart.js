import { products } from "./data/products.js";
import { getCart, getCartTotals } from "./cart-storage.js";

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
  const renderCart = () => {
    const cartItems = getCart(); // from sessionStorage
    const $tbody = $("#shop_table tbody").empty();

    $.each(products, function (i, product) {
      const cartItem = cartItems.find((item) => item.id === product.id);
      $tbody.append(createRowTemplate(product, cartItem));
    });
  };

  renderCart(); // initial render on page load

  // Re-render rows whenever any module signals the cart changed
  $(document).on("cart:updated", renderCart);
});
