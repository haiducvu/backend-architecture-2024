"use strict";
const Resource = require('./resource.model');
const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../dbs/sequelize");

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rol_name: {
        type: DataTypes.ENUM('user', 'shop', 'admin'),
        defaultValue: 'user',
        allowNull: false
    },
    rol_slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol_status: {
        type: DataTypes.ENUM('active', 'block', 'pending'),
        defaultValue: 'active',
        allowNull: false
    },
    rol_description: {
        type: DataTypes.STRING,
        defaultValue: ''
    }
}, {
    timestamps: true
});

const Grant = sequelize.define('Grant', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id'
        }
    },
    resourceId: {
        type: DataTypes.INTEGER,
        references: {
            model: Resource,
            key: 'id'
        }
    },
    actions: {
        type: DataTypes.STRING,
        allowNull: false
    },
    attributes: {
        type: DataTypes.STRING,
        defaultValue: '*'
    }
}, {
    timestamps: true
});

// Defined associations
Role.hasMany(Grant, { foreignKey: 'roleId' }); //, as: 'grants' 
Grant.belongsTo(Role, { foreignKey: 'roleId' }); // , as: 'role' 

Resource.hasOne(Grant, { foreignKey: 'resourceId' }); // , as: 'resource'
Grant.belongsTo(Resource, { foreignKey: 'resourceId' }); // , as: 'resource'

module.exports = { Role, Grant, Resource };