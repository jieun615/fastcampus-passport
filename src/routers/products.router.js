const express = require('express');
const productsController = require('../controllers/products.controller');
const productsRouter = express.Router();

productsRouter.post('/', function(req, res){
    productsController.createProduct
});

module.exports = productsRouter;