const express = require("express");
const bodyParser = require("body-parser");
const ActiveCampaign = require("activecampaign");
const fs = require("fs");
const app = express();

// Active Campaign private keys
let ac = new ActiveCampaign(
  "https://digital-delivery.api-us1.com",
  "8201eac81248e39cf842f7bdc00fac7597e04ac9e37c5b41a6fe7ac049c003de582dd6fd"
);

// Parsing the data with bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

// Logging the port we are listening to
app.listen(3000, function() {
  console.log("Listening to port 3000");
});

// Serving the static public folder to the user
app.use(express.static(__dirname + "/public"));
app.get("/", function(req, res) {
  res.sendFile("index.html");
});

// Getting & writing the invoice number in invoiceData.txt
app.get("/getInvoiceNumber", function(req, res) {
  fs.readFile("./invoiceData.txt", "utf8", (err, data) => {
    if (err) throw err;
    let invNumber = Number(data) + 1;
    res.json(invNumber);
    fs.writeFile("./invoiceData.txt", `${invNumber}`, "utf8", err => {
      if (err) throw err;
    });
  });
});

// Adding the contact to Active Campaign via post method
app.post("/form.html", function(req, res) {
  addContactToActiveCampaign(req.body);
});

// Getting the Active Campaign data & adding the new contact
function addContactToActiveCampaign(data) {
  let newContact = {
    "p[8]": 8,
    name: data.name,
    phone: data.phone,
    email: data.email,
    "field[%invoiceNumber%]": data.invoiceNumber,
    "field[%AGE%,0]": data.age,
    "field[%BODY_WEIGHT%, 0]": data.weight,
    "field[%HEIGHT%, 0]": data.height,
    "field[%GENDER%, 0]": data.gender,
    "field[%DESIRED_PROGRAM%, 0]": data.regimes,
    "field[%DESIRED_GOALS%, 0]": data.goals,
    "field[%PREVIOUS_SPORT_ACTIVITY%, 0]": data.before,
    "field[%SPECIFY_PREVIOUS_SPORT_ACTIVITY%, 0]": data.beforeSports,
    "field[%DAY_TO_DAY_ACTIVITY%, 0]": data.work,
    "field[%RECENT_ILLNESS%, 0]": data.recentIllness,
    "field[%ILLNESS%, 0]": data.illness,
    "field[%ANTIBIOTICS%, 0]": data.antibiotics,
    "field[%ALLERGIES%, 0]": data.allergies,
    "field[%SPECIFY_ALLERGIES%, 0]": data.allergiesFoods,
    "field[%STOMACH_SKIN_PROBLEMS%, 0]": data.acne,
    "field[%SPECIFY_PROBLEMS%, 0]": data.acneFoods,
    "field[%FREQUENT_FOODS%, 0]": data.frequentFoods,
    "field[%MEAL_FREQUENCY%, 0]": data.frequentMeals,
    "field[%MEAT_FISH_DAIRY%, 0]": convertObjectToString(
      data.meatsFishAndDairyProducts
    ),
    "field[%NUTS_GRAINS_OTHER%, 0]": convertObjectToString(
      data.nutsGrainsAndOtherProducts
    ),
    "field[%FRUITS%, 0]": convertObjectToString(data.fruits),
    "field[%VEGETABLES%, 0]": convertObjectToString(data.vegetables)
  };

  let contact_add = ac.api("contact/add", newContact);
}

// Convert the checkboxes object to string for Active Campaign
function convertObjectToString(object) {
  let keysArr = Object.keys(object);
  let valuesArr = [];
  let returnString = "";

  keysArr.forEach(key => {
    valuesArr.push(object[`${key}`]);
  });

  if (object[`1`].length > 1) {
    returnString = valuesArr.join(`, `);
  } else {
    returnString = valuesArr.join(``);
  }

  return returnString;
}
