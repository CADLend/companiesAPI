require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const CompaniesDB = require('./modules/companiesDB');

const app = express();
const HTTP_PORT = process.env.PORT || 3000;
const db = new CompaniesDB();

// JSON parser
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  console.log("\'/\' GET handler");
  res.json({msg: "Default loader"});
})



app.listen(HTTP_PORT, () => {
  console.log(`Server listening on: ${HTTP_PORT}`);
})