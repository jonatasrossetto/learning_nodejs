//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const config = require('./config.js');
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const listId = config.mailChimpUniqueId();

mailchimp.setConfig({
  apiKey: config.mailChimpApiKey(),
  server: "us13"
});

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
const port = 3000; 


async function checkConnection() {
    const response = await mailchimp.ping.get();
    console.log(response.id);
}
checkConnection();


const subscribingUser = {
  firstName: "Prudence",
  lastName: "McVankab",
  email: "joao@gmail.com"
};


async function run() {
  console.log('start');
  console.log(listId);
  const response = await mailchimp.lists.addListMember(listId, {
    email_address: subscribingUser.email,
    status: "subscribed",
    merge_fields: {
      FNAME: subscribingUser.firstName,
      LNAME: subscribingUser.lastName
    }
  });
}

try {
  run();
} catch (error) {
  console.log(error);
}



  



app.listen(port, function() {
  console.log(`App running on port ${port}`);
})



//****************************************************************************
// https://mailchimp.com/developer/marketing/guides/create-your-first-audience/
// The following code Check a contact’s subscription status,
// it has the try/catch structure which can be used in other api queries

// const md5 = require("md5");

// const listId = "YOUR_LIST_ID";
// const email = "prudence.mcvankab@example.com";
// const subscriberHash = md5(email.toLowerCase());

// async function run() {
//   try {
//     const response = await mailchimp.lists.getListMember(
//       listId,
//       subscriberHash
//     );

//     console.log(`This user's subscription status is ${response.status}.`);
//   } catch (e) {
//     if (e.status === 404) {
//       console.error(`This email is not subscribed to this list`, e);
//     }
//   }
// }
// run();
//************************************************************************** */