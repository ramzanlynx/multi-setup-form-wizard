export const initWizard = () => {
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
      if (newIndex >= 1) {
        $(".steps ul li:first-child a img").attr("src", "images/step-1.png");
      } else {
        $(".steps ul li:first-child a img").attr(
          "src",
          "images/step-1-active.png",
        );
      }

      if (newIndex === 1) {
        $(".steps ul li:nth-child(2) a img").attr(
          "src",
          "images/step-2-active.png",
        );
      } else {
        $(".steps ul li:nth-child(2) a img").attr("src", "images/step-2.png");
      }

      if (newIndex === 2) {
        $(".steps ul li:nth-child(3) a img").attr(
          "src",
          "images/step-3-active.png",
        );
      } else {
        $(".steps ul li:nth-child(3) a img").attr("src", "images/step-3.png");
      }

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
      return true;
    },
  });
  // Custom Button Jquery Steps
  $(".forward").click(function () {
    $("#wizard").steps("next");
  });
  $(".backward").click(function () {
    $("#wizard").steps("previous");
  });
};
