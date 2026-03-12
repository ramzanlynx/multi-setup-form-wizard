$(function () {
  if (sessionStorage.getItem("userData")) {
    const user = JSON.parse(sessionStorage.getItem("userData"));

    const $inputs = $("input[placeholder]");

    $inputs.each((_, element) => {
      const $el = $(element);

      $el.val(user[toCamelCase($el.attr("placeholder"))]);
    });
  }

  function toCamelCase(str) {
    return str
      .trim()
      .toLowerCase()
      .split(" ")
      .map((word, i) =>
        i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
      )
      .join("");
  }

  const user = {};

  const storeSessionData = () => {
    const $inputs = $("input[placeholder]");

    $inputs.each((_, element) => {
      const $el = $(element);
      user[toCamelCase($el.attr("placeholder"))] = $el.val();
      sessionStorage.setItem("userData", JSON.stringify(user));
    });
  };

  $(".form-control").on("input", storeSessionData);
});
