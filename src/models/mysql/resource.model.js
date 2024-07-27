"use strict";

const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../dbs/sequelize");

const Resource = sequelize.define('Resource', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    resourceId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: true
});

module.exports = Resource;