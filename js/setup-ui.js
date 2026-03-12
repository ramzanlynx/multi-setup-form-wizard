$(function () {
  $(".steps ul li:first-child")
    .append('<img src="images/step-arrow.png" alt="" class="step-arrow">')
    .find("a")
    .append('<img src="images/step-1-active.png" alt=""> ')
    .append('<span class="step-order">Step 01</span>');
  $(".steps ul li:nth-child(2")
    .append('<img src="images/step-arrow.png" alt="" class="step-arrow">')
    .find("a")
    .append('<img src="images/step-2.png" alt="">')
    .append('<span class="step-order">Step 02</span>');
  $(".steps ul li:nth-child(3)")
    .append('<img src="images/step-arrow.png" alt="" class="step-arrow">')
    .find("a")
    .append('<img src="images/step-3.png" alt="">')
    .append('<span class="step-order">Step 03</span>');
  $(".steps ul li:last-child a")
    .append('<img src="images/step-4.png" alt="">')
    .append('<span class="step-order">Step 04</span>');
});
