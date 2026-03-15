// ── Debounce utility ───────────────────────────────────────────────
function debounce(fn, delay = 300) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

$(function () {
  // Utility: convert placeholder to camelCase key
  function toCamelCase(str) {
    return str
      .trim()
      .toLowerCase()
      .split(" ")
      .map((word, i) => (i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
      .join("");
  }

  // Load user data from sessionStorage with error handling
  const sessStorage = sessionStorage.getItem("userData");

  if (sessStorage) {
    try {
      const user = JSON.parse(sessStorage);
      const $inputs = $("input[placeholder]");

      $inputs.each((_, element) => {
        const $el = $(element);
        const key = toCamelCase($el.attr("placeholder"));
        if (user[key] !== undefined) {
          $el.val(user[key]);
        }
      });
    } catch (e) {
      console.warn("Invalid userData in sessionStorage, ignoring:", e);
    }
  }

  // Store user data with debounce to avoid excessive writes
  const user = {};

  const storeSessionData = debounce(() => {
    const $inputs = $("input[placeholder]");

    $inputs.each((_, element) => {
      const $el = $(element);
      user[toCamelCase($el.attr("placeholder"))] = $el.val();
    });

    sessionStorage.setItem("userData", JSON.stringify(user));
  }, 300);

  $(".form-control").on("input", storeSessionData);
});