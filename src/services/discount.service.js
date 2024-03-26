"use strict";

const { BadRequestError, NotFoundError } = require("../core/error.response");

const discount = require("../models/discount.model");
const { findAllProducts } = require("../models/repositories/product.repo");

const { convertToOjectIdMongodb } = require("../utils/index");

const {
    findAllDiscountCodesUnSelect,
    findAllDiscountCodesSelect,
    checkDiscountExists
} = require("../models/repositories/discount.repo");

class DiscountService {
    static async createDiscountCode(payload) {
        const {
            code,
            start_date,
            end_date,
            is_active,
            shopId,
            min_order_value,
            product_ids,
            applies_to,
            name,
            description,
            type,
            value,
            max_value,
            max_uses,
            uses_count,
            max_uses_per_user,
            users_used
        } = payload;

        // if (new Date() < new Date(start_date) || new Date() > new Date(end_date)) {
        //     throw new BadRequestError("Discount code was expired!");
        // }

        if (new Date(start_date) >= new Date(end_date)) {
            throw new BadRequestError("Start date must be before end_date!");
        }

        // create index for discount code
        const foundDiscount = await discount
            .findOne({
                discount_code: code,
                discount_shopId: convertToOjectIdMongodb(shopId),
            })
            .lean();

        if (foundDiscount && foundDiscount.discount_is_active) {
            throw new BadRequestError("Discount exists!");
        }
        console.log('11111', {
            1: shopId,
            2: convertToOjectIdMongodb(shopId)
        })
        const newDiscount = await discount.create({
            discount_name: name,
            discount_description: description,
            discount_type: type,
            discount_code: code,
            discount_value: value,
            discount_start_date: start_date,
            discount_end_date: end_date,
            discount_max_uses: max_uses,
            discount_uses_count: uses_count,
            discount_users_used: users_used,
            discount_max_uses_per_user: max_uses_per_user,
            discount_min_order_value: min_order_value || 0,
            discount_shopId: shopId,
            discount_is_active: is_active,
            discount_applies_to: applies_to,
            discount_product_ids: applies_to === "all" ? [] : product_ids,
            discount_max_value: max_value,
        });

        return newDiscount;
    }

    static async updateDiscountCode() { }

    static async getAllDiscountCodesWithProduct({
        code,
        shopId,
        userId,
        limit,
        page,
    }) {
        // create index for discount code
        const foundDiscount = await discount
            .findOne({
                discount_code: code,
                discount_shopId: convertToOjectIdMongodb(shopId),
            })
            .lean();

        if (!foundDiscount) {
            throw new NotFoundError("discount not exist!");
        }

        const { discount_applies_to, discount_product_ids } = foundDiscount;
        if (discount_applies_to === "all") {
            // get all product
            products = await findAllProducts({
                filter: {
                    product_shop: convertToOjectIdMongodb(shopId),
                    isPublished: true,
                },
                limit: +limit,
                page: +page,
                sort: "ctime",
                select: ["product_name"],
            });
        }

        if (discount_applies_to === "specific") {
            // get the products ids
            products = await findAllProducts({
                filter: {
                    _id: { $in: discount_product_ids },
                    isPublished: true,
                },
                limit: +limit,
                page: +page,
                sort: "ctime",
                select: ["product_name"],
            });
        }

        return products;
    }

    static async getAllDiscountCodesWithShop({ limit, page, shopId }) {
        const discounts = await findAllDiscountCodesUnSelect({
            limit: +limit,
            page: +page,
            filter: {
                discount_shopId: convertToOjectIdMongodb(shopId),
                discount_is_active: true,
            },
            unSelect: ["__v", "discount_shopId"],
            model: discount,
        });
        return discounts;
    }

    /*
          Apply Discount code
          products = [
           {
            productId,
            shopId,
            quantity,
            name,
            price
           },
           {
            ...
           }
          ]
         */

    static async getDiscountAmount({ codeId, userId, shopId, products }) {

        const foundDiscount = await checkDiscountExists({
            mode: discount,
            filter: {
                discount_code: codeId,
                discount_shopId: convertToOjectIdMongodb(shopId)
            }
        })

        if (!foundDiscount) throw new NotFoundError(`Discount doesn't exist`)

        const { discount_is_active, discount_max_uses, discount_min_order_value } = foundDiscount

        if (!discount_is_active) throw new NotFoundError(`Discount expired`)

        if (!discount_max_uses) throw new NotFoundError(`Discount are out!`)

        if (new Date() < new Date(discount_start_date) || new Date() > new Date(discount_end_date)) {
            throw new NotFoundError(`Discount code has expired`)
        }

        // check xem co set gia tri toi thieu hay khong?
        let totalOrder = 0;
        if (discount_min_order_value > 0) {
            // get total
            totalOrder = products.reduce((acc, product) => {
                return acc + (product.quantity * product.price)
            }, 0)

            if (totalOrder < discount_min_order_value) {
                throw new NotFoundError(`discount requires a minium order value of ${discount_min_order_value}`)
            }
        }

        if (discount_max_uses_per_user > 0) {
            const userUseDiscount = discount_users_used.find(user => user.userId === userId)
            if (userUseDiscount) {
                //...
            }
        }

        // check xem discount nay la fixed_amount -
        const amount = discount_type === 'fixed_amount' ? discount_value : totalOrder * (discount_value / 100)

        return {
            totalOrder,
            discount: amount,
            totalPrice: totalOrder - amount
        }
    }

    static async deleteDiscountCode({ shopId, codeId }) {
        const deleted = await discount.findOneAndDelete({
            discount_code: codeId,
            discount_shopId: convertToOjectIdMongodb(shopId)
        })

        return deleted;
    }

    static async cancelDiscountCode({ codeId, shopId, userId }) {
        const foundDiscount = await checkDiscountExists({
            mode: discount,
            filter: {
                discount_code: codeId,
                discount_shopId: convertToOjectIdMongodb(shopId)
            }
        })

        if (!foundDiscount) {
            throw new NotFoundError("discount not exist!");
        }

        const result = await discount.findByIdAndUpdate(foundDiscount._id, {
            $pull: {
                discount_users_used: userId,
            },
            $inc: {
                discount_max_uses: 1,
                discount_uses_count: -1
            }
        })

        return result
    }
}

module.exports = DiscountService;