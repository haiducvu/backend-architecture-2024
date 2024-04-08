'use strict'

const express = require('express');
const NotificationController = require('../../controllers/notification.controller');
const { asyncHandler } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtils');
const router = express.Router();

//authentication
router.use(authentication);
router.get('', asyncHandler(NotificationController.listNotificationByUser))

module.exports = router;

