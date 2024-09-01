'use strict'

const { ErrorResponse } = require('../core/error.response')
const { SuccessResponse } = require('../core/success.response')
const USER = require('../models/user.model')
const { sendEmailToken } = require('./email.service')

const newUserService = async ({
    email = null,
    captcha = null
}) => {
    // 1. Check email exists in dbs
    const user = await USER.findOne({ email }).lean()
    // 2. if exists
    if (user) {
        return ErrorResponse({
            message: 'Email already exits'
        })
    }

    // 3. send token via Email user
    const result = await sendEmailToken({ email })
    return {
        message: 'Verify email user',
        metadata: {
            token: result
        }
    }
}

module.exports = {
    newUserService
}