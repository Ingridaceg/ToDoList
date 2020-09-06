const express = require('express');
const app = express();
const port = 5000;

const environmentSetup = require('./core/env');
const dataBaseConnector = require('./core/database');
const toDoPaths = require('./paths');

environmentSetup();

const {DB_CLUSTER, DB_USER, DB_PASSWORD, DB_NAME} = process.env;

dataBaseConnector(DB_NAME, DB_PASSWORD, DB_USER, DB_CLUSTER);

app.use(toDoPaths);

app.listen(port, () => {
  console.log(`Example app listen at http://localhost:${port}`);
})