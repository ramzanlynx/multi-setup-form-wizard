$(function () {
  // Toggle password visibility when the eye icon is clicked —
  // shows plain text if currently hidden, hides it if currently visible
  $(".password i").click(function () {
    // Password is currently hidden — reveal it by switching to text type
    if ($(".password input").attr("type") === "password") {
      $(this).next().attr("type", "text");
    } else {
      // Password is currently visible — hide it by switching back to password type
      $(".password input").attr("type", "password");
    }
  });
});
