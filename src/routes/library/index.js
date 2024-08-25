'use strict'

const express = require('express');
const libraryController = require('../../models/mysql/library.controller');
const { asyncHandler } = require('../../auth/checkAuth');
const { authentication } = require('../../auth/authUtils');
const router = express.Router();

// post
router.post('/author', asyncHandler(libraryController.addAuthor))
router.post('/category', asyncHandler(libraryController.addCategory))
router.post('/book', asyncHandler(libraryController.addBook))
router.post('/tag', asyncHandler(libraryController.addTag))
router.post('/book-tag', asyncHandler(libraryController.addBookTag))

// get
router.get('/authors', asyncHandler(libraryController.getAuthor))
router.get('/books', asyncHandler(libraryController.getBook))
// router.get('/book/:id', asyncHandler(libraryController.getBookById))
// router.get('/category', asyncHandler(libraryController.getCategory))
// router.get('/category/:id', asyncHandler(libraryController.getCategoryById))
// router.get('/tag', asyncHandler(libraryController.getTag))
// router.get('/tag/:id', asyncHandler(libraryController.getTagById))


module.exports = router;