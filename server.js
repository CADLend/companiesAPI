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

app.post('/api/companies', (req, res) => {
  const newCompany = req.body;

  db.addNewCompany(newCompany)
    .then((newComp) => {
      res.json(newComp);
    })
    .catch((err) => {
      res.json({ error: err.message});
    })
})

app.get('/api/companies', (req, res) => {
  const page = parseInt(req.query.page);
  const perPage = parseInt(req.query.perPage);
  const name = req.query.name;

  if(isNaN(page) || isNaN(perPage)) {
    return res.status(400).json({
      page: page,
      perPage: perPage,
      error: "Page and perPage query parameters must be valid numbers"
    });
  }

  db.getAllCompanies(page, perPage, name)
    .then((companies) => {
      res.json(companies);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message})
    });
})

app.get('/api/company/:id', (req, res) => {
  const companyId = req.params.id;
  db.getCompanyById(companyId)
  .then((company) => {
    res.json(company);
  })
  .catch((err) => {
    res.status(500).json({ error: err.message})
  });
})

app.put('/api/company/:id', (req, res) => {
  const companyId = req.params.id;
  const companyData = req.body;
  console.log("PUT company by id")

  db.updateCompanyById(companyData, companyId)
    .then((company) => {
      res.json(company);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message})
    });
})

app.delete('/api/company/:id', (req, res) => {
  const companyId = req.params.id;

  db.deleteCompanyById(companyId)
    .then((deleteResult) => {
      res.json(deleteResult)
    })
    .catch((err) => {
      res.json({ error: err.message})
    });
})

db.initialize(process.env.MONGODB_CONN_STRING).then(() => {
  app.listen(HTTP_PORT, () => {
    console.log(`Server listening on: ${HTTP_PORT}`);
  });
}).catch((err) => {
  console.log("initialize() failed!");
  console.log(err);
})