'use strict'
const cors = require('cors');
const userAuthRoutes = require('./security/userAuth.routes');

const jwt = require('jsonwebtoken');
const express = require('express');
const propierties = require('./config/properties');
const DB = require('./config/db');
const JWT_Secret = 'your_secret_key';
// init DB
DB();

const app = express();
const router = express.Router();

//configure bodyparser
const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

// configure app.use()
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use(cors());
app.use('/api', router);

//call user routing
userAuthRoutes(router);
// Error handling
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
  next();
});

app.use(router);
app.listen(propierties.PORT, () => console.log(`Server runing on port ${propierties.PORT}`));