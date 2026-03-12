$(function () {
  $(".quantity span").on("click", function () {
    const $button = $(this);
    const $input = $button.parent().find("input");
    const currentVal = parseFloat($input.val()) || 0;

    const min = parseFloat($input.attr("min")) || 0;
    const max = parseFloat($input.attr("max")) || Infinity;

    const newVal = $button.hasClass("plus")
      ? Math.min(currentVal + 1, max)
      : Math.max(currentVal - 1, min);

    $input.val(newVal);
  });
});
