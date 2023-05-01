// load models
const { List, Task } = require('../../DB/models');
exports.getAllListsHandler = (req, res) => {
    // return all the lists
    List.find({}).then((lists) => {
        res.send(lists);
    }).catch((err) => {
        res.status(500).send(err);
    });
};

exports.getListHandler = (req, res) => {
    // return selected list
    let listId = req.params.id
    List.findOne({
        _id:listId,
    }).then((lists) => {
        res.send(lists);
    }).catch((err) => {
        res.status(500).send(err);
    });
};

exports.createListHandler = (req, res) => {
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
};

exports.updateListHandler = (req, res) => {
    // updates a list
    let id = req.params.id;
    List.findOneAndUpdate({ _id: id }, {
        $set: req.body
    }).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err);
    });
};

exports.deleteListHandler = (req, res) => {
    // deletes a list
    let id = req.params.id;
    List.findOneAndDelete({ _id: id }).then((result) => {
        if (result) {
            deleteTasksFromList(id);
            res.status(200).send(result);
        }
        
    }).catch((err) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(500).send();
    });
};

/* HELPER METHODS */
let deleteTasksFromList = (listId) => {
    console.log("inside");
    Task.deleteMany({
        _listId: listId
    }).then(() => {
        console.log("Tasks from " + _listId + " were deleted!");
    });
};