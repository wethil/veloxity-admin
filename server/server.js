const express = require('express');
const bodyParser = require('body-parser');

const { getBalance } = require('./data/balance');
const { getTopThreeSelling } = require('./data/topSelling');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/data', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:1234');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.send({ balance: getBalance(), topSelling: getTopThreeSelling() });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
