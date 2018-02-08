/*
 * index.js
 * Copyright 2018 Lucas Neves <lcneves@gmail.com>
 *
 * Server for a Powerball lotto number generated.
 * Not affiliated with Powerball.
 */

'use strict';

const assert = require('assert');
const express = require('express');
var app = express();

app.set('view engine', 'pug');

function generateNumbers () {
  const numWhites = 69;
  const numPower = 26;
  const pickWhites = 5;

  var numbers = [];

  while (numbers.length < pickWhites) {
    let ball = Math.floor(Math.random() * numWhites + 1);
    if (numbers.includes(ball))
      continue;
    else
      numbers.push(ball);
  }

  numbers.sort((a, b) => a - b);
  numbers.push(Math.floor(Math.random() * numPower + 1));

  return numbers;
}

app.get('/', function (ignoreReq, res) {
  res.render('powerball', { numbers: generateNumbers() });
});

app.get('*', function (ignoreReq, res) {
  res.status(404).send();
});

var port;
try {
  port = parseInt(process.env.PORT, 10);
  assert(Number.isInteger(port));
} catch (ignoreErr) {
  port = 8004; // Whatever...
}

app.listen(port, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Powerball listening on port ' + port);
});
