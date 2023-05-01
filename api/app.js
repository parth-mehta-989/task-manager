const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./DB/mongoose');
const app = express();

// load models
const { List, Task } = require('./DB/models');
const listsCrudHandlers = require('./handlers/crudHandlers/listsCrudHandlers')
const tasksCrudHandlers = require('./handlers/crudHandlers/tasksCrudHandlers')

// load middleware
app.use(bodyParser.json());

// CORS HEADERS MIDDLEWARE
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// List routes

/** 
 * GET /lists
 * Purpose: gets all lists
*/
app.get('/lists', listsCrudHandlers.getAllListsHandler);

/**
 * POST /lists
 * Purpose: creates a list and returns the created list
 */
app.post('/lists', listsCrudHandlers.createListHandler);

/**
 * PATCH /lists/:id
 * Purpose: updates the specified list
 */
app.patch('/lists/:id', listsCrudHandlers.updateListHandler);

/**
 * DELETE /lists/:id
 * Purpose: updates the specifiedl ist
 */
app.delete('/lists/:id', listsCrudHandlers.deleteListHandler);

/** 
 * GET /lists/:id/tasks
 * Purpose: gets all lists
*/
app.get('/lists/:id/tasks', tasksCrudHandlers.getAllTasksHandler);

/**
 * POST /list/:id/tasks
 * Purpose: creates a task
 */
app.post('/lists/:id/tasks', tasksCrudHandlers.createNewTaskHandler);

/**
 * PATCH /list/:listId/tasks/:taskId
 * Purpose: Updates a specific task 
 */
app.patch('/lists/:listId/tasks/:taskId', tasksCrudHandlers.updateTaskHandler);

/**
 * DELETE /lists/:listId/tasks/:taskId
 * Purpose: Delete a task
 */
app.delete('/lists/:listId/tasks/:taskId', tasksCrudHandlers.deleteTaskHandler);

app.listen(9090, () => {
  console.log("listening on port 9090")
})