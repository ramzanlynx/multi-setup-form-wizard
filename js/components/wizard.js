import { validate, fieldSteps } from "../modules/form-validation.js";
import { hasCartItems, getCart, getCartTotals } from "../modules/cart-storage.js";

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

  // Reset form to initial state after submission
  function resetForm() {
    // Clear ALL session data (cart, form inputs, passwords, etc.)
    sessionStorage.clear();

    // Reload the page to reset everything (form, wizard)
    window.location.reload();
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
      // Prevent multiple submissions
      if ($(this).data("submitting")) {
        return;
      }
      $(this).data("submitting", true);

      // Add loading state to finish button
      const $finishBtn = $(".actions li:last-child a");
      $finishBtn.addClass("loading");
      $finishBtn.html('<span class="btn-text">Proceed to checkout</span><span class="loading-dots"><span></span><span></span><span></span></span>');

      // Get form data
      const data = {};

      // Get all inputs, selects, and textareas with name attribute directly from the form
      $("#wizard input[name], #wizard select[name], #wizard textarea[name]").each(function() {
        const name = this.name;
        let value = this.value;

        // Handle checkboxes and radio buttons
        if (this.type === 'checkbox' || this.type === 'radio') {
          if (this.checked) {
            data[name] = value || 'on';
          }
        } else {
          data[name] = value;
        }
      });

      // Add cart data
      const cartItems = getCart();
      const { subtotal, serviceFee, shippingCost, grandTotal } = getCartTotals();

      // Add cart data to root level
      data.cart = {
        items: cartItems,
        subtotal: subtotal,
        serviceFee: serviceFee,
        shippingCost: shippingCost,
        grandTotal: grandTotal
      };

      // Submit via AJAX
      const actionUrl = $("#wizard").attr("action");

      $.ajax({
        url: actionUrl,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response) {
          // Remove loading state
          $finishBtn.removeClass("loading");
          alert("Order submitted successfully!");
          resetForm();
          $("#wizard").data("submitting", false);
        },
        error: function(xhr, status, error) {
          // Remove loading state and restore button text
          $finishBtn.removeClass("loading").html("Proceed to checkout");
          alert("Error: " + error + "\nResponse: " + xhr.responseText);
          $("#wizard").data("submitting", false);
        }
      });
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