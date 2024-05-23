'use strict'

const { inventory } = require('../inventory.model')
const { Types } = require('mongoose')
const { convertToOjectIdMongodb } = require('../../utils')

const insertInventory = async ({
    productId, shopId, stock, location = 'unknown'
}) => {
    return await inventory.create({
        inven_productId: productId,
        inven_stock: stock,
        inven_shopId: shopId,
        inven_location: location
    })
}

const reservationInventory = async ({ productId, quantity, cardId }) => {
    const query = {
        inven_productId: convertToOjectIdMongodb(productId),
        inven_stock: { $gte: quantity }
    }, updateSet = {
        $inc: {
            inven_stock: -quantity
        },
        $push: {
            inven_reservation: {
                quantity,
                cartId,
                createOn: new Date()
            }
        }
    }, options = { upsert: true, new: true }
    return await inventory.updateOne(query, updateSet)
}

module.exports = {
    insertInventory,
    reservationInventory
}