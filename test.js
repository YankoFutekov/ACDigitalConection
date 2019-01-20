app.post("/payment-confirmation", (req, res) => {

   let invoiceNumber = req.body.invoiceNumber;

   //clode connection with caller(client = epay)
   res.statusCode = 200;
   res.json("POST response to client");

   //find UserId + Mail from digital thingy
   let contact = ac.api("contact/list", filters[fields][% invoiceNumber %] = invoiceNumber );

   if (contant != {}) {
      contact.id
      contact.mail

      let response = ac.api("contact/edit", id, email, [9])
   }
   

}




// Geting the invoiceNumber from ePay's response & placing in a variable
app.post("/test", (req, res) => res.send(["INVOICE=884927333:STATUS=PAID:PAY_TIME=20190110:STAN=[123456]:BCODE=[123ASD]"]));

let correctInvoiceNumber = "INVOICE=884927333";

// Getting the contact information from ActiveCampaign
const contactView = ac.api("contact/view");

app.get(contactView, (req, res) => {
  req.json({listid: 8,
            subscriberid: // How to get this parameter dynamically ?
 })
    // Place the list id & subscriber id into a variable "contactInfo"
});

// Getting the custom field id of the contact from ActiveCampaign
const listFieldView = ac.api("list/field/view");
// Use the "contactInfo" variable here
app.get(listFieldView, (req, res) => {
  req.json({id: // How to get this parameter dynamically ?
 });
});

let aCinvoiceId = "INVOICE=884927333";

// If both invoiceNumbers match, we move the contact from one list to another
if (correctInvoiceNumber === aCinvoiceId) {
// TODO Move contact from default list to a paid member list contact_edit p[123]
} else if () {
    console.log("INVOICE=884927333:STATUS=EXPIRED");
 } else {
    console.log("INVOICE=884927333:STATUS=DENIED");
 }