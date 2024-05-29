'use strict'

const { SuccessResponse } = require('../core/success.response')
const uploadService = require('../services/upload.service')

class UploadController {
    uploadFile = async (req, res) => {
        new SuccessResponse({
            message: 'Upload file success',
            metadata: await uploadService.uploadImageFromURL()
        }).send(res)
    }
}

module.exports = new UploadController()

