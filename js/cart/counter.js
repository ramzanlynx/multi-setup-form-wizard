$(function () {
  $(".quantity span").on("click", function () {
    // creating a jquery button object so that we dont have to use $(this) all the time
    const $button = $(this);

    // Find the quantity input field within the same .quantity container as the clicked button
    const $qtyInput = $button.parent().find("input");
    const currentVal = parseFloat($qtyInput.val()) || 0;

    // getting the min and max from the html
    const min = parseFloat($qtyInput.attr("min")) || 0;
    const max = parseFloat($qtyInput.attr("max")) || Infinity;

    // increment, decrement accordingly . clamped within min and max
    const newVal = $button.hasClass("plus")
      ? Math.min(currentVal + 1, max)
      : Math.max(currentVal - 1, min);

    // updating the quantity input value
    $qtyInput.val(newVal);
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
