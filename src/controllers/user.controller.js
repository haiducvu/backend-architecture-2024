'use strict'

const { SuccessResponse } = require("../core/success.response")
const { newUserService } = require("../services/user.service")

class UserController {
    // new user
    newUser = async (req, res, next) => {
        const respond = await newUserService({
            email: req.body.email
        })
        new SuccessResponse(respond).send(res)
    }

    // check user token via email
    checkRegisterEmailToken = async () => {

    }
}

module.exports = new UserController()