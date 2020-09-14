const express = require('express');
const get = require('lodash/get');

const {toDoPrefix, apiVersionPrefix} = require('../core/constants')
const api = require('./todo.api');

const app = express.Router();

app.get(`${apiVersionPrefix}${toDoPrefix}/get-all-todos`, (request, response) => {
  api.getAllToDos((apiResponse) => {
    response.json(apiResponse);
  })
});

app.put(`${apiVersionPrefix}${toDoPrefix}/create-todo`, (request, response) => {
  const toDo = get(request, 'body', null);
  api.insertTask(toDo, (apiResponse) => {
    response.json(apiResponse);
  });
});

app.put(`${apiVersionPrefix}${toDoPrefix}/update-todo`, (request, response) => {
  const toDo = get(request, 'body', null);
  api.updateTask(toDo.id, toDo.completed, (apiResponse) => {
    response.json(apiResponse);
  });
});


app.delete(`${apiVersionPrefix}${toDoPrefix}/delete-todo`, (request, response) => {
  const toDo = get(request, 'body', null);
  api.deleteTask(toDo.id, (apiResponse) => {
    response.json(apiResponse);
  });
});

module.exports = app;