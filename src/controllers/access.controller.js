"use strict";

const AccessService = require("../services/access.service");

class AccessController {
  singUp = async (req, res, next) => {
    return res.status(201).json(await AccessService.signUp(req.body));
  };
}

module.exports = new AccessController();
