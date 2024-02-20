"use strict";

const { CREATED, SuccessResponse } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController {

  handleRefreshToken = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get token Success!',
      metadata: await AccessService.handleRefreshToken(req.body.refreshToken)
    }).send(res);
  }

  logout = async (req, res, next) => {
    new SuccessResponse({
      message: 'Logout Success!',
      metadata: await AccessService.logout(req.keyStore)
    }).send(res);
  }

  login = async (req, res, next) => {
    new SuccessResponse({
      metadata: await AccessService.login(req.body)
    }).send(res)
  }

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
