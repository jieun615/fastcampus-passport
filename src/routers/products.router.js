const express = require('express');
const productsController = require('../controllers/products.controller');
const productsRouter = express.Router();

productsRouter.post('/', function(req, res){
    productsController.createProduct
});
productsRouter.post('/', function(req, res){
    productsController.getProducts
});
productsRouter.post('/:productId', function(req, res){
    productsController.getProductsById
});
productsRouter.put('/:productId', function(req, res){
    productsController.updateProduct
});
productsRouter.delete('/:productId', function(req, res){
    productsController.deleteProduct
});
module.exports = productsRouter;