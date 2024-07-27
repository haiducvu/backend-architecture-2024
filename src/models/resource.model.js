'use strict';

const { model, Schema } = require('mongoose')

const DOCUMENT_NAME = 'Resource'
const COLLECTION_NAME = 'Resources'

const resourceSchema = new Schema({
    name: { type: String, required: true }, // profile

    slug: { type: String, required: true }, // 000001

    description: { type: String, default: '' }

}, {
    timestamps: true,

})
collection: COLLECTION_NAME

module.exports = model(DOCUMENT_NAME, resourceSchema)