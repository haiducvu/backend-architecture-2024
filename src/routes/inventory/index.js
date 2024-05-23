'use strict'

const express = require('express');
const router = express.Router();
const inventoryController = require('../../controllers/inventory.controller');
const { asyncHandler } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtils');

router.use(authentication);
router.post('', asyncHandler(inventoryController.addStockInventory))


module.exports = router;