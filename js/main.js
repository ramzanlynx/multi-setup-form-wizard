$(function () {

  // ─────────────────────────────────────────────────────────────
  // WIZARD INITIALIZATION
  // Sets up the jQuery Steps multi-step form wizard on #wizard.
  // Defines step structure, transition animation, button labels,
  // and handles step indicator image swapping on each step change.
  // ─────────────────────────────────────────────────────────────
  $("#wizard").steps({
    headerTag: "h4",            // Each step title is wrapped in <h4>
    bodyTag: "section",         // Each step content is wrapped in <section>
    transitionEffect: "fade",   // Steps fade in/out when switching
    enableAllSteps: true,       // User can freely click any step, not just forward
    transitionEffectSpeed: 300, // Fade animation duration in milliseconds

    // Rename the default plugin buttons to custom labels
    labels: {
      next: "Continue",
      previous: "Back",
      finish: "Proceed to checkout",
    },

    // ───────────────────────────────────────────────────────────
    // ON STEP CHANGING
    // Fires every time the user switches to a different step.
    // Swaps step indicator images to show which step is active
    // (active step gets a highlighted image, others get default).
    // Returns true to allow the step change to proceed.
    // ───────────────────────────────────────────────────────────
    onStepChanging: function (event, currentIndex, newIndex) {

      // Step 1 image: active only when on step 0, default otherwise
      if (newIndex >= 1) {
        $(".steps ul li:first-child a img").attr("src", "images/step-1.png");
      } else {
        $(".steps ul li:first-child a img").attr("src", "images/step-1-active.png");
      }

      // Step 2 image: active only when on step 1, default otherwise
      if (newIndex === 1) {
        $(".steps ul li:nth-child(2) a img").attr("src", "images/step-2-active.png");
      } else {
        $(".steps ul li:nth-child(2) a img").attr("src", "images/step-2.png");
      }

      // Step 3 image: active only when on step 2, default otherwise
      if (newIndex === 2) {
        $(".steps ul li:nth-child(3) a img").attr("src", "images/step-3-active.png");
      } else {
        $(".steps ul li:nth-child(3) a img").attr("src", "images/step-3.png");
      }

      // Step 4 image: active only when on step 3, default otherwise
      // Also adds/removes 'step-4' class to center the actions on final step
      if (newIndex === 3) {
        $(".steps ul li:nth-child(4) a img").attr("src", "images/step-4-active.png");
        $(".actions ul").addClass("step-4");
      } else {
        $(".steps ul li:nth-child(4) a img").attr("src", "images/step-4.png");
        $(".actions ul").removeClass("step-4");
      }

      // Must return true to allow the step transition to happen
      return true;
    },
  });

  // ─────────────────────────────────────────────────────────────
  // CUSTOM NAVIGATION BUTTONS
  // These are custom Back/Continue buttons separate from the
  // plugin's built-in buttons. They programmatically trigger
  // the wizard's next/previous step when clicked.
  // ─────────────────────────────────────────────────────────────
  $(".forward").click(function () {
    $("#wizard").steps("next");
  });

  $(".backward").click(function () {
    $("#wizard").steps("previous");
  });

  // ─────────────────────────────────────────────────────────────
  // PASSWORD VISIBILITY TOGGLE
  // Toggles the password input between hidden (type="password")
  // and visible (type="text") when the eye icon is clicked.
  // ─────────────────────────────────────────────────────────────
  $(".password i").click(function () {
    if ($(".password input").attr("type") === "password") {
      // Password is currently hidden — show it
      $(this).next().attr("type", "text");
    } else {
      // Password is currently visible — hide it
      $(".password input").attr("type", "password");
    }
  });

  // ─────────────────────────────────────────────────────────────
  // STEP INDICATOR UI BUILDER
  // Dynamically injects step arrow images and step labels
  // into the wizard's step navigation list items.
  // Each step gets: an arrow image, a step icon, and a label.
  // Step 1 starts as active (highlighted), others start default.
  // ─────────────────────────────────────────────────────────────

  // Step 1 — active by default since it is the first step shown
  $(".steps ul li:first-child")
    .append('<img src="images/step-arrow.png" alt="" class="step-arrow">')
    .find("a")
    .append('<img src="images/step-1-active.png" alt=""> ')
    .append('<span class="step-order">Step 01</span>');

  // Step 2 — inactive by default
  $(".steps ul li:nth-child(2")
    .append('<img src="images/step-arrow.png" alt="" class="step-arrow">')
    .find("a")
    .append('<img src="images/step-2.png" alt="">')
    .append('<span class="step-order">Step 02</span>');

  // Step 3 — inactive by default
  $(".steps ul li:nth-child(3)")
    .append('<img src="images/step-arrow.png" alt="" class="step-arrow">')
    .find("a")
    .append('<img src="images/step-3.png" alt="">')
    .append('<span class="step-order">Step 03</span>');

  // Step 4 — last step, no arrow needed, inactive by default
  $(".steps ul li:last-child a")
    .append('<img src="images/step-4.png" alt="">')
    .append('<span class="step-order">Step 04</span>');

  // ─────────────────────────────────────────────────────────────
  // QUANTITY COUNTER
  // Controls the +/- quantity buttons in the cart.
  // Uses event delegation via $(document).on() because jQuery Steps
  // dynamically rebuilds the DOM — direct binding would be lost.
  // Reads min/max boundaries directly from the input HTML attributes.
  // Clamps the value so it never goes below min or above max.
  // ─────────────────────────────────────────────────────────────
  $(document).on("click", ".quantity span", function () {
    const $button = $(this);

    // Find the input field scoped to the clicked button's parent
    const $input = $button.parent().find("input");

    // Parse current value — fallback to 0 if empty or NaN
    const currentVal = parseFloat($input.val()) || 0;

    // Read boundaries from HTML attributes
    // Fallback: min defaults to 0, max defaults to Infinity (no upper limit)
    const min = parseFloat($input.attr("min")) || 0;
    const max = parseFloat($input.attr("max")) || Infinity;

    // Increment if plus clicked, decrement if minus clicked
    // Math.min/max ensures value never goes outside the boundaries
    const newVal = $button.hasClass("plus")
      ? Math.min(currentVal + 1, max)
      : Math.max(currentVal - 1, min);

    // Write the new value back to the input field
    $input.val(newVal);
  });

});
