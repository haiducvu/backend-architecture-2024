'use strict'
const RESOURCE = require('../models/resource.model')
const Resource = require('../models/mysql/resource.model')
const ROLE = require('../models/role.model')
const sequelize = require("../dbs/sequelize");

/**
 * new resource
 * @param {string} name
 * @param {string} slug
 * @param {string} description
 */
const createResource = async ({
    name = 'profile',
    slug = 'p00001',
    description = ''
}) => {
    try {
        //1. Check name or slug exists

        //2. new resource
        // const resource = await RESOURCE.create({
        //     name,
        //     slug,
        //     description
        // })

        const resource = await Resource.create({
            name,
            slug,
            description,
        });
        // console.log('resource', resource)
        return resource
    } catch (error) {
        console.log('error', error)
    }
}

const resourceList = async ({
    userId = 0, // admin
    limit = 30,
    offset = 0,
    search = ''
}) => {
    try {
        //1. Check admin? middleware function

        //2. get list or resource
        // const resources = await RESOURCE.aggregate([
        //     {
        //         $project: {
        //             _id: 0,
        //             name: '$name',
        //             slug: '$slug',
        //             description: '$description',
        //             resourceId: '$_id',
        //             createAt: 1
        //         }
        //     },
        // ])

        const resources = await Resource.findAll({
            attributes: [
                'resourceId',
                'name',
                'slug',
                'description',
                'createdAt',
            ]
        });
        return resources;
    } catch (error) {
        return []
    }
}

const createRole = async ({
    name = 'admin',
    slug = 's0001',
    description = 'extend from shop or user',
    grants = []
}) => {
    try {
        //1. check role exists

        //2. new role
        const role = await ROLE.create({
            rol_name: name,
            rol_slug: slug,
            rol_description: description,
            rol_grants: grants
        })
        return role
    } catch (error) {
        return error
    }
}

const roleList = async ({
    userId = 0, // admin
    limit = 30,
    offset = 0,
    search = ''
}) => {
    try {

    } catch (error) {

    }
}

module.exports = {
    createResource,
    resourceList,
    createRole,
    roleList
}