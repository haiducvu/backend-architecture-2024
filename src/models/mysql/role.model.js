"use strict";

import sequelize from "../../dbs/sequelize";

const { DataTypes, Model } = require("sequelize");

const Role = sequelize.define('Role', {
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
    timestamps: true,
    tableName: 'Roles'
});

const Grant = sequelize.define('Grant', {
    resource: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Resources', // name of Target model
            key: 'id', // key in Target model that we're referencing
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
    timestamps: true,
    tableName: 'Grants'
});

Role.hasMany(Grant, {
    foreignKey: 'roleId',
    as: 'grants'
});
Grant.belongsTo(Role, {
    foreignKey: 'roleId',
    as: 'role'
});

sequelize.sync({ force: true }).then(() => {
    console.log("Tables have been created");
}).catch(error => console.log('This error occured', error));

module.exports = { Role, Grant };
