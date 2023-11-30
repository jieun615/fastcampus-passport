const productModel = require('../models/products.model');

async function createProduct(req, res, next) {
    try {
        const createdProduct = await productModel.create(req.body)
        res.status(201).json(createdProduct);
    } catch (error) {
        next(error)
    }
}

async function getProducts(req, rea, next) {
    try {
        const allProducts = await productModel.find({});
        res.status(200).json(allProducts);
    } catch(error){
        next(error);
    }
}

async function getProductsById(req, rea, next) {
    try {
        const product = await productModel.findById(req.params.productId);
        if(product) {
            res.status(200).json(product);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductsById
}