'use strict'

const { product, clothing, electronics } = require('../models/product.model');
const { BadRequestError, AuFailureError, ForbiddenError } = require("../core/error.response");

// define Factory class to create product
class ProductFactory {
    static async createProduct(type, payload) {
        switch(type) {
            case 'Electronics':
                return new Electronics(payload)
            case 'Clothing':
                return new Clothing(payload).createProduct()
            default:
                throw new BadRequestError(`Invalid Product Types ${type}`)
        }
    }
}

// define base product class
class Product {
    constructor({
        product_name, product_thumb, product_description, product_price,
        product_type, product_shop, product_attributes, product_quantity
    }) {
        this.product_name = product_name
        this.product_thumb = product_thumb
        this.product_description = product_description
        this.product_price = product_price
        this.product_shop = product_shop
        this.product_attributes = product_attributes
        this.product_quantity = product_quantity
        this.product_type = product_type
    }

    // create new product
    async createProduct() {
        return await product.create(this)
    }
}

// define sub-class for different product types Clothing
class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create(this.product_attributes)
        if (!newClothing) throw new BadRequestError('create new Clothing error');
        
        const newProduct = await super.createProduct();
        if (!newProduct) throw new BadRequestError('create new Product error');

        return newProduct;
    }
}

// define sub-class for different product types Electronics
class Electronics extends Product {
    async createProduct() {
        const newElectronic = await electronics.create(this.product_attributes)
        if (!newElectronic) throw new BadRequestError('create new Electronics error');
        
        const newProduct = await super.createProduct();
        if (!newProduct) throw new BadRequestError('create new Product error');

        return newProduct;
    }
}

module.exports = ProductFactory;