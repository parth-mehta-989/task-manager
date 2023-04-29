const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./DB/mongoose');
const app = express();

// load models
const { List, Task } = require('./DB/models');
const { response } = require('express');

// load middleware
app.use(bodyParser.json());

// CORS HEADERS MIDDLEWARE
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// List routes

/** 
 * GET /lists
 * Purpose: gets all lists
*/
app.get('/lists', (req, res) => {
    // return all the lists
    List.find({}).then((lists) => {
        res.send(lists);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

/**
 * POST /lists
 * Purpose: creates a list and returns the created list
 */
app.post('/lists', (req, res) => {
    // create a new list and return the new list document with the id
    let title = req.body.title;
    let newList = new List({
        title: title
    });
    newList.save().then((listDoc) => {
        res.status(200).send(listDoc);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

/**
 * PATCH /lists/:id
 * Purpose: updates the specified list
 */
app.patch('/lists/:id', (req, res) => {
    // updates a list
    let id = req.params.id;
    List.findOneAndUpdate({ _id: id }, {
        $set: req.body
    }).then((result) => {
        res.sendStatus(200);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

/**
 * DELETE /lists/:id
 * Purpose: updates the specifiedl ist
 */
app.delete('/lists/:id', (req, res) => {
    // deletes a list
    let id = req.params.id;
    List.findOneAndDelete({ _id: id }).then((result) => {
        if (result) {
            res.status(200).send(result);
        }
        deleteTasksFromList(id);
        res.status.apply(200).send('done');
    }).catch((err) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(500).send();
    });
});

/** 
 * GET /lists/:id/tasks
 * Purpose: gets all lists
*/
app.get('/lists/:id/tasks', (req, res) => {
    // return all the tasks of a list
    let ListId = req.params.id;
    Task.find({
        _listId: ListId
    }).then((record) => {
        res.status(200).send(record);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

/**
 * POST /list/:id/tasks
 * Purpose: creates a task
 */
app.post('/lists/:id/tasks', (req, res) => {
    let listId = req.params.id;
    List.find({
        _id: listId
    }).then((list) => {
        if (list) {
            return true;
        };
        return false;
    }).then((canCreateTask) => {
        if (canCreateTask) {
            let task = new Task({
                title: req.body.title,
                _listId: listId
            });
            task.save().then((createdTask) => {
                res.send(createdTask);
            });
        }
        if (!canCreateTask) {
            res.status(400).send("no list found with id: " + listId);
        }
    }).catch((err) => {
        res.send(500).send(err);
    });
});

/**
 * PATCH /list/:listId/tasks/:taskId
 * Purpose: Updates a specific task 
 */
app.get('list/:listid/tasks/:taskId', (req, res) => {

    List.findOne({
        _id: req.params.listId,
    }).then((list) => {
        if (list) {
            return true;
        }
        return false;
    }).then((canUpdateTasks) => {
        if (canUpdateTasks) {
            Task.findOneAndUpdate({
                _id: req.params.taskId,
                _listId: req.params.listId
            }, {
                $set: req.body
            }
            ).then(() => {
                res.send({ message: 'Updated successfully.' });
            });
        } else {
            res.sendStatus(404);
        }
    });
});

/**
 * DELETE /lists/:listId/tasks/:taskId
 * Purpose: Delete a task
 */
app.delete('/lists/:listId/tasks/:taskId', (req, res) => {

    List.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list) => {
        if (list) {
            // list object with the specified conditions was found
            // therefore the currently authenticated user can make updates to tasks within this list
            return true;
        }

        // else - the list object is undefined
        return false;
    }).then((canDeleteTasks) => {

        if (canDeleteTasks) {
            Task.findOneAndRemove({
                _id: req.params.taskId,
                _listId: req.params.listId
            }).then((removedTaskDoc) => {
                res.send(removedTaskDoc);
            });
        } else {
            res.status(400).send("list not found with id:" + req.params.listId);
        }
    });
});

/* HELPER METHODS */
let deleteTasksFromList = (listId) => {
    console.log("inside");
    Task.deleteMany({
        _listId: listId
    }).then(() => {
        console.log("Tasks from " + _listId + " were deleted!");
    });
};

app.listen(9090, () => {
    console.log("server listening on 9090");
});