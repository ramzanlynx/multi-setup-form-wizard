$(function () {
  // Initialize the jQuery Steps plugin on #wizard — configures step structure,
  // fade transition, custom button labels, and step indicator image swapping
  $("#wizard").steps({
    headerTag: "h4", // Each step title is wrapped in <h4>
    bodyTag: "section", // Each step content is wrapped in <section>
    transitionEffect: "fade", // Steps fade in/out when switching
    enableAllSteps: true, // User can freely click any step, not just forward
    transitionEffectSpeed: 300, // Fade animation duration in milliseconds

    // Rename the default plugin button labels to custom ones
    labels: {
      next: "Continue",
      previous: "Back",
      finish: "Proceed to checkout",
    },

    // Fires on every step change — swaps step indicator icons to reflect
    // which step is currently active. Returns true to allow the transition.
    onStepChanging: function (event, currentIndex, newIndex) {
      // Step 1: show active icon only when on step 0, default otherwise
      if (newIndex >= 1) {
        $(".steps ul li:first-child a img").attr("src", "images/step-1.png");
      } else {
        $(".steps ul li:first-child a img").attr(
          "src",
          "images/step-1-active.png",
        );
      }

      // Step 2: show active icon only when on step 1, default otherwise
      if (newIndex === 1) {
        $(".steps ul li:nth-child(2) a img").attr(
          "src",
          "images/step-2-active.png",
        );
      } else {
        $(".steps ul li:nth-child(2) a img").attr("src", "images/step-2.png");
      }

      // Step 3: show active icon only when on step 2, default otherwise
      if (newIndex === 2) {
        $(".steps ul li:nth-child(3) a img").attr(
          "src",
          "images/step-3-active.png",
        );
      } else {
        $(".steps ul li:nth-child(3) a img").attr("src", "images/step-3.png");
      }

      // Step 4: show active icon only when on step 3, default otherwise
      // Also toggles 'step-4' class on actions to center the Finish button
      if (newIndex === 3) {
        $(".steps ul li:nth-child(4) a img").attr(
          "src",
          "images/step-4-active.png",
        );
        $(".actions ul").addClass("step-4");
      } else {
        $(".steps ul li:nth-child(4) a img").attr("src", "images/step-4.png");
        $(".actions ul").removeClass("step-4");
      }

      // Must return true to allow the step transition to proceed
      return true;
    },
  });

  // Advance the wizard to the next step when the custom Continue button is clicked
  $(".forward").click(function () {
    $("#wizard").steps("next");
  });

  // Go back to the previous step when the custom Back button is clicked
  $(".backward").click(function () {
    $("#wizard").steps("previous");
  });
});
