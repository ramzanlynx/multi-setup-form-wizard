const initPasswordToggle = () => {
  $(".password i").click(function () {
    if ($(".password input").attr("type") === "password") {
      $(this).next().attr("type", "text");
    } else {
      $(".password input").attr("type", "password");
    }
  });
};
