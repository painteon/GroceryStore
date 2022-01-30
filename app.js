require("dotenv").config();
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


const PORT = process.env.PORT || 3000;

const publisherKey = process.env.PUBLISHABLE_KEY;
const secretKey = process.env.SECRET_KEY;

const stripe = require('stripe')(secretKey);

const myDomain = 'http://localhost:3000'

const date = new Date();
let year = date.getFullYear();

app.get("/", function(req, res) {
  fs.readFile('items.json', function(error, data) {
    if (error) {
      res.status(500).end();
    } else {
      res.render('home', {
        pK: publisherKey,
        items: JSON.parse(data),
        year: year
      });
    }
  });
});


let url;

app.get("/create-checkout-session", function (req, res){

});

// new post
app.post("/create-checkout-session", async (req, res) => {

  await console.log(req.body)
  await console.log(req.body.items)





  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.SERVER_URL}/success`,
      cancel_url: `${process.env.SERVER_URL}/cancel`,
      line_items: req.body.items.map(function(item) {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name
            },
            unit_amount: item.price
          },
          quantity: item.quantity
        }
      })
    })
    res.json({
      url: session.url
    })
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
    console.error(e);
  }
});

app.get("/success", function(req, res) {
  res.render('success');
});

app.get("/cancel", function(req, res) {
  res.render('cancel');
});

app.post("/goHome", function(req, res) {
  console.log("clicked");
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
