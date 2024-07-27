'use strict'

const { SuccessResponse } = require("../core/success.response");

const dataProfiles = [
    {
        usr_id: 1,
        usr_name: 'CR7',
        usr_avt: 'image.com/user/1.jpg'
    },
    {
        usr_id: 2,
        usr_name: 'M10',
        usr_avt: 'image.com/user/2.jpg'
    },
    {
        usr_id: 3,
        usr_name: 'HaiVu',
        usr_avt: 'image.com/user/3.jpg'
    }
]

class ProfileController {
    // admin
    profiles = async (req, res, next) => {
        new SuccessResponse({
            message: 'view all profiles',
            metadata: dataProfiles
        }).send(res)
    }

    // shop
    profile = async (req, res, next) => {
        new SuccessResponse({
            message: 'view one profile',
            metadata: {
                usr_id: 3,
                usr_name: 'HaiVu',
                usr_avt: 'image.com/user/3.jpg'
            }
        }).send(res)
    }
}

module.exports = new ProfileController()