'use strict'

const express = require('express');
const { asyncHandler } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtils');
const { newUser } = require('../../controllers/user.controller');
const router = express.Router();

router.post('/new_user', asyncHandler(newUser))

module.exports = router;