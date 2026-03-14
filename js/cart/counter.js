import { updateCartItemQty } from "../cart-storage.js";

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
  });
});

// ✅ Storing an object
// const user = { name: "Sara", step: 2, email: "sara@example.com" };
// sessionStorage.setItem("wizardData", JSON.stringify(user));

// // ✅ Reading it back safely
// function getSessionData(key) {
//   try {
//     const raw = sessionStorage.getItem(key);
//     return raw ? JSON.parse(raw) : null;
//   } catch (e) {
//     console.warn("Failed to parse sessionStorage data:", e);
//     return null;
//   }
// }

// const saved = getSessionData("wizardData");
// // → { name: "Sara", step: 2, email: "sara@example.com" }
// console.log(saved);

// function storageAvailable(type) {
//   let storage;
//   try {
//     storage = window[type];
//     const x = "__storage_test__";
//     storage.setItem(x, x);
//     storage.removeItem(x);
//     return true;
//   } catch (e) {
//     return (
//       e instanceof DOMException &&
//       e.name === "QuotaExceededError" &&
//       storage &&
//       storage.length !== 0
//     );
//   }
// }
