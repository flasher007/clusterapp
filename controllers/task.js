const Task = require('../models').Task;

module.exports = {
    list(req, res) {
        return Task
            .all()
            .then(tasks => res.status(200).send(tasks))
            .catch(error => res.status(400).send(error));
    },
    get(req, res) {
        return Task
            .findById(req.params.id)
            .then(task => {
                if (!task) {
                    return res.status(404).send({
                        message: 'Task Not Found',
                    });
                }
                return res.status(200).send(task);
            })
            .catch(error => res.status(400).send(error));
    },
    create(req, res) {
        return Task
            .create({
                name: req.body.name,
                price: req.body.price,
            })
            .then(task => res.status(201).send(task))
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Task
            .findById(req.params.id)
            .then(task => {
                if (!task) {
                    return res.status(404).send({
                        message: 'Task Not Found',
                    });
                }
                return task
                    .update({
                        name: req.body.name || task.name,
                        price: req.body.price || task.price,
                    })
                    .then(() => res.status(200).send(task))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    destroy(req, res) {
        return Task
            .findById(req.params.id)
            .then(task => {
                if (!task) {
                    return res.status(400).send({
                        message: 'Task Not Found',
                    });
                }
                return task
                    .destroy()
                    .then(() => res.status(200).send({ message: 'Task deleted.' }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};