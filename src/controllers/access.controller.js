"use strict";

const AccessService = require("../services/access.service");

class AccessController {
  singUp = async (req, res, next) => {
    try {
      console.log("body", req.body);
      return res.status(201).json(await AccessService.signUp(req.body));
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AccessController();
