import { validate, fieldSteps } from "../modules/form-validation.js";
import { hasCartItems } from "../modules/cart-storage.js";

$(function () {
  // Step icon configuration: maps step index to active image
  const stepIcons = {
    0: { active: "step-1-active.png", inactive: "step-1.png" },
    1: { active: "step-2-active.png", inactive: "step-2.png" },
    2: { active: "step-3-active.png", inactive: "step-3.png" },
    3: { active: "step-4-active.png", inactive: "step-4.png" },
  };

  // Update step indicator icons based on current step
  function updateStepIcons(currentStepIndex) {
    Object.entries(stepIcons).forEach(([stepNum, icons]) => {
      const isActive = parseInt(stepNum) === currentStepIndex;
      const imgSrc = isActive ? icons.active : icons.inactive;
      $(".steps ul li")
        .eq(stepNum)
        .find("a img")
        .attr("src", `images/${imgSrc}`);
    });

    // Toggle step-4 class for Finish button centering
    if (currentStepIndex === 3) {
      $(".actions ul").addClass("step-4");
    } else {
      $(".actions ul").removeClass("step-4");
    }
  }

  // Initialize the jQuery Steps plugin on #wizard
  $("#wizard").steps({
    headerTag: "h4",
    bodyTag: "section",
    transitionEffect: "fade",
    enableAllSteps: true,
    transitionEffectSpeed: 300,
    labels: {
      next: "Continue",
      previous: "Back",
      finish: "Proceed to checkout",
    },

    onStepChanging: function (event, currentIndex, newIndex) {
      // Only validate when moving forward
      if (newIndex > currentIndex) {
        // Step 2 = My Cart (index 2) - check cart has items
        if (currentIndex === 2) {
          if (!hasCartItems()) {
            // Remove any existing cart error first, then show new one
            $(".cart-error").remove();
            $("#shop_table").before('<div class="cart-error validation-message show error">⚠ Please select at least one item from the cart.</div>');
            return false;
          } else {
            // Clear error when cart has items
            $(".cart-error").remove();
          }
        } else {
          // Validate fields for current step
          const fieldsToValidate = fieldSteps[currentIndex];
          if (fieldsToValidate) {
            const results = fieldsToValidate.map((fieldId) => validate(fieldId));
            if (!results.every((result) => result)) {
              return false;
            }
          }
        }
      }

      // Update step indicator icons
      updateStepIcons(newIndex);

      return true;
    },

    onFinished: function (event, currentIndex) {
      // Submit the form to the URL specified in action attribute
      $("#wizard").submit();
    },
  });

  // Custom navigation buttons
  $(".forward").click(function () {
    $("#wizard").steps("next");
  });

  $(".backward").click(function () {
    $("#wizard").steps("previous");
  });
});