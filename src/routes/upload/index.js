'use strict'

const express = require('express');
const router = express.Router();
const uploadController = require('../../controllers/upload.controller');
const { asyncHandler } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtils');

// router.use(authentication);
router.post('/product', asyncHandler(uploadController.uploadFile))


module.exports = router;