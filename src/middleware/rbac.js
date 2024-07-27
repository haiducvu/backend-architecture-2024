'use strict'

const { AuthFailureError } = require('../core/error.response')
const rbac = require('./role.middleware')

/**
 * 
 * @param {string} action // read, delete or update
 * @param {*} resource // profile, balance/ ..
 */
const grantAccess = (action, resource) => {
    return async (req, res, next) => {
        try {
            const rol_name = req.query.role;
            const permission = rbac.can(rol_name)[action](resource);
            if (!permission.granted) {
                throw new AuthFailureError('You dont have permission to perform this action')
            }
            next();
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    grantAccess
}