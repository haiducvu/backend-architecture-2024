'use strict'

const express = require('express');
const { apiKey, permission } = require('../auth/checkAuth');
const { pushToLogDiscord } = require('../middleware');
const router = express.Router();

// add log to discord
router.use(pushToLogDiscord);

// check apiKey
router.use(apiKey);

// check permission
router.use(permission('0000'));

router.use('/v1/api/discount', require('./discount'))
router.use('/v1/api/cart', require('./cart'))

router.use('/v1/api/product', require('./shop'))
router.use('/v1/api/comment', require('./comment'))
router.use('/v1/api/notification', require('./notification'))
router.use('/v1/api', require('./access'))


module.exports = router;