"use strict";

const { CREATED } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {
  singUp = async (req, res, next) => {
    new CREATED({
      message: 'Register OK!',
      metadata: await AccessService.signUp(req.body),
      options: {
        limit: 'add limit'
      }
    }).send(res)
  };
}

module.exports = new AccessController();
