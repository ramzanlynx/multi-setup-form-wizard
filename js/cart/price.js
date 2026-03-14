import { getCartTotals } from "../cart-storage.js";

$(function () {
  const renderTotals = () => {
    const { subtotal, grandTotal } = getCartTotals(); // from sessionStorage

    $(".cart-subtotal td .woocommerce-Price-amount").html(
      `<span class="woocommerce-Price-currencySymbol">$</span> ${subtotal.toFixed(2)}`,
    );
    $(".order-total td .woocommerce-Price-amount").html(
      `<span class="woocommerce-Price-currencySymbol">$</span> ${grandTotal.toFixed(2)}`,
    );
  };

  renderTotals(); // initial render on page load

  // Re-render totals whenever any module signals the cart changed
  $(document).on("cart:updated", renderTotals);
});
