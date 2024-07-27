'use strict'

const express = require('express');
const router = express.Router();
const { newRole, newResource, listRole, listResource } = require('../../controllers/rbac.controller');
const { asyncHandler } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtils');



router.post('/role', asyncHandler(newRole))
router.get('/roles', asyncHandler(listRole))

router.post('/resource', asyncHandler(newResource))
router.get('/resources', asyncHandler(listResource))
module.exports = router;