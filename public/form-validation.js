// Materialize Stepper and Built in jQuery validation
$(function() {
  $(".stepper").activateStepper();
  $("#questionaire").validate();
});

// Hidden div for client's practiced previous sport
$('input[name="before"]').change(function() {
  const hiddenDiv = $("#beforeSport");
  if (this.value == "да") {
    hiddenDiv.fadeIn(1000);
  } else {
    hiddenDiv.fadeOut(700);
  }
});

// Hidden div for client's allergies
$('input[name="allergies"]').change(function() {
  const hiddenDiv = $("#allergiesFood");
  if (this.value == "да") {
    hiddenDiv.fadeIn(1000);
  } else {
    hiddenDiv.fadeOut(700);
  }
});

// Hidden div for client's food intolerances
$('input[name="acne"]').change(function() {
  const hiddenDiv = $("#acneFood");
  if (this.value == "да") {
    hiddenDiv.fadeIn(1000);
  } else {
    hiddenDiv.fadeOut(700);
  }
});

/* List of the onClick submit button events:
 * food prefferences checkboxes validation;
 * regimes splitting (regimeName)"-"(regimePrice);
 * privacy policy checkbox validation;
 * submiting the data to Active Campaign; */
$("#submit-button").on("click", e => {
  e.preventDefault();
  e.stopPropagation();

  /* Setting prices to empty array;
   * Setting regime name to empty string;
   * Setting regime price to 0; */
  let prices = [];
  let regimeName = "";
  let regimePrice = 0;

  let nutritionRegime = $("#nutritionRegime:checked").val();
  let trainingRegime = $("#trainingRegime:checked").val();
  let complexRegime = $("#complexRegime:checked").val();

  // Splitting the values
  if (nutritionRegime) {
    let splitTemp = nutritionRegime.split("-");
    regimeName = splitTemp[0];
    regimePrice = splitTemp[1];
  } else if (trainingRegime) {
    let splitTemp = trainingRegime.split("-");
    regimeName = splitTemp[0];
    regimePrice = splitTemp[1];
  } else if (complexRegime) {
    let splitTemp = complexRegime.split("-");
    regimeName = splitTemp[0];
    regimePrice = splitTemp[1];
  }
  for (let i = 0; i < prices.length; i++) {
    if (prices[i] !== undefined) {
      regimeName = prices[i].split("-")[0];
      regimePrice = prices[i].split("-")[1];
    }
  }

  function getCheckboxValues(arr) {
    let outputArr = [];
    arr.each(function() {
      outputArr.unshift(this.value);
    });
    return outputArr;
  }

  // Getting all of the selected checkboxes
  const selectedMeatsFishAndDairyProducts = $(
    "input[name='meatsFishAndDairyProducts']:checked"
  );
  const selectedNutsGrainsAndOtherProducts = $(
    "input[name='nutsGrainsAndOtherProducts']:checked"
  );
  const selectedFruits = $("input[name='fruits']:checked");
  const selectedVegetables = $("input[name='vegetables']:checked");
  const selectedPrivacy = $("input[name='privacy']:checked");

  // Getting all of the warning divs for each of the four sections
  const warningDivMeatsFishAndDairyProducts = $(
    `div.warning-div#meatsFishAndDairyProducts`
  );
  const warningDivNutsGrainsAndOtherProducts = $(
    `div.warning-div#nutsGrainsAndOtherProducts`
  );
  const warningDivFruits = $(`div.warning-div#fruits`);
  const warningDivVegetables = $(`div.warning-div#vegetables`);
  const warningDivPrivacy = $(`div.warning-div#privacyPolicy`);

  // Creating arrays to keep all the data in once the selections have been made
  let chosenMeatsFishAndDairyProducts = [];
  let chosenNutsGrainsAndOtherProducts = [];
  let chosenFruits = [];
  let chosenVegetables = [];
  let chosenPrivacy = [];

  // Creating variables with which to track ifeach section has been filled properly
  let correctlySubmittedMeatsFishAndDairyProducts = false;
  let correctlySubmittedNutsGrainsAndOtherProducts = false;
  let correctlySubmittedFruits = false;
  let correctlySubmittedVegetables = false;
  let correctlySubmittedPrivacy = false;

  // Running the check for the meats, fish and dairy product section
  if (selectedMeatsFishAndDairyProducts.length) {
    chosenMeatsFishAndDairyProducts = getCheckboxValues(
      selectedMeatsFishAndDairyProducts
    );
    correctlySubmittedMeatsFishAndDairyProducts = true;
    warningDivMeatsFishAndDairyProducts.fadeOut();
  } else {
    chosenMeatsFishAndDairyProducts = [];
    correctlySubmittedMeatsFishAndDairyProducts = false;
    warningDivMeatsFishAndDairyProducts.fadeIn();
  }

  // Running the check for the nuts, grains and other products section
  if (selectedNutsGrainsAndOtherProducts.length) {
    chosenNutsGrainsAndOtherProducts = getCheckboxValues(
      selectedNutsGrainsAndOtherProducts
    );
    correctlySubmittedNutsGrainsAndOtherProducts = true;
    warningDivNutsGrainsAndOtherProducts.fadeOut();
  } else {
    chosenNutsGrainsAndOtherProducts = [];
    correctlySubmittedMeatsFishAndDairyProducts = false;
    warningDivNutsGrainsAndOtherProducts.fadeIn();
  }

  // Rinning the check for the fuits section
  if (selectedFruits.length) {
    chosenFruits = getCheckboxValues(selectedFruits);
    correctlySubmittedFruits = true;
    warningDivFruits.fadeOut();
  } else {
    chosenFruits = [];
    correctlySubmittedFruits = false;
    warningDivFruits.fadeIn();
  }

  // Running the check for the vegetables section
  if (selectedVegetables.length) {
    chosenVegetables = getCheckboxValues(selectedVegetables);
    correctlySubmittedVegetables = true;
    warningDivVegetables.fadeOut();
  } else {
    chosenVegetables = [];
    correctlySubmittedVegetables = false;
    warningDivVegetables.fadeIn();
  }

  // Running the check for the privacy policy
  if (selectedPrivacy.length) {
    chosenPrivacy = getCheckboxValues(selectedPrivacy);
    correctlySubmittedPrivacy = true;
    warningDivPrivacy.fadeOut();
  } else {
    chosenPrivacy = [];
    correctlySubmittedPrivacy = false;
    warningDivPrivacy.fadeIn();
  }

  // IF and only IF all five fields are validated
  if (
    correctlySubmittedMeatsFishAndDairyProducts &&
    correctlySubmittedNutsGrainsAndOtherProducts &&
    correctlySubmittedFruits &&
    correctlySubmittedVegetables &&
    correctlySubmittedPrivacy
  ) {
    /* give ePayForm its data and submit
     * since the get method from jQuery is aSync
     * we submit the form within the method */
    $("#regimePrice").val(regimePrice);
    $("#regimeDescription").val(regimeName);
    $("#expDate").val(getExpirationDate());
    $.get("/getInvoiceNumber", function(data) {
      data = evaluateInvNumber(data);
      //update invoiceNumber in regimeQuestionnaire form
      $("#invoiceNumber").val(data);

      $("#invoice").val(data);
      $("#ePayForm").submit();

      //handle network error here.
    });

    // Post to Active Campaign
    let urlForRegimeQuestionnaire = $("#regimeQuestionnaire").action;
    let dataOfregimeQuestionnaire = $("#regimeQuestionnaire").serialize();
    dataOfregimeQuestionnaire = decodeURI(dataOfregimeQuestionnaire);
    $.post(urlForRegimeQuestionnaire, dataOfregimeQuestionnaire);
  }
});

// Getting the payment expiration date
function getExpirationDate() {
  let today = new Date();
  let dd = today.getDate() + 1;
  // January is 0!
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = dd + "." + mm + "." + yyyy;
  return today;
}

// Getting the invoice number
function getInvoiceNumber() {
  let invNumber = 0;
  $.get("/getInvoiceNumber", function(data) {
    invNumber = data;
  });
  return invNumber;
}

// Evaluating the invoice number
function evaluateInvNumber(data) {
  if (data < 10) {
    data = "0000" + data;
  } else if (data < 100) {
    data = "000" + data;
  } else if (data < 1000) {
    data = "00" + data;
  } else if (data < 10000) {
    data = "0" + data;
  }
  return data;
}
