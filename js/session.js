$(function () {
  // check if the sessionStorage stored the user data. so that we can fetch the previous user data in case of page refresh

  // sessStorage name is used to prevent conflicts with the default sessionStorage js keyword
  const sessStorage = sessionStorage.getItem("userData");

  if (sessStorage) {
    // converting the Session Storage data to json from json string
    const user = JSON.parse(sessStorage);

    // selecting all the targeted inputs . using common pattern they use
    const $inputs = $("input[placeholder]");

    $inputs.each((_, element) => {
      const $el = $(element);

      // converting place holder of each input to camel case and then setting the value of each input element based on its placeholder by fetching from the user variable.
      $el.val(user[toCamelCase($el.attr("placeholder"))]);
    });
  }

  // function to convert a string to camel case
  function toCamelCase(str) {
    return str
      .trim() // removes the begining and ending spaces
      .toLowerCase() // convert to lower case
      .split(" ") // convert to an array containing elements based on the spaces
      .map(
        (
          word,
          i, // for each word skips the first word. and converts the first letter of second word to upperCase
        ) => (i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)),
      )
      .join(""); //joins the two words without any space between them
  }

  const user = {};

  const storeSessionData = () => {
    // selects the input elements from the DOM
    const $inputs = $("input[placeholder]");

    // convert the placeholder of input elements to camel case and then storing their values against the placeholder in the session storage as a json string
    $inputs.each((_, element) => {
      const $el = $(element);
      user[toCamelCase($el.attr("placeholder"))] = $el.val();
      sessionStorage.setItem("userData", JSON.stringify(user));
    });
  };

  // adds an event listner on all the input elements on every keypress to trigger the store session function
  $(".form-control").on("input", storeSessionData);
});
