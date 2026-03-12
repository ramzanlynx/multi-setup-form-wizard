$(function () {
  // Inject arrow, active icon and label into Step 1 — active by default as it's the first step shown
  $(".steps ul li:first-child")
    .append('<img src="images/step-arrow.png" alt="" class="step-arrow">')
    .find("a")
    .append('<img src="images/step-1-active.png" alt=""> ')
    .append('<span class="step-order">Step 01</span>');

  // Inject arrow, inactive icon and label into Step 2
  $(".steps ul li:nth-child(2")
    .append('<img src="images/step-arrow.png" alt="" class="step-arrow">')
    .find("a")
    .append('<img src="images/step-2.png" alt="">')
    .append('<span class="step-order">Step 02</span>');

  // Inject arrow, inactive icon and label into Step 3
  $(".steps ul li:nth-child(3)")
    .append('<img src="images/step-arrow.png" alt="" class="step-arrow">')
    .find("a")
    .append('<img src="images/step-3.png" alt="">')
    .append('<span class="step-order">Step 03</span>');

  // Inject inactive icon and label into Step 4 — last step, no arrow needed
  $(".steps ul li:last-child a")
    .append('<img src="images/step-4.png" alt="">')
    .append('<span class="step-order">Step 04</span>');
});
