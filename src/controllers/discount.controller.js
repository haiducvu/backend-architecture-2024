"use strict";

const DiscountService = require('../services/discount.service');
const { SuccessResponse } = require('../core/success.response');

class DiscountController {

    createDiscountCode = async (req, res, next) => {
        new SuccessResponse({
            message: 'Successful Code Generations',
            metadata: await DiscountService.createDiscountCode({
                ...req.body,
                shopId: req.user.userId
            })
        }).send(res)
    }

    getAllDiscountCodesWithShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'Successful Code Generations',
            metadata: await DiscountService.getAllDiscountCodesWithShop({
                ...req.query,
                shopId: req.user.userId
            })
        }).send()
    }

    getDiscountAmount = async (req, res, next) => {
        new SuccessResponse({
            message: 'Successful Code Generations',
            metadata: await DiscountService.getDiscountAmount({
                ...req.body
            })
        }).send()
    }

    getAllDiscountCodesWithProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'Successful Code Generations',
            metadata: await DiscountService.getAllDiscountCodesWithProduct({
                ...req.query,
                shopId: req.user.userId
            })
        }).send()
    }

}

module.exports = new DiscountController()