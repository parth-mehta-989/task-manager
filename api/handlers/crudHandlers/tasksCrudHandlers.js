const { List, Task } = require('../../DB/models');

exports.getAllTasksHandler = (req, res) => {
    // return all the tasks of a list
    let ListId = req.params.id;
    Task.find({
        _listId: ListId
    }).then((records) => {
        res.status(200).send(records);
    }).catch((err) => {
        res.status(500).send(err);
    });
};
exports.getTaskHandler = (req, res) => {
    // return selected tasks of a list
    let ListId = req.params.listId;
    let taskId = req.params.taskId;
     Task.findOne({
        _listId: ListId,
        _id:taskId
    }).then((record) => {
        res.status(200).send(record);
    }).catch((err) => {
        res.status(500).send(err);
    });
};

exports.createNewTaskHandler = (req, res) => {
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
};

exports.updateTaskHandler = (req, res) => {
    let listId = req.params.listId
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
};

exports.deleteTaskHandler = (req, res) => {
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
};