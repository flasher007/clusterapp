const productsController = require('../controllers').products;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the API v1.0!',
    }));

    app.get('/api/products', productsController.list);
    app.get('/api/products/:id', productsController.get);
    app.post('/api/products', productsController.create);
    app.put('/api/products/:id', productsController.update);
    app.delete('/api/products/:id', productsController.destroy);
};