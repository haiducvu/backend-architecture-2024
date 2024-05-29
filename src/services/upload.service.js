'use strict'
const cloudinary = require('../configs/cloudinary.config')

// 1. Upload from url image
const uploadImageFromURL = async () => {
    try {
        const urlImage = 'https://down-vn.img.susercontent.com/file/sg-11134201-22100-eq76mjamewiv16';
        const folderName = 'product/shopId', newFileName = 'testdemo'
        const result = await cloudinary.uploader.upload(urlImage, {
            resource_type: 'image',
            secure: true,
            folder: folderName,
            public_id: newFileName
        })
        return result
    } catch (error) {
        throw error
    }
}

module.exports = {
    uploadImageFromURL
}

