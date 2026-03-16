import { updateCartItemQty } from "../modules/cart-storage.js";

$(function () {
  $(document).on("click", ".quantity span", function () {
    const $button = $(this);
    const $qtyInput = $button.parent().find("input");
    const currentVal = parseFloat($qtyInput.val()) || 0;
    const min = parseFloat($qtyInput.attr("min")) || 0;
    const max = parseFloat($qtyInput.attr("max")) || Infinity;

    const newVal = $button.hasClass("plus")
      ? Math.min(currentVal + 1, max)
      : Math.max(currentVal - 1, min);

    $qtyInput.val(newVal);

    // Get the product id from the parent row
    const id = $button.closest("tr").data("id");

    // 1. persist to sessionStorage
    updateCartItemQty(id, newVal);

    // 2. broadcast to all listening modules
    $(document).trigger("cart:updated");

    // 3. clear cart error if exists
    $(".cart-error").remove();
  });
});
