'use strict';
const { SuccessResponse } = require("../core/success.response");
const { createComment, getCommentsByParentId, deleteComments } = require('../services/comment.service')

class CommentController {
    createComment = async (req, res, next) => {
        new SuccessResponse({
            message: 'Create new comment',
            metadata: await createComment(req.body)
        }).send(res)
    }

    getCommentsByParentId = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get comments by parent id',
            metadata: await getCommentsByParentId(req.query)
        }).send(res)
    }

    deleteComment = async (req, res, next) => {
        new SuccessResponse({
            message: 'Delete comment',
            metadata: await deleteComments(req.query)
        }).send(res)
    }

}

module.exports = new CommentController()