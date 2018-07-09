const productsController = require('../controllers').products;
const tasksController = require('../controllers').tasks;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the API v1.0!',
    }));

    // console.log(app.scServer);

    // socket.emit('productChanges', {action: 'update'});

    app.get('/api/products', productsController.list);
    app.get('/api/products/:id', productsController.get);
    app.post('/api/products', productsController.create);
    app.put('/api/products/:id', productsController.update);
    app.delete('/api/products/:id', productsController.destroy);

    app.get('/api/tasks', tasksController.list);
    app.get('/api/tasks/:id', tasksController.get);
    app.post('/api/tasks', tasksController.create);
    app.put('/api/tasks/:id', tasksController.update);
    app.delete('/api/tasks/:id', tasksController.destroy);

    app.get('*', (req, res) => res.status(404).send({
        message: 'Error 404. Page not found',
    }));
};