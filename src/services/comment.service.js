'use strict';

const Comment = require('../models/comment.model')
const { convertToOjectIdMongodb } = require("../utils/index");
const { findProduct } = require("../models/repositories/product.repo");
const { NotFoundError } = require('../core/error.response')
/**
 *  key features: Comment service
 * add comment [User, Shop]
 * get a list of Comments [User, Shop]
 * delete a comment [user | Shop | Admin]
 */
class CommentService {
    static async createComment({
        productId, userId, content, parentCommentId = null
    }) {
        const comment = new Comment({
            comment_productId: productId,
            comment_userId: userId,
            comment_content: content,
            comment_parentId: parentCommentId
        })

        let rightValue
        if (parentCommentId) {
            // reply comment
            const parentComment = await Comment.findById(parentCommentId)
            if (!parentComment) {
                throw new NotFoundError('Parent comment not found')
            }
            rightValue = parentComment.comment_right
            // updateMany comments
            await Comment.updateMany({
                comment_productId: convertToOjectIdMongodb(productId),
                comment_right: { $gte: rightValue }
            }, { $inc: { comment_right: 2 } })

            await Comment.updateMany({
                comment_productId: convertToOjectIdMongodb(productId),
                comment_left: { $gt: rightValue }
            }, { $inc: { comment_left: 2 } })

        } else {
            const maxRightValue = await Comment.findOne({
                comment_productId: convertToOjectIdMongodb(productId)
            }, 'comment_right', { sort: { comment_right: -1 } })

            if (maxRightValue) {
                rightValue = maxRightValue + 1
            } else {
                rightValue = 1
            }
        }

        // insert to comment
        comment.comment_left = rightValue
        comment.comment_right = rightValue + 1

        await comment.save()
        return comment
    }

    static async getCommentsByParentId({ productId, parentCommentId = null, limit = 50, offset = 0 }) {
        if (parentCommentId) {
            const parent = await Comment.findById(parentCommentId)
            if (!parent) {
                throw new NotFoundError('Parent comment not found')
            }
            const comments = await Comment.find({
                comment_productId: convertToOjectIdMongodb(productId),
                comment_left: { $gt: parent.comment_left },
                comment_right: { $lte: parent.comment_right }
            }).select({
                comment_left: 1,
                comment_right: 1,
                comment_content: 1,
                comment_parentId: 1
            }).sort({
                comment_left: 1
            })
            return comments
        }
        const comment = await Comment.find({
            comment_productId: convertToOjectIdMongodb(productId),
            comment_parentId: parentCommentId
        }).select({
            comment_left: 1,
            comment_right: 1,
            comment_content: 1,
            comment_parentId: 1
        }).sort({
            comment_left: 1
        })
        return comment
    }

    static async deleteComments({ commentId, productId }) {
        // check the product exists in the database
        const foundProduct = await findProduct({
            product_id: productId
        })
        // Temp comment because data in product is error :))
        // if (!foundProduct) {
        //     throw new NotFoundError('Product not found')
        // }
        //1. Xac dinh gia tri left and right of commendId
        const comment = await Comment.findById(commentId)
        const leftValue = comment.comment_left
        const rightValue = comment.comment_right
        console.log({ leftValue, rightValue })
        //2. Tinh Width
        const width = rightValue - leftValue + 1
        //3. Xoa cac comment co leftValue va rightValue
        await Comment.deleteMany({
            comment_productId: convertToOjectIdMongodb(productId),
            comment_left: { $gte: leftValue, $lte: rightValue }
        })
        //4. cao nhat gia tri left va right con lai
        await Comment.updateMany({
            comment_productId: convertToOjectIdMongodb(productId),
            comment_right: { $gt: rightValue }
        }, { $inc: { comment_right: -width } })

        await Comment.updateMany({
            comment_productId: convertToOjectIdMongodb(productId),
            comment_left: { $gt: rightValue }
        }, { $inc: { comment_left: -width } })
    }
}

module.exports = CommentService