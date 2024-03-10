'use strict'

const { product, clothing, electronics, furniture } = require('../models/product.model');
const { BadRequestError } = require("../core/error.response");
const { findAllDraftsForShop, findAllPublishForShop, publishProductByShop, unPublishProductByShop, searchProduct } = require("../models/repositories/product.repo");

// define Factory class to create product
class ProductFactory {

    static productRegistry = {}

    static registerProductType(type, classRef) {
        ProductFactory.productRegistry[type] = classRef
    }

    static async createProduct(type, payload) {
        const productClass = ProductFactory.productRegistry[type]
        if (product_type) throw new BadRequestError(`Invalid Product Types ${type}`);

        return new productClass(payload).createProduct()
    }

    static async publishProductByShop({ product_shop, product_id }) {
        const shop = await publishProductByShop({ product_shop, product_id })
    }

    static async unPublishProductByShop({ product_shop, product_id }) {
        const shop = await unPublishProductByShop({ product_shop, product_id })
    }

    static async findAllDraftsForShop({ product_shop, limit = 50, skip = 0 }) {
        const query = { product_shop, isDraft: true }
        return await findAllDraftsForShop({ query, limit, skip })
    }

    static async findAllPublishForShop({ product_shop, limit = 50, skip = 0 }) {
        const query = { product_shop, isPublished: true }
        return await findAllPublishForShop({ query, limit, skip })
    }

    static async searchProducts({keySearch: string}) {
        return await searchProduct({keySearch})
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
    async createProduct(product_id) {
        return await product.create({ ...this, _id: product_id })
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
        const newElectronic = await electronics.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        })
        if (!newElectronic) throw new BadRequestError('create new Electronics error');

        const newProduct = await super.createProduct(newElectronic._id);
        if (!newProduct) throw new BadRequestError('create new Product error');

        return newProduct;
    }
}

// define sub-class for different product types Furniture
class Furnitures extends Product {
    async createProduct() {
        const newFurniture = await furniture.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        })
        if (!newFurniture) throw new BadRequestError('create new Furnitures error');

        const newProduct = await super.createProduct(newFurniture._id);
        if (!newProduct) throw new BadRequestError('create new Product error');

        return newProduct;
    }
}

// register product types
ProductFactory.registerProductType('Electronics', Electronics)
ProductFactory.registerProductType('Clothing', Clothing)
ProductFactory.registerProductType('Furniture', Furnitures)

module.exports = ProductFactory;