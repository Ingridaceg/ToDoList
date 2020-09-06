const express = require('express');
const {toDoPrefix, apiVersionPrefix} = require('../core/constants')
const api = require('./todo.api');


const app = express.Router();


app.get(`${apiVersionPrefix}${toDoPrefix}/get-all-todos`, (request, response) => {
  api.getAllToDos((apiResponse) => {
    response.json(apiResponse);
  })
});

app.put(`${apiVersionPrefix}${toDoPrefix}/set-todo`, (request, response) => {
  response.send('here todo ');
});

app.delete(`${apiVersionPrefix}${toDoPrefix}/delete-todo/:id`, (request, response) => {
  response.send('here todo ');
});

module.exports = app;