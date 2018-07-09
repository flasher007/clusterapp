const Product = require('../models').Product;

module.exports = {
    list(req, res) {
        return Product
            .all()
            .then(products => res.status(200).send(products))
            .catch(error => res.status(400).send(error));
    },
    get(req, res) {
        return Product
            .findById(req.params.id)
            .then(product => {
                if (!product) {
                    return res.status(404).send({
                        message: 'Product Not Found',
                    });
                }
                return res.status(200).send(product);
            })
            .catch(error => res.status(400).send(error));
    },
    create(req, res) {
        return Product
            .create({
                name: req.body.name,
                price: req.body.price,
            })
            .then(product => {
                req.app.scServer.emit('productChanges', {action: 'create', data: product});
                res.status(201).send(product);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Product
            .findById(req.params.id)
            .then(product => {
                if (!product) {
                    return res.status(404).send({
                        message: 'Product Not Found',
                    });
                }
                return product
                    .update({
                        name: req.body.name || product.name,
                        price: req.body.price || product.price,
                    })
                    .then(() => {
                        req.app.scServer.emit('productChanges', {action: 'update', data: product});
                        res.status(200).send(product);
                    })
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },
    destroy(req, res) {
        return Product
            .findById(req.params.id)
            .then(product => {
                if (!product) {
                    return res.status(400).send({
                        message: 'Product Not Found',
                    });
                }
                return product
                    .destroy()
                    .then(() => res.status(200).send({ message: 'Product deleted.' }))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};